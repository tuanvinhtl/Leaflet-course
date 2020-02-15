import './Handler.RouteTrace';

// Handle while control is enabled
L.Handler.RouteStart = L.Handler.extend({
  initialize: function(map, routes, options) {
    L.Util.setOptions(this, options);
    this._map = map;
    this._routes = routes;
    this.traceHandler = new L.Handler.RouteTrace(this, routes, options);
  },
  addHooks: function() {
    this._map
      .on('click', this._startRoute, this)

    this._routes.eachLayer(function(route) {
      route.editHandler.enable();
      route.waypoints.on('click', this._resumeRoute, this)
    }, this);
  },
  removeHooks: function() {
    this._map
      .off('click', this._startRoute, this)

    this._routes.eachLayer(function(route) {
      route.editHandler.disable();
      route.waypoints.off('click', this._resumeRoute, this)
    }, this);
  },
  _startRoute: function(e) {
    this.traceHandler.enable();
    this.traceHandler._createPoint(e);
  },
  _resumeRoute: function(e) {
    this.traceHandler._route = e.layer.parent;
    this.traceHandler._route.editHandler.disable();
    this.traceHandler.enable();
    map.fire('course:route:resume', this.traceHandler._route);
    },
});
