// Handle while control is enabled
L.Handler.Start = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
  },
  addHooks: function() {
    this._control.controlHandler.enable();

    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);
    this._control._map
      .on('click', this._startRoute, this)
      .fire('traceroute:trace:start', this._control);

    this._control._routes.eachLayer(function(route) {
      route.edit.enable();
      route.waypoints.on('click', this._resumeRoute, this)
    }, this);
    this._control.controlHandler.enable();
  },
  removeHooks: function() {
    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);
    this._control._map
      .off('click', this._startRoute, this)
      .fire('traceroute:trace:stop', this._control);

    this._control._routes.eachLayer(function(route) {
      route.edit.disable();
      route.waypoints.off('click', this._resumeRoute, this)
    }, this);
    this._control.controlHandler.disable();
  },
  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : this._control.traceMode(); break;//ESC
    }
  },
  _startRoute: function(e) {
    this._control.traceRouteHandler.enable();
    this._control.traceRouteHandler._createPoint(e);
  },
  _resumeRoute: function(e) {
    this._control.traceRouteHandler.setRoute(
        this._control._routes.getLayer(e.layer.options.routeId)
      );
      this._control.traceRouteHandler.enable();
      this.disable();
    },
});
