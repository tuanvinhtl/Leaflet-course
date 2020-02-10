import './Marker.Traceroute';

L.Marker.Bearing = L.Marker.Traceroute.extend({
  initialize: function(latlng, options) {
    this.trace = new L.Polyline([], options.trace);
    delete options.trace;

    this
      .on('move', this._decorate, this)
      .on('move', this._draw, this)

    Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this, latlng, options);
  },
  onAdd: function(map) {
    this.trace.addTo(map);
    Object.getPrototypeOf(Object.getPrototypeOf(this)).onAdd.call(this, map);
  },
  onRemove: function(map) {
    this.trace.remove();
    Object.getPrototypeOf(Object.getPrototypeOf(this)).onRemove.call(this, map);
  },
  bearing: {},
  export: function () {
    let data = {};
    data.position = this._latlng;

    if (typeof this.route != 'undefined') Object.assign(data, this.bearing);

    return data
  },
  setOrigin: function(origin) {
    origin
      .on('remove', this.remove, this)
      .on('move remove', this._decorate, this)
      .on('move remove', this._draw, this)
      .addBearing(this);
    this
      ._decorate()
      ._draw();
    return this;
  },
  // TODO: assert if removeOrgin() could be useful.
  _decorate: function() {
    if (this.origin instanceof L.Marker.Waypoint) {
      this.data.qdr = Number(this.bearingTo(this.origin.getLatLng()).toPrecision(5));
      this.data.qdm = Number(this.origin.bearingTo(this._latlng).toPrecision(5));
      this.data.distance = Number(this.distanceTo(this.origin.getLatLng()).toPrecision(5));
    }
    this.toggleTooltip().toggleTooltip();
    return this
  },
  _draw: function() {
    this.trace.setLatLngs([this._latlng, this.origin.getLatLng()])
    return this
  },
});
