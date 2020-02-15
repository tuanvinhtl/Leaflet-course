import './Marker.Course';

L.Marker.Bearing = L.Marker.Course.extend({
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
    this.data.id = this._leaflet_id;

    if (this.fellow.origin instanceof L.Marker.Waypoint) this.data.origin_id = this.fellow.origin._leaflet_id;
  
    return this.data
  },
  setOrigin: function(origin) {
    this.fellow.origin = origin;
    origin
    .on('remove', this.remove, this)
    .on('move', this._decorate, this)
    .on('move', this._draw, this)
    .registerBearing(this);
    this
    ._decorate()
    ._draw();

    return this;
  },
  _decorate: function() {
    this.data.position = this._latlng;
    
    if (this.fellow.origin instanceof L.Marker.Waypoint) {
      this.data.qdr = Number(this.bearingTo(this.fellow.origin.getLatLng()).toPrecision(5));
      this.data.qdm = Number(this.fellow.origin.bearingTo(this._latlng).toPrecision(5));
      this.data.distance = Number(this.distanceTo(this.fellow.origin.getLatLng()).toPrecision(5));
    }

    this.toggleTooltip().toggleTooltip();
    
    return this
  },
  _draw: function() {
    this.trace.setLatLngs([this._latlng, this.fellow.origin.getLatLng()])
    return this
  },
});
