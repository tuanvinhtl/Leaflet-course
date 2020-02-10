// handle interactions route, even after it as been traced.
L.Handler.RouteEdit = L.Handler.extend({
  initialize: function (route) {
    this._route = route;
  },
  addHooks: function() {
    this._route.midpoints
      .bindTooltip(this._route.options.midpoint.tooltip, { direction: 'auto' })
      .on('click', this._route.createWaypoint, this._route);

    // FIXME: Tooltip Error: Unable to get source layer LatLng. with permanent: true, : https://github.com/Leaflet/Leaflet/issues/6938
    this._route.waypoints
      .bindTooltip(this._route.options.waypoint.tooltip, { direction: 'auto' })
      .unbindPopup()
      .on('contextmenu', this._removeLayer, this._route.waypoints)
      .eachLayer(layer => layer.dragging.enable());
  },

  removeHooks: function() {
    this._route.midpoints
      .unbindTooltip()
      .off('click', this._route.createWaypoint, this._route);

    this._route.waypoints
      .unbindTooltip()
      .bindPopup(this._route.options.waypoint.popup)
      .off('contextmenu', this._removeLayer, this._route.waypoints)
      .eachLayer(layer => layer.dragging.disable());
  },
  _removeLayer: function(e) {
    this.removeLayer(e.layer);
  },
});
