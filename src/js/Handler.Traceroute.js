// Handle while control is enabled
L.Handler.Traceroute = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
    this._oldSettings = {};
  },
  addHooks: function() {
    // TODO: Make pointer customizable
    this._oldSettings.cursor = map._container.style.cursor;
    map._container.style.cursor = 'crosshair';
    this._oldSettings.doubleClickZoom = map.doubleClickZoom.enabled();
    map.doubleClickZoom.disable();
  },
  removeHooks: function() {
    map._container.style.cursor = this._oldSettings.cursor;
    if(this._oldSettings.doubleClickZoom) { map.doubleClickZoom.enable() }
  },
});
