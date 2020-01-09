L.Handler.BearingTrace = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
    this._pointerTrace = new L.Polyline([], this._control.options.pointerTrace);
  },
  addHooks: function() {
    this._clearPointerTrace();
    this._pointerTrace.addTo(map);

    map
      .on('mousemove', this._drawPointerTrace, this)
      .on('click', this._setBearing, this);
    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);

    if (!this.origin) {
      this.disable();
    }
  },
  removeHooks: function() {
    this._clearPointerTrace();
    this._pointerTrace.removeFrom(map);

    map
      .off('mousemove', this._drawPointerTrace, this)
      .off('click', this._setBearing, this);

    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);

    this.origin = null;
  },
  _setBearing: function(e) {
    let bp = this._control._routes
      .getLayer(this.origin.options.routeId)
        .createBearing(e.latlng, this.origin);

    bp.dragging.enable();
    this.disable();
  },
  _drawPointerTrace: function(e) {
    this._pointerTrace.setLatLngs([this.origin.getLatLng(), e.latlng]);
  },
  _clearPointerTrace: function() {
    this._pointerTrace.setLatLngs([]);
  },
  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : this.disable(); break;//ESC
    }
  }
});
