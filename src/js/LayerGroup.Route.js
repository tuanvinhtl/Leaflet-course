// Custom layer Group used to sort anykind of layers for route tracing.
// import L from 'leaflet'

import './Marker.Waypoint';
import './Handler.RouteEdit';
import 'leaflet.geodesic';

L.LayerGroup.Route = L.LayerGroup.extend({
  options: {
    bubblingMouseEvents: false,
    trace: { bubblingMouseEvents: false },
    waypoint: { bubblingMouseEvents: false, draggable: true },
    midpoint: { bubblingMouseEvents: false },
  },
  initialize: function (layer, options) {
    L.Control.Traceroute.mergeDeep(this.options, options);

    this._layers = {};
    this.editHandler = new L.Handler.RouteEdit(this);

    this.trace = new L.Geodesic([], this.options.trace)
      .addTo(this);

    this.midpoints = new L.FeatureGroup()
      .addTo(this);

    this.waypoints = new L.FeatureGroup()
      .on('layerremove', this.clean, this)
      .on('layerremove', this._handleSiblings, this)
      .on('layeradd layerremove', this._handleParent, this)
      .on('layeradd layerremove move', this._draw, this)
      .on('layeradd layerremove move update', this._fireWithLayer, this)
      .on('layeradd', function (e) {
        // FIXME: 'move' event is not propagated to FeatureGroup : https://github.com/Leaflet/Leaflet/issues/6937
        e.layer
          .on('move', this._draw, this)
          .on('move', this._fireWithLayer, this)
      }, this)
      .addTo(this);
  },
  clean: function () {
    if (this.waypoints.getLayers().length < 2) {
      this.waypoints.clearLayers();
      return false;
    } else {
      return true;
    }
  },
  createWaypoint: function (e) {
    let siblings;
    if (e.layer) siblings = [e.layer.previous, e.layer.next]; // clicking from a Midpoint
    else if (this.waypoints.getLayers().length > 0) siblings = [this.waypoints.getLayers()[0].tolast(), undefined]; // clicking on map
    else siblings = [null, null]; // first click on map

    return new L.Marker.Waypoint(e.latlng, this.options.waypoint)
      .setSiblings(...siblings)
      .addTo(this.waypoints);
  },
  _draw: function (e) {
    let anchor;

    if (e.layer instanceof L.Marker.Waypoint && e.layer.parent instanceof L.LayerGroup.Route) {
      anchor = e.layer;
      // create wp from click >> add point at end if trace & decorate layer.previous to last, add last midpoint
      // create wp from midpoint >> add point in middle of trace & decorate layer.previous to last, , add 2 midpoints
    } else if (e.layer instanceof L.Marker.Waypoint) {
      anchor = e.layer.previous || e.layer.next;
      // remove wp >> remove point from trace & decorate layer.previous to last.
    } else if (e.target instanceof L.Marker.Waypoint) {
      anchor = e.target;
      // move wp >> decorate target.previous to last.
    } else {
      anchor = this.waypoints.getLayers()[0];
      // clear trace and midpoint, rebuild them and decorate from first
    }

    this.trace.setLatLngs([]);
    this.midpoints.clearLayers();

    if (anchor instanceof L.Marker.Waypoint) anchor.tofirst()
      .tolast(layer => {
        layer
          ._decorate();

        this.trace
          .addLatLng(layer.getLatLng());
        if (layer.previous instanceof L.Marker.Waypoint) this.midpoints
          .addLayer(
            this._drawMidpoint(layer.previous, layer)
          );
      });

    this._mapToAdd.fire('traceroute:route:update', this);
  },
  _drawMidpoint: function (prev, next) {
    if (prev instanceof L.Marker.Waypoint && next instanceof L.Marker.Waypoint) {
      let { initialBearing, finalBearing } = this.trace.geom.geodesic.inverse(prev.getLatLng(), next.getLatLng());

      let mp = new L.Marker(
        this.trace.geom.geodesic.midpoint(prev.getLatLng(), next.getLatLng()),
        L.extend({ rotationAngle: Math.round((initialBearing + finalBearing) / 2) % 360 }, this.options.midpoint))
      mp.previous = prev;
      mp.next = next;
      return mp
    } else {
      return null
    }
  },
  _fireWithLayer: function (e) {
    this._mapToAdd.fire(`traceroute:waypoint:${e.type.replace('layer', '')}`, e.layer || e.target)
  },
  _handleParent: function (e) {
    switch (e.type) {
      case 'layeradd': e.layer.parent = this; break;
      case 'layerremove': delete e.layer.parent; break;
    }
  },
  _handleSiblings: function (e) {
    if (e.layer.next instanceof L.Marker.Waypoint) e.layer.next.setSiblings(e.layer.previous, false)
    if (e.layer.previous instanceof L.Marker.Waypoint) e.layer.previous.setSiblings(false, e.layer.next)
  },
});
