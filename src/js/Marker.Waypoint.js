import 'leaflet-rotatedmarker'

L.Marker.Traceroute = L.Marker.extend({
  initialize: function(latlng, options) {
    L.Marker.prototype.initialize.call(this, latlng, L.extend({ autoPan: true}, options));
  },
  bearing: function(latlng) {
    // https://github.com/makinacorpus/Leaflet.GeometryUtil
    let rad = Math.PI / 180,
        lat1 = this._latlng.lat * rad,
        lat2 = latlng.lat * rad,
        lon1 = this._latlng.lng * rad,
        lon2 = latlng.lng * rad,
        y = Math.sin(lon2 - lon1) * Math.cos(lat2),
        x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1);
    return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
  },
  distance: function (latlng) {
    return this._map.distance(this._latlng, latlng);
  },
});

L.Marker.Waypoint = L.Marker.Traceroute.extend({
  initialize: function(latlng, options) {
    L.Marker.Traceroute.prototype.initialize.call(this, latlng, options);
    this.route = { in: 0, out: 0, distance: 0, totalDistance:0 };
  },
  // TODO: decorate should be here, need next prev method on ordered layer
  // _decorate: function(prev, next) {
  //
  //   this.route.position = this._latlng
  //   this.route.in = geodesic.inverse(prev.getLatLng(), this.getLatLng());
  //   this.route.out = geodesic.inverse(this.getLatLng(), next.getLatLng());
  //   this.togglePopup().togglePopup().toggleTooltip().toggleTooltip();
  //
  //   this.route.position = this._latlng
  //   this.route.out = geodesic.inverse(this.getLatLng(), next.getLatLng());
  //   next.route.in
  // },
});

L.Marker.Bearingpoint = L.Marker.Traceroute.extend({
  initialize: function(latlng, options) {
    L.Marker.Traceroute.prototype.initialize.call(this, latlng, options);
// TODO: bring bearing logic and trace inside Targetpoint
  },
  decorate: function(origin) {
    this.bearing.qdr = Number(this.bearing(origin.getLatLng()).toPrecision(5));
    this.bearing.qdm = Number(origin.bearing(this._latlng).toPrecision(5));
    this.bearing.distance = Number(this.distance(origin.getLatLng()).toPrecision(5));
    this.toggleTooltip().toggleTooltip();
    return this
  },
});

L.Marker.Trackpoint = L.Marker.Traceroute.extend({
  decorate: function(e) {
    this
      ._extractLocation(e)
      .setRotationAngle(e.heading || 0)
      .toggleTooltip().toggleTooltip();
  },
  setHeading: function(latlng) {
    if (typeof this.position.heading == 'undefined') {
      this.position.heading = (this.bearing(latlng) -180) % 360;
    }
    this.setRotationAngle(this.position.heading)
  },
  _extractLocation: function(e) {
    this.position = (({ latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, bearing, speed, timestamp }) => ({ latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, bearing, speed, timestamp }))(e)
    return this
  }
});
