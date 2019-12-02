// Standart LayerGroup use JS object to store layers. This is not suitable to maintain order (insertion or else) in the collection. here we use Map, and create some useful methods

L.LayerOrderedGroup = L.LayerGroup.extend({
  initialize: function (layers, options) {
    L.Util.setOptions(this, options);

    this._layers = new Map;

    var i, len;

    if (layers) {
      for (i = 0, len = layers.length; i < len; i++) {
        this.addLayer(layers[i]);
      }
    }
  },
  addLayer: function (layer) {
    var id = this.getLayerId(layer);

    this._layers.set(id, layer);

    if (this._map) {
      this._map.addLayer(layer);
    }

    return this;
  },
  removeLayer: function (layer) {
    var id = this._layers.has(layer) ? layer : this.getLayerId(layer);

    if (this._map && this._layers.delete(id)) {
      this._map.removeLayer(layer);
    }

    return this;
  },
  // // @method hasLayer(layer: Layer): Boolean
  // // Returns `true` if the given layer is currently added to the group.
  // // @alternative
  // // @method hasLayer(id: Number): Boolean
  // // Returns `true` if the given internal ID is currently added to the group.
  // hasLayer: function (layer) {
  //   return !!layer && (this._layers.has(layer) ||  this._layers.has(this.getLayerId(layer)));
  // },
  // @method insertLayer(layer: Layer, after: Number): this
  // Inserts the given layer to the group after the layer with the given internal ID.
  insertLayer: function(new_layer, after) {
    let newMap = new Map();
    this._layers.forEach((value, key, map) => {
      newMap.set(key, value);
      if(key === after) {
        newMap.set(this.getLayerId(new_layer), new_layer);
      }
    });
    this._layers = newMap;

    if (this._map) {
      this._map.addLayer(new_layer);
    }
    return this;
  },
  last: function() {
    return Array.from(this._layers.values()).pop();
  },
  invoke: function (methodName) {
    for (layer of this._layers.values()) {
      if (layer[methodName]) {
        layer[methodName].apply(layer, args);
      }
    }

    return this;
  },
  eachLayer: function (method, context) {
    for (var layer of this._layers.values()) {
      method.call(context, layer);
    }
    return this;
  },
  getLayer: function (id) {
    return this._layers.get(id);
  },
  getLayers: function () {
    return Array.from(this._layers.values());
  }
});

