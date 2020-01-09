import './Handler.BearingTrace';

L.Handler.BearingBase = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
    this.traceHandler = new L.Handler.BearingTrace(control);
  },
  addHooks: function() {
    this._control.handlers.route.disable();
    this._control.handlers.base.enable();
    this.target.style.filter = 'invert(1)';

    this._control._routes.eachLayer(function(route) {
      route.waypoints.on('click', this._selectOrigin, this)
      route.bearingpoints.eachLayer(layer => layer.dragging.enable());
    }, this);

    L.DomEvent
      .on(document, 'keydown', this._onKeyDown, this);
  },
  removeHooks: function() {
    L.DomEvent
      .off(document, 'keydown', this._onKeyDown, this);

    this._control._routes.eachLayer(function(route) {
      route.waypoints.off('click', this._selectOrigin, this)
      route.bearingpoints.eachLayer(layer => layer.dragging.disable());
    }, this);

    this._control.handlers.base.disable();
    this.target.style.filter = 'invert(0)';

    this.traceHandler.disable();
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
