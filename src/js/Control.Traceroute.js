// import L from 'leaflet';

import './LayerGroup.Route';
import './Handler.Traceroute';
import './Handler.Start';
import './Handler.Trace';
import './Handler.Bearing';
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
      tooltip: 'Click to insert a waypoints here',
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

    this.controlHandler = new L.Handler.Traceroute(this);
    this.startRouteHandler = new L.Handler.Start(this);
    this.traceRouteHandler = new L.Handler.Trace(this);
  },
  onAdd: function(map) {
    this._map = map;
    this._routes.addTo(this._map);

    let linksContainer = document.createElement('div');
    linksContainer.classList.add('leaflet-bar');
    L.DomEvent.disableClickPropagation(linksContainer);

    if(this.options.control.toggle) {
      linksContainer.appendChild(
        this._createControl(this.options.control.toggle[0], this.options.control.toggle[1], this.traceMode)
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

    return linksContainer;
  },
  onRemove: function(map) {
    this._routes.removeTo(this._map);
    this.controlHandler.disable();
    this.traceRouteHandler.disable();
    this.startRouteHandler.disable();
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
  traceMode: function(e) {
    var target = e.target;
    this.traceMode = function() { // the Closure Horror Picture Show !!
      if(!this.startRouteHandler.enabled()) {
        this.startRouteHandler.enable();
        target.style.filter = 'invert(1)';
      } else {
        this.startRouteHandler.disable();
        target.style.filter = 'invert(0)';
      }
      return this.startRouteHandler.enabled();
    } // end

    return this.traceMode(e);
  },
  },
  clear: function() {
    this.traceRouteHandler.disable();
    this._routes.clearLayers();
    this._map.fire('traceroute:clear');
    return false;
  },
  // import: (waypoints) => {},
  // export: (route) => {},
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
    // export(route) {
    //   route.waypoints.getLayers().forEach(m => {
    //     console.debug(m.toGeoJSON());
    //   });
    // },
  }
})

L.control.traceroute = function(opts) {
  return new L.Control.Traceroute(opts);
};
