// Handle interaction while adding Waypoints one after another.
L.Handler.Trace = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
    this._pointerTrace = new L.Geodesic([], this._control.options.pointerTrace);
  },
  addHooks: function() {
    this._control.startRouteHandler.disable();
    this._clearPointerTrace();
    this._pointerTrace.addTo(this._control._map);
    this._control._map
      .on('mousemove', this._drawPointerTrace, this)
      .on('click', this._createPoint, this);
    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);

    if (!this._route) {
      this._createRoute();
    }

    this._route.waypoints
      .on('click', this._finishRouteIfLast, this);

  },
  removeHooks: function() {
    this._clearPointerTrace();
    this._pointerTrace.removeFrom(this._control._map);

    this._control._map
      .off('mousemove', this._drawPointerTrace, this)
      .off('click', this._createPoint, this);
    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);

    this._route.waypoints
      .off('click', this._finishRouteIfLast, this);

    this._route = null;
    this._control.startRouteHandler.enable();
  },
  setRoute: function(route) {
    route.edit.disable();
    return this._route = route;
  },
  _createRoute: function() {
    this._control._map.fire('traceroute:route:new', this._route);
    return this._route = new L.LayerGroup.Route([], this._control.options)
      .addTo(this._control._routes);
  },
  _createPoint: function(e) {
    if (!this._route) {
      this._createRoute();
    }
    return this._route.createWaypoint(e);
  },
  _finishRouteIfLast: function(e) {
    if (e.layer === this._route.waypoints.last()) {
      this._finishRoute();
    }
  },
  _finishRoute: function() {
    if (this._route.clean()) {
      this._control._map.fire('traceroute:route:finish', this._route);
      this._route.edit.enable();
    } else {
      this._control._map.fire('traceroute:route:abort', this._route);
      this._route.remove();
    }
    this.disable();
    return this._route;
  },
  _drawPointerTrace: function(e) {
    if(this._route && this._route.waypoints.last()) {
      this._pointerTrace.setLatLngs([this._route.waypoints.last().getLatLng(), e.latlng]);
    }
  },
  _clearPointerTrace: function() {
    this._pointerTrace.setLatLngs([]);
  },
  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : //ESC
        this._finishRoute();
        this.disable();
        break;
    }
  },
});
