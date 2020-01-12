// handle interactions route, even after it as been traced.
L.Handler.RouteEdit = L.Handler.extend({
  initialize: function (route) {
    this._route = route;
  },
  addHooks: function() {
    this._route.midpoints
      .on('click', this._route.createWaypoint, this._route);

    this._route.waypoints
      .on('contextmenu', this._removeLayer, this._route.waypoints)
      .eachLayer(layer => layer.dragging.enable());
  // TODO: midpoints popup & tooltip presence should be here
  },

  removeHooks: function() {
    this._route.midpoints
      .off('click', this._route.createWaypoint, this._route);

    this._route.waypoints
      .off('contextmenu', this._removeLayer, this._route.waypoints)
      .eachLayer(layer => layer.dragging.disable());
  },
  _removeLayer: function(e) {
    this.removeLayer(e.layer)
  },
});
