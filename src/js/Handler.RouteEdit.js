// handle interactions route, even after it as been traced.
L.Handler.RouteEdit = L.Handler.extend({
  initialize: function (route) {
    this._route = route;
  },
  addHooks: function() {
    this._route.midpoints
      .on('click', this._route.createWaypoint, this._route);

    if (typeof this._route.options.midpoint.tooltip != 'undefined') this._route.midpoints.bindTooltip(this._route.options.midpoint.tooltip, { direction: 'auto' });

    // FIXME: Tooltip Error: Unable to get source layer LatLng. with permanent: true, : https://github.com/Leaflet/Leaflet/issues/6938
    this._route.waypoints
      .on('contextmenu', this._removeLayer, this._route.waypoints)
      .eachLayer(layer => layer.dragging.enable());

    if (typeof this._route.options.waypoint.tooltip != 'undefined') this._route.waypoints.bindTooltip(this._route.options.waypoint.tooltip, { direction: 'auto' });
    if (typeof this._route.options.waypoint.popup != 'undefined') this._route.waypoints.unbindPopup();
  },

  removeHooks: function() {
    this._route.midpoints
      .off('click', this._route.createWaypoint, this._route);

    if (typeof this._route.options.midpoint.tooltip != 'undefined') this._route.midpoints.unbindTooltip();
      
    this._route.waypoints
      .off('contextmenu', this._removeLayer, this._route.waypoints)
      .eachLayer(layer => layer.dragging.disable());

    if (typeof this._route.options.waypoint.tooltip != 'undefined') this._route.waypoints.unbindTooltip();
    if (typeof this._route.options.waypoint.popup != 'undefined') this._route.waypoints.bindPopup(this._route.options.waypoint.popup);
  },
  _removeLayer: function(e) {
    this.removeLayer(e.layer);
  },
});
