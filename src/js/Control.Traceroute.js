// import L from 'leaflet';

import './LayerGroup.Route';
import './Handler.Traceroute';
import './Handler.RouteBase';
import './Handler.BearingBase';
import './Handler.TrackBase';
import './Handler.ClearBase';
import 'leaflet.geodesic';
import '../css/trace.css';

L.Control.Traceroute = L.Control.extend({
  options: {
    tools: {
      route: {
        icon: '☡',// ⥉
        title: 'Start a route',
        handler: L.Handler.RouteBase,
        waypoint: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<span class='leaflet-control-traceroute-point'></span>", iconAnchor: [20, 18], iconSize:[40, 40]}),
          popup: p => {
            return L.Util.template("<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}<br /><strong>Total distance :</strong> {totalDistance}", L.Control.Traceroute.extractData(p.data))
          },
          tooltip: p => {
            return L.Util.template("<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}", L.Control.Traceroute.extractData(p.data))
          },
        },
        midpoint: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<div class='leaflet-control-traceroute-arrow'></div>", iconAnchor: [20, 18], iconSize:[40, 40]}),
          tooltip: 'Click to insert a waypoints here',
          opacity: 0.5
        },
        trace: { weight: 5, opacity: 0.5, color: 'black' },
        pointer: { dashArray: '8' },
      },
      bearing: {
        icon: '∡',// 🧭∢∠
        title: 'Radio Navigation',
        handler: L.Handler.BearingBase,
        marker: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<span class='leaflet-control-traceroute-losange'></span>", iconAnchor: [20, 18], iconSize:[40, 40]}),
          tooltip: p => {
            return L.Util.template("<strong>QDR :</strong> {qdr}<br /><strong>QDM :</strong> {qdm}<br /><strong>distance :</strong> +{distance}", L.Control.Traceroute.extractData(p.data))
          },
        },
        trace: { dashArray: '5,5,1,5', opacity: 0.3, color: 'grey', },
        pointer: { dashArray: '8' }
      },
      track: {
        icon: '✈',// ✇
        title: 'Track Position',
        handler: L.Handler.TrackBase,
        marker: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<div class='leaflet-control-traceroute-airplane'></div>", iconAnchor: [20, 18], iconSize:[40, 40]}),
          tooltip: p => {
            return L.Util.template("<strong>accuracy :</strong> {accuracy}<br /><strong>altitude (+/-{altitudeAccuracy}):</strong> {altitude} ({vario}) <br /><strong>heading :</strong> {heading} ({bearing})<br /><strong>speed :</strong> {speed} ({estimatedSpeed})<br />last seen at <strong>{time}</strong>", L.Control.Traceroute.extractData(p.data))
          },
        },
        circle: {},
        trace: { weight: 5, opacity: 0.5, color: 'black' },
        locate: { enableHighAccuracy: true, timeout: 5000, maximumAge: 0, setView: true }
      },
      clear: {
          icon: '✗',// ⥇
          title: 'Clear routes',
          handler: L.Handler.ClearBase
        },
    },
  },
  initialize: function (options) {
    L.Control.Traceroute.mergeDeep(this.options, options);

    this.handler = new L.Handler.Traceroute(this);

    for (let tool of Object.values(this.options.tools)) {
      tool.handler = new tool.handler(this, tool);
    }

  },
  onAdd: function(map) {
    this._map = map;
    this._routes.addTo(this._map);

    let linksContainer = document.createElement('div');
    linksContainer.classList.add('leaflet-bar');
    L.DomEvent.disableClickPropagation(linksContainer);

    for (const tool of Object.values(this.options.tools)) {
      linksContainer.appendChild(
        this._createControl(tool.icon, tool.title, this._toggleMode(tool.handler))
      );
    }

    return linksContainer;
  },
  onRemove: function(map) {
    this._routes.removeTo(this._map);
    this.handlers.routeBase.disable();
    this.handlers.bearingStart.disable();
  },
  _createControl: function(label, title, fn) {
    let control = document.createElement('a');
    control.innerHTML = label;
    control.classList.add('leaflet-control-traceroute');
    control.setAttribute('title', title);
    control.setAttribute('href', '#');
    control.setAttribute('role', 'button');
    L.DomEvent.on(control, 'click', fn, this);

    return control;
  },
  _routes: L.layerGroup(),
  _toggleMode: function(handler) {
    return function (e) {
      if (e && e.target) {
        handler.target = e.target;
      }
      if(!handler.enabled()) {
        handler.enable();
      } else {
        handler.disable();
      }
      return handler.enabled();
    }
  },
  statics: {
    format: function(number, unit) {
      const one_NM = 1852;
      const one_mi = 1609.344;
      const one_ft = 0.3048;
      const one_min = 60;
      const one_hour = 3600;
      const one_kilo = 1000;

      if (typeof number !== 'number') {
        return `- ${unit}`
      }  else if (typeof unit === 'undefined' && number >=1000 ) {
        unit = 'km'
      }

      switch (unit) {
        case 'km': // from m
          return `${(number/one_kilo).toFixed(1)}${unit}`
        case 'mi': // from m
          return `${(number/one_mi).toFixed(1)}${unit}`
        case 'NM': // from m
          return `${(number/one_NM).toFixed(1)}${unit}`
        case 'km/h': //from m/s
          return `${(number/one_kilo*one_hour).toFixed(0)}${unit}`
        case 'ft/min': // from m/s
          return `${(number/one_ft*one_min).toFixed(0)}${unit}`
        case 'kt': // from m/s
          return `${(number/one_NM*one_hour).toFixed(0)}${unit}`
        case 'ft': // from m
          return `${(number/one_ft).toFixed(0)}${unit}`
        case '°':
          return `${number.toFixed(1)}${unit}`
        case 'time': // from timestamp
          return new Date(number).toUTCString().slice(-12)
        default:
        unit = 'm'
        case 'm':
          return `${(number).toFixed(0)}${unit}`
        }
      },
    extractData: function(data) {
      const units = {
        latitude: '°', longitude: '°',
        out: '°', in: '°', distance: 'NM', totalDistance: 'NM',
        qdr: '°', qdm: '°', distance: 'NM',
        altitude: 'ft', vario: 'ft/min',
        accuracy: 'm', altitudeAccuracy: 'm',
        heading: '°', bearing: '°',
        speed: 'kt', estimatedSpeed: 'kt',
        time: 'time',
      }
      let result = {};
      for (let [quantity, value] of Object.entries(data)) {
        if (typeof units[quantity] != 'undefined')
         result[quantity] = this.format(value, units[quantity]);
      }
      return result;
    },
    mergeDeep: function thisDeep(target, ...sources) {
      const isObject = item => (item && typeof item === 'object' && !Array.isArray(item));

      if (!sources.length) return target;
      const source = sources.shift();

      if (isObject(target) && isObject(source)) {
        for (const key in source) {
          if (isObject(source[key])) {
            if (!target[key]) Object.assign(target, { [key]: {} });
            thisDeep(target[key], source[key]);
          } else {
            Object.assign(target, { [key]: source[key] });
          }
        }
      }
     thisDeep(target, ...sources);
    }
  }
})

L.control.traceroute = function(opts) {
  return new L.Control.Traceroute(opts);
};
