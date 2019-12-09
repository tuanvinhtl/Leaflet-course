// import L from 'leaflet';

import './LayerGroup.Route';
import '../css/track.css';

L.Control.Trackroute = L.Control.extend({
    options: {
      control: {
        toogle: ['✈', 'Track Position'], // ✇
      },
      trace: {
        weight: 5,
        opacity: 0.5,
        color: 'red',
      },
      pointer: L.divIcon({ className: 'leaflet-control-route-icon', html: "<span class='leaflet-control-route-airplane'></span>", iconAnchor: [20, 18], iconSize:[40, 40]}),
    },

    active: false,
    current: null,
    layer: new L.LayerGroup().addTo(this._map),

    toggle: (force) => {
      this.track.active = (force === undefined) ? !this.track.active : force;
      if(this.track.active) {
        this._map.on('locationfound', locationFound);
        this._map.on('locationfound', locationFound);
        this._map.locate(); // {setView: true, maxZoom: 16}
      } else {
        this._map.stopLocate();
        this._map.off('locationfound', locationFound);
        this._map.off('locationfound', locationFound);
      }
      this._map.fire('traceroute:toggle', {status: this.track.active});
      return this.track.active;
    },
    new: () => {
      // this.track.current = new L.LayerRoute([], L.extend({}, this.options.track))
      // .addTo(this.track.layer);
      // new Marker().addTo(this.track.current)
      //
      // this._map.fire('traceroute:new', this.route.current);
    },
    locationFound: (e) => {
      // var radius = e.accuracy;
      // L.marker(e.latlng).addTo(map)
      //     .bindPopup("You are within " + radius + " meters from this point").openPopup();
      // L.circle(e.latlng, radius).addTo(map);
    },
    locationError: (e) => {
   // var radius = e.accuracy;
   //
   // L.marker(e.latlng).addTo(map)
   //     .bindPopup("You are within " + radius + " meters from this point").openPopup();
   //
   // L.circle(e.latlng, radius).addTo(map);
     }
 })

 L.control.trackroute = opts => new L.Control.Trackroute(opts);
