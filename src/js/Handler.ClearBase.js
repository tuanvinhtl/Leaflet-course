L.Handler.ClearBase = L.Handler.extend({
  initialize: function (control, options) {
    L.Util.setOptions(this, options);
    this._control = control;
  },
  addHooks: function() {
    this.target.style.filter = 'invert(1)';
    this._control._routes.clearLayers();
    this._control.options.tools.track.handler.trace.setLatLngs([]);
    map.fire('traceroute:clear', this._control);

    this.disable();
  },
  removeHooks: function() {
    this.target.style.filter = 'invert(0)';
  },
});
