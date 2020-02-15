import './Handler.BearingTrace';

L.Handler.BearingBase = L.Handler.extend({
  initialize: function (map, control, options) {
    L.Util.setOptions(this, options);
    this._map = map;
    this._control = control;

    this.bearings = new L.FeatureGroup()
//TODO add event for add remove & move.
      .addTo(this._map);

    this.traces = new L.Polyline([], this.options.trace)
      .addTo(this._map);

    this.traceHandler = new L.Handler.BearingTrace(this._map, this.bearings, this.options);

    this._map.on('traceroute:route:start', (e) => this.disable());
  },
  addHooks: function() {
    this._control.handler.enable();
    this.target.style.filter = 'invert(1)';

    this._control._routes.eachLayer(function(route) {
      route.waypoints.on('click', this._selectOrigin, this)
    }, this);

    this.bearings
      .bindTooltip(this.options.marker.tooltip, { direction: 'auto' })
      .unbindPopup()
      .eachLayer(marker => marker.dragging.enable());

    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);

    this._map
      .fire('traceroute:bearing:start', this._control);
  },
  removeHooks: function() {
    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);

      this.bearings
        .bindPopup(this.options.marker.tooltip, { direction: 'auto' })
        .unbindTooltip()
        .eachLayer(marker => marker.dragging.disable());

    this._control._routes.eachLayer(function(route) {
      route.waypoints.off('click', this._selectOrigin, this)
    }, this);

    this._control.handler.disable();
    this.target.style.filter = 'invert(0)';

    this.traceHandler.disable();

    this._map
      .fire('traceroute:bearing:stop', this._control);
  },
  _selectOrigin: function(e) {
    this.traceHandler.origin = e.layer;
    this.traceHandler.enable();
  },

  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : //ESC
        this.disable();
        break;
    }
  }
});
