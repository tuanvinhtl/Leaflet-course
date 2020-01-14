L.Handler.ClearBase = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
  },
  addHooks: function() {
    this.target.style.filter = 'invert(1)';
    this._control._routes.clearLayers();
    this._control.options.tools.track.handler.trace.setLatLngs([]);
    map.fire('traceroute:clear');

    this.disable();
  },
  removeHooks: function() {
    this.target.style.filter = 'invert(0)';
    return false;
  },
});
