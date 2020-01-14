import './Handler.RouteStart';

// Handle while waiting to start/resume a route
L.Handler.RouteBase = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
    this.startHandler = new L.Handler.RouteStart(control);
  },
  addHooks: function() {
    this._control.options.tools.bearing.handler.disable();
    this._control.handler.enable();
    this.target.style.filter = 'invert(1)';

    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);
    map
      .fire('traceroute:trace:start', this._control);
    this.startHandler.enable();
  },
  removeHooks: function() {
    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);
    map
      .fire('traceroute:trace:stop', this._control);

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
