L.Marker.Traceroute = L.Marker.extend({
  initialize: function(latlng, options) {
    L.Marker.prototype.initialize.call(this, latlng, L.extend({ autoPan: true}, options));
  },
  position: () => { return this._latlng },
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
  data: {},
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
    this.route = { qdr: 0, qdm: 0, distance: 0 };
// TODO: bring bearing logic and trace inside Targetpoint
  },
  _decorate: function() {
    this.route.qdr = Number(this.bearing(this.options.origin.getLatLng()).toPrecision(5));
    this.route.qdm = Number(this.options.origin.bearing(this._latlng).toPrecision(5));
    this.route.distance = Number(this.distance(this.options.origin.getLatLng()).toPrecision(5));
    this.toggleTooltip().toggleTooltip();
    return this
  },
});
