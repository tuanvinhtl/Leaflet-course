L.Handler.ClearBase = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
  },
  addHooks: function() {
    this._control._routes.clearLayers();
    map.fire('traceroute:clear');

    // let anyEnabled = false;
    // for (const tool in this._control.tools) {
    //   let handler = this._control.tools[tool].handler;
    //   console.log(handler);
    //   if (handler.enabled()) {
    //     handler.clear();
    //     anyEnabled = true;
    //   }
    // }
    //
    // if(!anyEnabled) {
    //   for (const tool in this._control.tools) {
    //     this._control.tools[tool].handler.clear();
    //   }
    // }

    this.disable();
  },
  removeHooks: function() {
    return false;
  },
});
