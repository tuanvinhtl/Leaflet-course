// import L from 'leaflet';

import './LayerGroup.Route';
import 'leaflet.geodesic';
import '../css/trace.css';

L.Control.Traceroute = L.Control.extend({
  options: {
    control: {
      toggle: ['☡', 'Start a route'], // ⥉
      clear: ['✗', 'Clear routes'], // ⥇
      compass: ['∡', 'Radio Navigation'], // 🧭∢∠
    },
    waypoint: {
      icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<span class='leaflet-control-traceroute-point'></span>", iconAnchor: [20, 18], iconSize:[40, 40]}),
      popup: p => {
        return L.Util.template("<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}<br /><strong>Total distance :</strong> {totalDistance}", L.Control.Traceroute.extractData(p))
      },
      tooltip: p => {
        return L.Util.template("<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}", L.Control.Traceroute.extractData(p))
      },
    },
    midpoint: {
      icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: L.DomUtil.create('div', 'leaflet-control-traceroute-arrow'), iconAnchor: [20, 18], iconSize:[40, 40]}),
    },
    pointerTrace: {dashArray: '8'},
    trace: {
      weight: 5,
      opacity: 0.5,
      color: 'black',
    },
  },
  initialize: function (options) {
    // TODO: fix options merging for icons and other
    for (let [key, value] of Object.entries(this.options)) {
      if (options.hasOwnProperty(key)) {
        L.extend(options[key], value);
      }
    }
    L.Util.setOptions(this, options);

    this._oldSettings = {};
    this._pointerTrace = null;
    this._currentRoute = null;
  },
  onAdd: function(map) {
    this._map = map;
    this._routes.addTo(this._map);

    let linksContainer = document.createElement('div');
    linksContainer.classList.add('leaflet-bar');
    L.DomEvent.disableClickPropagation(linksContainer);

    if(this.options.control.toggle) {
      linksContainer.appendChild(
        this._createControl(this.options.control.toggle[0], this.options.control.toggle[1], this.toggle)
      );
    }
    if(this.options.control.compass) {
      linksContainer.appendChild(
        this._createControl(this.options.control.compass[0], this.options.control.compass[1], this.toggle)
      );
    }
    if(this.options.control.clear) {
      linksContainer.appendChild(
        this._createControl(this.options.control.clear[0], this.options.control.clear[1], this.clear)
      );
    }

    return linksContainer
  },
  onRemove: function(map) {
    this._routes.addTo(this._map);
    this._pointerTrace.addTo(this._map);
    this._handlerBase(false);
    this._handlerTrace(false);
    this.toogle(false);
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
  _onKeyDown: function(e) {
    if (e.keyCode === 27) {
      if (this._currentRoute) {
        this.finish();
      } else {
        this.toggle(false);
      }
    }
  },
  _drawPointerTrace: function(e) {
    if(this._currentRoute.waypoints.getLayers().length > 0) {
      this._pointerTrace.setLatLngs([this._currentRoute.lastWaypoint().getLatLng(), e.latlng]);
    }
  },
  active: false,
  _routes: L.layerGroup(),
  toggle: function (force) {
    this.active = (force === undefined) ? !this.active : force;
    if(this.active) {
      this._oldSettings.cursor = this._map._container.style.cursor;
      this._map._container.style.cursor = 'crosshair';
      this._oldSettings.doubleClickZoom = this._map.doubleClickZoom.enabled();
      this._map.doubleClickZoom.disable();

      L.DomEvent.on(document, 'keydown', this._onKeyDown, this);
      this._handlerBase(true);
    } else {
      this._map._container.style.cursor = this._oldSettings.cursor;
      if(this._oldSettings.doubleClickZoom) { this._map.doubleClickZoom.enable() }
      this._pointerTrace.removeFrom(this._map);
      L.DomEvent.off(document, 'keydown', this._onKeyDown, this);

      this._handlerBase(false);
      if (this._activeRoute) {this.finish();}
    }
    this._map.fire('traceroute:toggle', this);
    // this._map.fire('traceroute:toggle', {active: this.active});
    return this.active;
  },
  new: function (e) {
    this._handlerBase(false);
    this._currentRoute = new L.LayerGroup.Route([], L.extend({}, this.options, { control: this }))
      .addTo(this._routes);
    this._map.fire('traceroute:new', this._currentRoute);
    this._handlerTrace(true);
    this._createWaypoint(e);
  },
  finish: function() {
    this._handlerTrace(false);
    if (this._currentRoute.waypoints.getLayers().length > 1) {
      this._map.fire('traceroute:finish', this._currentRoute);
    } else {
      this._routes.removeLayer(this._currentRoute);
    }
    this._currentRoute = null;
    this._handlerBase(true);
  },
  resume: function(route) {
    this._handlerBase(false);
    this._currentRoute = route;
    this._handlerTrace(true);
    this._map.fire('traceroute:resume', this._currentRoute);
  },
  clear: function(route) {
    if (route) {
      route.clearLayers();
    } else {
      this._routes.clearLayers();
    }
    this._pointerTrace.setLatLngs([]);
    this._map.fire('traceroute:clear');
    return false;
  },
  // import: (waypoints) => {},
  export: (route) => {
    return L.Control.Traceroute.export(route ? route : this._currentRoute);
  },
  _createWaypoint: function(e) {
    if (!this.active) { return }
    if(!this._currentRoute && e.target.options.routeId) { // if no route is active but the marker got a route reference, active the route.
      this._currentRoute = this._routes.getLayer(e.target.options.routeId);
    }
    let newMarker = this._currentRoute.drawWaypoint(e)
      .on('click', e => {
        if (!this.active) { return }
        if (this._currentRoute) { // if we are tracing a route, stop it
          this.finish();
        } else if (this._routes.getLayer(e.target.options.routeId).lastWaypoint() === e.target) { // if we are not tracing a route and this is the last point af the route, resume the tracing
          this.resume(this._routes.getLayer(e.target.options.routeId))
        }
      }, this)
      .bindPopup(this.options.waypoint.popup, {})
      .bindTooltip(this.options.waypoint.tooltip, { permanent: true, direction: 'auto' });

    if (e.target.options.insertAfter) { // insert the new point in route or at it at the end
      this._currentRoute.insertWaypoint(newMarker, e.target.options.insertAfter);
    } else {
      this._currentRoute.addWaypoint(newMarker);
      this._drawPointerTrace(e);
    }
  },
  _handlerBase: function(active) {
    if (active) {
      this._map.on('click', this.new, this);
    } else {
      this._map.off('click', this.new, this);
    }
  },
  _handlerTrace: function(active) {
    if (active) {
      this._pointerTrace = new L.Geodesic([], this.options.pointerTrace);
      this._pointerTrace.addTo(this._map);

      this._map.on('mousemove', this._drawPointerTrace, this);
      this._map.on('click', this._createWaypoint, this);
      this._map.on('dblclick', this.finish, this);
    } else {
      this._pointerTrace.setLatLngs([]);
      this._pointerTrace.removeFrom(this._map);
      this._map.off('mousemove', this._drawPointerTrace, this);
      this._map.off('click', this._createWaypoint, this);
      this._map.off('dblclick', this.finish, this);
    }
  },
  statics: {
    format(number, unit) {
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
      },
    extractData(waypoint) {
      return {
        out: this.format(waypoint.route.out, '°'),
        in: this.format(waypoint.route.in, '°'),
        distance: this.format(waypoint.route.distance, 'NM'),
        totalDistance: this.format(waypoint.route.totalDistance, 'NM'),
        altitude: this.format(waypoint.position.altitude, 'ft'),
        latitude: this.format(waypoint.position.latitude, '°'),
        longitude: this.format(waypoint.position.longitude, '°'),
      }
    },
    export(route) {
      route.waypoints.getLayers().forEach(m => {
        console.debug(m.toGeoJSON());
      });
    },
  }
})

L.control.traceroute = function(opts) {
  return new L.Control.Traceroute(opts);
};
// L.control.traceroute = opts => new L.Control.Traceroute(opts);
