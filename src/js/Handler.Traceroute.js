// Handle while control is enabled
L.Handler.Traceroute = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
    this._oldSettings = {};
  },
  addHooks: function() {
    // TODO: Make pointer customizable
    this._oldSettings.cursor = this._control._map._container.style.cursor;
    this._control._map._container.style.cursor = 'crosshair';
    this._oldSettings.doubleClickZoom = this._control._map.doubleClickZoom.enabled();
    this._control._map.doubleClickZoom.disable();
  },
  removeHooks: function() {
    this._control._map._container.style.cursor = this._oldSettings.cursor;
    if(this._oldSettings.doubleClickZoom) { this._control._map.doubleClickZoom.enable() }
  },
});
