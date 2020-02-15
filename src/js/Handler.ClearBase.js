L.Handler.ClearBase = L.Handler.extend({
  initialize: function (map, control, options) {
    L.Util.setOptions(this, options);
    this._map = map;
    this._control = control;
  },
  addHooks: function() {
    this.target.style.filter = 'invert(1)';
    this._control._routes.clearLayers();
    this._control.options.tools.track.handler.trace.setLatLngs([]);
    this._map.fire('traceroute:clear', this._control);

    this.disable();
  },
  removeHooks: function() {
    this.target.style.filter = 'invert(0)';
  },
});