// Custom layer Group used to sort anykind of layers for route tracing.
L.LayerRoute = L.LayerGroup.extend({
  beforeAdd: function(map) {
// Create container as LayerGroup fo markers and polylines
    this.trace = new L.Geodesic().addTo(this);
    this.arrows = new L.LayerGroup().addTo(this);
    this.points = new L.LayerOrderedGroup().addTo(this);

// Let's proxy some methods
    this.addPoint = l => this.points.addLayer(l);
    this.removePoint = l => this.points.removeLayer(l);
    this.insertPoint = (l, after) => this.points.insertLayer(l, after);
    this.lastPoint = () => this.points.last();
  },
  drawTrace: function(e) {
    let points = this.points.getLayers();
    try {
      this.trace.setLatLngs(points.map(m => m.getLatLng()));
    } catch {}  // (e if e instanceof TypeError)
    this.arrows.clearLayers();

    if(points.length >= 2) {
      points.reduce((prev, current) => {
        this._drawArrow(prev, current).addTo(this.arrows);
        this._decorateMarkers(prev, current);
        return current
      })
    }
    this._mapToAdd.fire('traceroute:update', this);
  },
  drawPoint: function(e) {
    let pointOptions = { icon: this.options.pointIcon, draggable: true, autoPan: true, in: '-', out: '-', distance: '-', totalDistance:'-', routeId: L.Util.stamp(this), name: ''};
    e.latlng.altitude = e.latlng.altitude || 0
    return new L.Marker(e.latlng, {
      icon: this.options.pointIcon,
      draggable: true,
      autoPan: true,
      in: '-',
      out: '-',
      distance: '-',
      totalDistance:'-',
      routeId: L.Util.stamp(this)
    })
    .on('contextmenu', e => this.removePoint(e.target), this)
    .on('add remove move', this.drawTrace, this)
    .on('add remove move', e => this._mapToAdd.fire(`traceroute:point:${e.type}`, e.target))

  },
  _drawArrow: function(start, end) {
    let brg = this.trace.geom.geodesic.inverse(start.getLatLng(), end.getLatLng());
    this.options.arrowIcon.options.html = this.options.arrowIcon.options.html.cloneNode();
    this.options.arrowIcon.options.html.style.transform = `rotate(${Math.round(-90 + (brg.initialBearing + brg.finalBearing) / 2) % 360}deg)`;

    return new L.Marker(
      this.trace.geom.geodesic.midpoint(start.getLatLng(), end.getLatLng()), {
        icon: this.options.arrowIcon,
        insertAfter : L.Util.stamp(start),
        insertBefore : L.Util.stamp(end),
        routeId: L.Util.stamp(this)
       })
       .on('click', this.options.control._createPoint, this.options.control);
  },
  _decorateMarkers: function(prev, next) {
    let params = this.trace.geom.geodesic.inverse(prev.getLatLng(), next.getLatLng());

    prev.options.out = this._fmtNbr(params.initialBearing, '°');
    next.options.in = this._fmtNbr(params.finalBearing, '°');
    next.options.distance = this._fmtNbr(params.distance, 'NM');
    next.options._totalDistance = (prev.options._totalDistance || 0) + params.distance;
    next.options.totalDistance = this._fmtNbr(next.options._totalDistance, 'NM');
    return [prev, next];
  },
  _fmtNbr: function(number, unit) {
    const one_NM = 1852;
    const one_mi = 1609.344;
    const one_ft = 0.3048;

    if (typeof number !== 'number') {
      return `- ${unit}`
    }  else if (typeof unit === 'undefined' && number >=1000 ) {
      unit = 'km'
    }

    switch (unit) {
      case 'km':
        return `${(number/1000).toFixed(1)}${unit}`
      case 'mi':
          return `${(number/one_mi).toFixed(1)}${unit}`
      case 'NM':
        return `${(number/one_NM).toFixed(1)}${unit}`
      case 'km/h':
        return `${(number/1000*60*60).toFixed(0)}${unit}`
      case 'kt':
          return `${(number/one_NM*60*60).toFixed(0)}${unit}`
      case 'ft':
        return `${(number/one_ft).toFixed(0)}${unit}`
      case '°':
        return `${number.toFixed(1)}${unit}`
      case 'time':
        return new Date(timestamp).toUTCString().slice(-12)
      default:
        unit = 'm'
      case 'm':
        return `${(number).toFixed(0)}${unit}`
      }
  }
});

