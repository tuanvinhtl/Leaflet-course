// Custom layer Group used to sort anykind of layers for route tracing.
// import L from 'leaflet'

import './LayerGroup.Ordered';
import './Marker.Waypoint';
import 'leaflet.geodesic';

L.LayerGroup.Route = L.LayerGroup.extend({
  options: {
    trace: {},
    waypoint: {},
    midpoint: {},
  },
  initialize: function(layer, options) {
    for (let [key, value] of Object.entries(this.options)) {
      if (options.hasOwnProperty(key)) {
        L.extend(options[key], value);
      }
    }

    L.Util.setOptions(this, options);

    this._layers = {};
    // layer.forEach(w => {this.addWaypoint(this.drawWaypoint({latlng: coords}))});

    // Create container as LayerGroup fo markers and polylines
    this.trace = new L.Geodesic([], this.options.trace).addTo(this);
    this.midpoints = new L.LayerGroup().addTo(this);
    this.waypoints = new L.LayerGroup.Ordered().addTo(this);

    // lets proxy some methods
    this.addWaypoint = l => this.waypoints.addLayer(l);
    this.removeWaypoint = l => this.waypoints.removeLayer(l);
    this.insertWaypoint = (l, after) => this.waypoints.insertLayer(l, after);
    this.lastWaypoint = () => this.waypoints.last();
  },
  drawTrace: function(e) {
    let points = this.waypoints.getLayers();
    try {
      this.trace.setLatLngs(points.map(m => m.getLatLng()));
    } catch {}  // (e if e instanceof TypeError)
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
  drawWaypoint: function(e) {
    // TODO: stop dragging when tracing is inactive
    return new L.Marker.Waypoint(e.latlng, L.extend({ routeId: L.Util.stamp(this) }, this.options.waypoint))
    .on('contextmenu', e => {
      if (!this.options.control.active) { return }
      this.removeWaypoint(e.target)
    }, this)
    .on('add remove move', this.drawTrace, this)
    .on('add remove move', e => this._mapToAdd.fire(`traceroute:waypoint:${e.type}`, e.target))

  },
  _drawMidpoint: function(start, end) {
    let brg = this.trace.geom.geodesic.inverse(start.getLatLng(), end.getLatLng());
    this.options.midpoint.icon.options.html = this.options.midpoint.icon.options.html.cloneNode();
    this.options.midpoint.icon.options.html.style.transform = `rotate(${Math.round(-90 + (brg.initialBearing + brg.finalBearing) / 2) % 360}deg)`;

    return new L.Marker(
      this.trace.geom.geodesic.midpoint(start.getLatLng(), end.getLatLng()),
      L.extend({ routeId: L.Util.stamp(this), insertAfter : L.Util.stamp(start) }, this.options.midpoint))
       .on('click', this.options.control._createWaypoint, this.options.control);
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
