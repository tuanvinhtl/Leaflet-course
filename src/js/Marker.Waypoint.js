import './Marker.Traceroute';
import 'leaflet-rotatedmarker';
import 'leaflet.geodesic';

L.Marker.Waypoint = L.Marker.Traceroute.extend({
  geodesic: L.geodesic().geom.geodesic,
  export: function () {
    this.data.id = this._leaflet_id;

    if (typeof this.fellow.bearings != 'undefined') this.data.bearings = this.fellow.bearings.map(b => b.export());
    if (this.previous instanceof L.Marker.Waypoint) this.data.previous_id = this.previous._leaflet_id;
    if (this.next instanceof L.Marker.Waypoint) this.data.next_id = this.next._leaflet_id;

    return this.data
  },
  registerBearing: function(bearing) {
    if (typeof this.fellow.bearings == 'undefined') this.fellow.bearings = [];
    this.fellow.bearings.push(bearing)
    return this;
  },
  setSiblings: function(previous, next) { 
    if (previous instanceof L.Marker.Waypoint) { // set if arg is a Waypoint or null
      this.previous = previous;
      previous.next = this;
    } else if (previous == null) this.previous = null;

    if (next instanceof L.Marker.Waypoint) { // set if arg is a Waypoint or null
      this.next = next;
      next.previous = this;
    } else if (next == null) this.next = null;
    
    this
      .fire('update', this, true);
    return this;
  },
  _decorate: function() {
    this.data.position = this._latlng;
    
    if(this.previous instanceof L.Marker.Waypoint) {
      let leg = this.geodesic.inverse(this.previous.getLatLng(), this.getLatLng());

      this.data.in = Number(leg.finalBearing.toPrecision(5));
      this.data.distance = Number(leg.distance.toPrecision(5));
      this.data.totalDistance = (this.previous.data.totalDistance || 0) + this.data.distance;
    }
    if(this.next instanceof L.Marker.Waypoint) {
      let leg = this.geodesic.inverse(this.getLatLng(), this.next.getLatLng());
      this.data.out = Number(leg.initialBearing.toPrecision(5));
    }

    this.togglePopup().togglePopup().toggleTooltip().toggleTooltip();
    return this;
  },
  tofirst: function(fcn) {
    return this._follow(fcn, mkr => mkr.previous );
  },
  tolast: function(fcn) {
    return this._follow(fcn, mkr => mkr.next );
  },
  _follow: function(fcn, step) {
    let mkr, nxt = this;
    while(nxt instanceof L.Marker.Waypoint) {
      mkr = nxt;
      if (typeof fcn == "function") fcn.call(this, mkr);
      nxt = step(mkr);
    }
    return mkr
  }
});