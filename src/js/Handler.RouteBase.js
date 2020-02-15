import './Handler.RouteStart';

// Handle while waiting to start/resume a route
L.Handler.RouteBase = L.Handler.extend({
  initialize: function (map, control, options) {
    L.Util.setOptions(this, options);
    this._map = map;
    this._control = control;
    
// TODO: Send _routes here
  // this._routes = L.layerGroup()
  //   .addTo(this._map);
    this.startHandler = new L.Handler.RouteStart(this._map, control._routes, options);

    this._map.on('course:bearing:start', (e) => this.disable());
  },
  addHooks: function() {
    this._control.handler.enable();
    this.target.style.filter = 'invert(1)';

    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);
    this._map
      .fire('course:route:start', this._control);
    this.startHandler.enable();
  },
  removeHooks: function() {
    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);
    this._map
      .fire('course:route:stop', this._control);

    this.target.style.filter = 'invert(0)';
    this._control.handler.disable();
    this.startHandler.traceHandler.disable();
    this.startHandler.disable();
  },
  _onKeyDown: function(e) {
    switch(e.keyCode) {
      case 27 : this.disable(); break;//ESC
    }
  },
});
