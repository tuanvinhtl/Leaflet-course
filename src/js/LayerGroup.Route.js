// Custom layer Group used to sort anykind of layers for route tracing.
// import L from 'leaflet'

import './FeatureGroup.Ordered';
import './Marker.Waypoint';
import 'leaflet.geodesic';

L.LayerGroup.Route = L.LayerGroup.extend({
  options: {
    trace: {},
    waypoint: {},
    midpoint: {},
  },
  initialize: function(layer, options, context = null) {
    for (let [key, value] of Object.entries(this.options)) {
      if (options.hasOwnProperty(key)) {
        L.extend(options[key], value);
      }
    }

    L.Util.setOptions(this, options);

    this.context = context;
    this._layers = {};
    // layer.forEach(w => {this.addWaypoint(this.drawWaypoint({latlng: coords}))});

    // Create container as LayerGroup fo markers and polylines
    this.trace = new L.Geodesic([], this.options.trace)
      // .on('click', this.enable)
      .addTo(this);

    this.midpoints = new L.FeatureGroup()
      .on('click', e => {
        this.waypoints.insertLayer(
          this.drawWaypoint(e.latlng),
          e.layer.options.insertAfter);
      })
      .bindTooltip(this.options.midpoint.tooltip, { direction: 'auto' })
      .addTo(this);

    this.waypoints = new L.FeatureGroup.Ordered()
      .bindPopup(this.options.waypoint.popup)
    // FIXME: Tooltip Error: Unable to get source layer LatLng. with permanent: true,
      .bindTooltip(this.options.waypoint.tooltip, { direction: 'auto' })
      .on('click', function(e) { this._handlerClick(e) }, this.context)
      .on('contextmenu', function(e) { this.removeLayer(e.layer) }, this.waypoints)

      .on('layeradd layerremove move', this.drawTrace, this)
      // FIXME: move or drag events are not fired on Markers and send to FeatureGroup
      .on('layeradd', function(e) {
        e.layer.on('move', this.drawTrace, this)
        e.layer.on('move', function(e) { this.fire('traceroute:waypoint:move', e.layer) }, this._mapToAdd)
      }, this)

      .on('layeradd', function(e) { this.fire('traceroute:waypoint:add', e.layer) }, this._mapToAdd)
      .on('layerremove', function(e) { this.fire('traceroute:waypoint:remove', e.layer) }, this._mapToAdd)
      .on('move', function(e) { this.fire('traceroute:waypoint:move', e.layer) }, this._mapToAdd)

      .addTo(this);
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
    this._mapToAdd.fire('traceroute:update', this);
  },
  drawWaypoint: function(latlng) {
    // TODO: stop dragging when tracing is inactive
    return new L.Marker.Waypoint(latlng, L.extend({ routeId: L.Util.stamp(this) }, this.options.waypoint))
  },
  _drawMidpoint: function(start, end) {
    // TODO: orientation should be set in midpoint icon options
    let brg = this.trace.geom.geodesic.inverse(start.getLatLng(), end.getLatLng());
    this.options.midpoint.icon.options.html = this.options.midpoint.icon.options.html.cloneNode();
    this.options.midpoint.icon.options.html.style.transform = `rotate(${Math.round(-90 + (brg.initialBearing + brg.finalBearing) / 2) % 360}deg)`;

    return new L.Marker(
      this.trace.geom.geodesic.midpoint(start.getLatLng(), end.getLatLng()),
      L.extend({ routeId: L.Util.stamp(this), insertAfter : L.Util.stamp(start) }, this.options.midpoint))
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
  import: () => {},
  export: function() {
    return this.waypoints.getLayers().map(w => w.route)
  }
});
