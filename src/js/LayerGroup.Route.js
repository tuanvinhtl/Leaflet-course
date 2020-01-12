// Custom layer Group used to sort anykind of layers for route tracing.
// import L from 'leaflet'

import './FeatureGroup.Ordered';
import './Marker.Waypoint';
import './Handler.RouteEdit';
import 'leaflet.geodesic';

L.LayerGroup.Route = L.LayerGroup.extend({
  options: {
    bubblingMouseEvents: false,
    trace: {bubblingMouseEvents: false},
    waypoint: {bubblingMouseEvents: false},
    midpoint: {bubblingMouseEvents: false},
  },
  initialize: function(layer, options) {
    for (let [key, value] of Object.entries(this.options)) {
      if (options.hasOwnProperty(key)) {
        L.extend(options[key], value);
      }
    }
    L.Util.setOptions(this, options);

    this._layers = {};
    this.editHandler = new L.Handler.RouteEdit(this);
    // TODO: Allow importing data to create a route
    // layer.forEach(w => {this.waypoints.addLayer(this.drawWaypoint({latlng: coords}))});

    // Create container as LayerGroup fo markers and polylines
    this.trace = new L.Geodesic([], this.options.trace)
      .addTo(this);

    this.midpoints = new L.FeatureGroup()
      .bindTooltip(this.options.midpoint.tooltip, { direction: 'auto' })
      .addTo(this);

    this.waypoints = new L.FeatureGroup.Ordered()
      .bindPopup(this.options.waypoint.popup)
    // FIXME: Tooltip Error: Unable to get source layer LatLng. with permanent: true, : https://github.com/Leaflet/Leaflet/issues/6938
      .bindTooltip(this.options.waypoint.tooltip, { direction: 'auto' })
      .on('layerremove', this.clean, this)
      .on('layeradd layerremove move', this.drawTrace, this)
      .on('layeradd layerremove move', this.drawBearings, this)
      // FIXME: context is not set to _mapToAdd
      .on('layeradd layerremove move', this._fireWithLayer, this._mapToAdd)
      .on('layeradd', function(e) {
        // FIXME: 'move' event is not propagated to FeatureGroup : https://github.com/Leaflet/Leaflet/issues/6937
        e.layer
          .on('move', this.drawTrace, this)
          .on('move', this.drawBearings, this)
          .on('move', this._fireWithLayer, this._mapToAdd)
      }, this)
      .addTo(this);

    this.bearingpoints = new L.FeatureGroup()
      .on('layeradd layerremove move', this.drawBearings, this)
      .on('layeradd', function(e) {
        // FIXME: 'move' event is not propagated to FeatureGroup : https://github.com/Leaflet/Leaflet/issues/6937
        e.layer
          .on('move', this.drawBearings, this)
      }, this)
      .bindTooltip(this.options.bearingpoint.tooltip, { direction: 'auto' })
      .addTo(this);

    this.bearings = new L.Polyline([], this.options.bearings)
      .addTo(this);

  },
  clean: function() {
    if (this.waypoints.getLayers().length < 2) {
      this.waypoints.clearLayers();
      return false;
    } else {
      return true;
    }
  },
  createWaypoint: function(e) {
    // FIXME: inserted new waypoint should be draggable
    let wp = new L.Marker.Waypoint(e.latlng,
      L.extend({ routeId: L.Util.stamp(this) }, this.options.waypoint)
    );
    if (e.layer && e.layer.options.insertAfter) {
      this.waypoints.insertLayer(wp, e.layer.options.insertAfter);
    } else {
      this.waypoints.addLayer(wp);
    }
    return wp;
  },
  createBearing: function(latlng, origin) {
    let bp = new L.Marker.Bearingpoint(latlng,
      L.extend({ origin: origin }, this.options.bearingpoint)
    )
    this.bearingpoints.addLayer(bp);
    return bp;
  },
  drawBearings: function() {
    let traces = [];
    this.bearingpoints.eachLayer(function(bp) {
      traces.push([bp.getLatLng(), bp.options.origin.getLatLng()]);
      bp.decorate(bp.options.origin);
    });

    this.bearings.setLatLngs(traces);
  },
  drawTrace: function(e) {
    let points = this.waypoints.getLayers();

    this.trace.setLatLngs(points.map(m => m.getLatLng()));
    this.midpoints.clearLayers();

    if(points.length >= 2) {
      points.reduce((prev, current) => {
      if (this.options.midpoint) {
        this._drawMidpoint(prev, current).addTo(this.midpoints);
      }
      this._decorateWaypoint(prev, current);
      return current
      })
    }
    this._mapToAdd.fire('traceroute:route:update', this);
  },
  _drawMidpoint: function(start, end) {
    let rotation = this.trace.geom.geodesic.inverse(start.getLatLng(), end.getLatLng());
    rotation = Math.round((rotation.initialBearing + rotation.finalBearing) / 2) % 360;

    return new L.Marker(
      this.trace.geom.geodesic.midpoint(start.getLatLng(), end.getLatLng()),
      L.extend({ rotationAngle: rotation, routeId: L.Util.stamp(this), insertAfter : L.Util.stamp(start) }, this.options.midpoint))
  },
  _decorateWaypoint: function(prev, next) {
    let params = this.trace.geom.geodesic.inverse(prev.getLatLng(), next.getLatLng());
    prev.route.out = Number(params.initialBearing.toPrecision(5));
    next.route.in = Number(params.finalBearing.toPrecision(5));
    next.route.distance = Number(params.distance.toPrecision(5));
    next.route.totalDistance = (prev.route.totalDistance || 0) + next.route.distance;

    prev.togglePopup().togglePopup().toggleTooltip().toggleTooltip();
    next.togglePopup().togglePopup().toggleTooltip().toggleTooltip();
    return [prev, next];
  },
  _fireWithLayer: function(e) {
    // console.log(this, e.layer);
    // FIXME: fire add and remove event
    this.fire(`traceroute:waypoint:${e.type.replace('layer','')}`, e.layer || e.target)
  },
  import: () => {},
  export: function() {
    return this.waypoints.getLayers().map(w => w.route)
  }
});
