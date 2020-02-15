// Handle while control is enabled
L.Handler.Course = L.Handler.extend({
  initialize: function (map, control) {
    this._map = map;
    this._control = control;
    this._oldSettings = {};
  },
  addHooks: function() {
    // TODO: Make pointer customizable
    this._oldSettings.cursor = this._map._container.style.cursor;
    this._map._container.style.cursor = this._control.options.cursor;
    this._oldSettings.doubleClickZoom = this._map.doubleClickZoom.enabled();
    this._map.doubleClickZoom.disable();
  },
  removeHooks: function() {
    this._map._container.style.cursor = this._oldSettings.cursor;
    if(this._oldSettings.doubleClickZoom) { this._map.doubleClickZoom.enable() }
  },
});