L.Control.TraceRoute = L.Control.extend({
    options: {
      route: ['☡', 'Start a route'], // ⥉
      clear: ['✗', 'Clear routes'], // ⥇
      pointIcon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<span class='leaflet-control-traceroute-point'></span>", iconAnchor: [20, 18], iconSize:[40, 40]}),
      arrowIcon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: L.DomUtil.create('div', 'leaflet-control-traceroute-arrow'), iconAnchor: [20, 18], iconSize:[40, 40]}),
      pointPopup: "<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}<br /><strong>Total distance :</strong> {totalDistance}",
      pointTooltip:"<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}",
     },
    onAdd: function(map) {
      this._map = map;
      this._oldSettings = {};
      this.controlRoute = false;

      this._routes = new L.LayerGroup().addTo(this._map);
      this._mouseLeg = new L.Geodesic([], {dashArray: '8'}).addTo(this._map);
      // this.activeRoute

      let linksContainer = document.createElement('div');
      linksContainer.classList.add('leaflet-bar');
      L.DomEvent.disableClickPropagation(linksContainer);

      if(this.options.route) {
        linksContainer.appendChild(
          this._createControl(this.options.route[0], this.options.route[1], this._toggleRoute)
        );
      }
      if(this.options.clear) {
        linksContainer.appendChild(
          this._createControl(this.options.clear[0], this.options.clear[1], this._clearRoute)
        );
      }

      return linksContainer
    },
    onRemove: function(map) {
      this._preTracingInteractions(false);
      this._tracingInteractions(false);
      // TODO: toogle controle off
    },
    _createControl: function(label, title, fn) {
      let control = document.createElement('a');
      control.innerHTML = label;
      control.classList.add('leaflet-control-traceroute');
      control.setAttribute('title', title);
      control.setAttribute('href', '#');
      control.setAttribute('role', 'button');
      L.DomEvent.on(control, 'click', e => {
        e.target.style.filter = `invert(${fn.apply(this, e) ? 1 : 0})`
      }, this);
      // TODO: invert icon if toogled from code
      return control;
    },
    _toggleRoute: function(force) {
      this.controlRoute =  (force === undefined) ? !this.controlRoute : force;
      if(this.controlRoute) {
        this._oldSettings.cursor = this._map._container.style.cursor;
        this._map._container.style.cursor = 'crosshair';
        this._oldSettings.doubleClickZoom = this._map.doubleClickZoom.enabled();
        this._map.doubleClickZoom.disable();
        L.DomEvent.on(document, 'keydown', this._onKeyDown, this);

        this._preTracingInteractions(true);
      } else {
        this._map._container.style.cursor = this._oldSettings.cursor;
        if(this._oldSettings.doubleClickZoom) { this._map.doubleClickZoom.enable() }
        L.DomEvent.on(document, 'keydown', this._onKeyDown, this);

        this._preTracingInteractions(false);
        if (this._activeRoute) {this._finishRoute();}
      }
      this._map.fire('traceroute:toggle', {status: this.controlRoute});
      return this.controlRoute;
    },
    _preTracingInteractions: function(active) {
      if (active) {
        this._map.on('click', this._newRoute, this);
      } else {
        this._map.off('click', this._newRoute, this);
      }
    },
    _tracingInteractions: function(active) {
      if (active) {
        this._map.on('mousemove', this._drawLeg, this);
        this._map.on('click', this._createPoint, this);
        this._map.on('dblclick', this._finishRoute, this);
      } else {
        this._mouseLeg.setLatLngs([]);
        this._map.off('mousemove', this._drawLeg, this);
        this._map.off('click', this._createPoint, this);
        this._map.off('dblclick', this._finishRoute, this);
      }
    },
    _onKeyDown: function (e) {
      if (e.keyCode === 27) {
        if (this._activeRoute) {
          this._finishRoute();
        } else {
          this._toggleRoute(false);
        }
       }
    },
    _drawLeg: function(e){
      if(this._activeRoute && this._activeRoute.points.getLayers().length > 0) {
        this._mouseLeg.setLatLngs([this._activeRoute.lastPoint().getLatLng(), e.latlng]);
      }
    },
    _newRoute: function(e) {
      this._preTracingInteractions(false);

      this._activeRoute = new L.LayerRoute([], { control: this, pointIcon: this.options.pointIcon, arrowIcon: this.options.arrowIcon })
      .addTo(this._routes);
      this._map.fire('traceroute:new', this._activeRoute);

      this._tracingInteractions(true);
      this._createPoint(e);

    },
    _finishRoute: function() {
      this._tracingInteractions(false);
      let lastRoute = this._activeRoute;

      if (this._activeRoute.points.getLayers().length < 2) {
        this._routes.removeLayer(this._activeRoute);
        lastRoute = null;
      }

      delete this._activeRoute;

      this._preTracingInteractions(true);
      this._map.fire('traceroute:finish', lastRoute);
    },
    _resumeRoute: function(route) {
      this._preTracingInteractions(false);
      this._activeRoute = route;
      this._tracingInteractions(true);
      this._map.fire('traceroute:resume', this._activeRoute);
    },
    _clearRoute: function(route) {
      if (route) {
        route.clearLayers();
      } else {
        this._routes.clearLayers();
      }
      this._mouseLeg.setLatLngs([]);
      this._map.fire('traceroute:clear');
      return false;
    },
    _createPoint: function(e) {
      if(!this._activeRoute && e.target.options.routeId) { // if no route is active but the marker got a reference active the route.
        this._activeRoute = this._routes.getLayer(e.target.options.routeId);
      }
      let newMarker = this._activeRoute.drawPoint(e)
        .on('click', this._clickForRoute, this)
        .bindPopup(m => {
          return L.Util.template(this.options.pointPopup, m.options)
        })
        .bindTooltip(m => {
          return L.Util.template(this.options.pointTooltip, m.options)
        },{
           permanent: true,
           direction: 'auto'
         })

      if (e.target.options.insertAfter) { // insert the new point in route or at it at the end
        this._activeRoute.insertPoint(newMarker, e.target.options.insertAfter);
      } else {
        this._activeRoute.addPoint(newMarker);
      }
    },
    _clickForRoute: function(e) {
      if (this._activeRoute) { // if we are tracing a route, stop it
        this._finishRoute();
      } else if (this._routes.getLayer(e.target.options.routeId).lastPoint() === e.target) { // if we are not tracing a route and this is the last point af the route, resume the tracing
        this._resumeRoute(this._routes.getLayer(e.target.options.routeId))
      }
    },
  });

L.control.traceroute = function(opts) {
  return new L.Control.TraceRoute(opts);
}
