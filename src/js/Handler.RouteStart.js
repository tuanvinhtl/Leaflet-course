import './Handler.RouteTrace';

// Handle while control is enabled
L.Handler.RouteStart = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
    this.traceHandler = new L.Handler.RouteTrace(control);
  },
  addHooks: function() {
    map
      .on('click', this._startRoute, this)

    this._control._routes.eachLayer(function(route) {
      route.editHandler.enable();
      route.waypoints.on('click', this._resumeRoute, this)
    }, this);
  },
  removeHooks: function() {
    map
      .off('click', this._startRoute, this)

    this._control._routes.eachLayer(function(route) {
      route.editHandler.disable();
      route.waypoints.off('click', this._resumeRoute, this)
    }, this);
  },
  _startRoute: function(e) {
    this.traceHandler.enable();
    this.traceHandler._createPoint(e);
  },
  _resumeRoute: function(e) {
    this.traceHandler._route = this._control._routes.getLayer(e.layer.options.routeId);
    this.traceHandler._route.editHandler.disable();
    this.traceHandler.enable();
    },
});
