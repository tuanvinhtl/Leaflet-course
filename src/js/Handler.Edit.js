// handle interactions a route route, even after it as been traced.
L.Handler.Edit = L.Handler.extend({
  initialize: function (route) {
    this._route = route;
  },
  addHooks: function() {
    this._route.midpoints
      .on('click', this._route.createWaypoint, this._route);

    this._route.waypoints
      .on('contextmenu', this._removeLayer, this._route.waypoints)
      .eachLayer(layer => layer.dragging.enable());
  },

  removeHooks: function() {
    this._route.midpoints
      .off('click', this._route.createWaypoint, this._route);

    this._route.waypoints
      .off('contextmenu', this._removeLayer, this._route.waypoints)
      .eachLayer(layer => layer.dragging.disable());
  },
  _resumeRouteIfLast: function(e) {
    if (e.layer === this._route.waypoints.last()) {
      this.disable();
      controle.traceRouteHandler.enable()
      this._resumeRoute()
    }
  },
  _removeLayer: function(e) {
    this.removeLayer(e.layer)
  },
});
