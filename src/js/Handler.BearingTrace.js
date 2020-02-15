import './Marker.Bearing'

L.Handler.BearingTrace = L.Handler.extend({
  initialize: function (map, bearings, options) {
    L.Util.setOptions(this, options);

    this._map = map;
    this.bearings = bearings;
    this._pointer = new L.Polyline([], options.pointer);
  },
  addHooks: function() {
    this._clearPointer();
    this._pointer
      .addTo(this._map);

    this._map
      .on('mousemove', this._drawPointer, this)
      .on('click', this._setBearing, this);

    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);

    if (!this.origin) {
      this.disable();
    }
  },
  removeHooks: function() {
    this._clearPointer();
    this._pointer
      .removeFrom(this._map);

    this._map
      .off('mousemove', this._drawPointer, this)
      .off('click', this._setBearing, this);

    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);

    this.origin = null;
  },
  _setBearing: function(e) {
    new L.Marker.Bearing(e.latlng, L.extend({ draggable:true }, this.options.marker, { trace: this.options.trace }) )
      .addTo(this.bearings)
      .setOrigin(this.origin);
    this.disable();
  },
  _drawPointer: function(e) {
    this._pointer.setLatLngs([this.origin.getLatLng(), e.latlng]);
  },
  _clearPointer: function() {
    this._pointer.setLatLngs([]);
  },
  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : this.disable(); break;//ESC
    }
  }
});
