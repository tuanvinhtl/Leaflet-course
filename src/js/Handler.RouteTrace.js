// Handle interactions while adding Waypoints one after another.
L.Handler.RouteTrace = L.Handler.extend({
  initialize: function(parent, routes, options) {
    L.Util.setOptions(this, options);
    this._parent = parent;
    this._map = parent._map;
    this._routes = routes;
    this._pointerTrace = new L.Geodesic([], options.pointer);
  },
  addHooks: function() {
    this._parent.disable();
    this._clearPointerTrace();
    this._pointerTrace.addTo(this._map);
    this._map
      .on('mousemove', this._drawPointer, this)
      .on('click', this._createPoint, this);
    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);

    if (!this._route) this._createRoute();

    this._route.waypoints
      .on('click', this._finishRouteIfLast, this);

  },
  removeHooks: function() {
    this._clearPointerTrace();
    this._pointerTrace.removeFrom(this._map);

    this._map
      .off('mousemove', this._drawPointer, this)
      .off('click', this._createPoint, this);
    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);

    this._route.waypoints
      .off('click', this._finishRouteIfLast, this);

    this._route = null;
    this._parent.enable();
  },
  _createRoute: function() {
    this._map.fire('traceroute:route:new', this._route);
    return this._route = new L.LayerGroup.Route([], this.options)
      .addTo(this._routes);
  },
  _createPoint: function(e) {
    if (!this._route) this._createRoute();
    return this._route.createWaypoint(e);
  },
  _finishRouteIfLast: function(e) {
    if (e.layer === e.layer.tolast()) {
      this._finishRoute();
    }
  },
  _finishRoute: function() {
    if (this._route.clean()) {
      this._map.fire('traceroute:route:finish', this._route);
      this._route.editHandler.enable();
    } else {
      this._map.fire('traceroute:route:abort', this._route);
      this._route.remove();
    }
    this.disable();
    return this._route;
  },
  _drawPointer: function(e) {
    if(this._route && this._route.waypoints.getLayers().length > 0) {
      this._pointerTrace.setLatLngs([this._route.waypoints.getLayers()[0].tolast().getLatLng(), e.latlng]);
    }
  },
  _clearPointerTrace: function() {
    this._pointerTrace.setLatLngs([]);
  },
  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : //ESC
        this._finishRoute();
        break;
    }
  },
});
