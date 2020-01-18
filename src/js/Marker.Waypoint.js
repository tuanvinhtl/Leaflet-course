import 'leaflet-rotatedmarker'

L.Marker.Traceroute = L.Marker.extend({
  options: {
    autoPan: true
  },
  bearingTo: function(latlng) {
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
  distanceTo: function (latlng) {
    return map.distance(this._latlng, latlng);
  },
});

L.Marker.Waypoint = L.Marker.Traceroute.extend({
  route: { in: 0, out: 0, distance: 0, totalDistance: 0 },
  bearings: [],
  addBearing: function(bearing) {
    this.bearings.push(bearing)
    bearing.origin = this;
    return this;
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

L.Marker.Bearing = L.Marker.Traceroute.extend({
  initialize: function(latlng, options) {
    this.trace = new L.Polyline([], options.trace);
    delete options.trace;

    this
      .on('move', this._decorate, this)
      .on('move', this._draw, this)

    Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.call(this, latlng, options);
  },
  onAdd: function(map) {
    this.trace.addTo(map);
    Object.getPrototypeOf(Object.getPrototypeOf(this)).onAdd.call(this, map);
  },
  onRemove: function(map) {
    this.trace.remove();
    Object.getPrototypeOf(Object.getPrototypeOf(this)).onRemove.call(this, map);
  },
  bearing: {},
  setOrigin: function(origin) {
    this.origin = origin;
    origin
      .on('remove', this.remove, this)
      .on('move remove', this._decorate, this)
      .on('move remove', this._draw, this)
      .bearings.push(this);
    this
      ._decorate()
      ._draw();
    return this;
  },
  // TODO: assert if removeOrgin() could be useful.
  _decorate: function() {
    if (this.origin instanceof L.Marker.Waypoint) {
      this.bearing.qdr = Number(this.bearingTo(this.origin.getLatLng()).toPrecision(5));
      this.bearing.qdm = Number(this.origin.bearingTo(this._latlng).toPrecision(5));
      this.bearing.distance = Number(this.distanceTo(this.origin.getLatLng()).toPrecision(5));
    }
    this.toggleTooltip().toggleTooltip();
    return this
  },
  _draw: function() {
    this.trace.setLatLngs([this._latlng, this.origin.getLatLng()])
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
  // setHeading: function(latlng) {
  //   if (typeof this.position.heading == 'undefined') {
  //     this.position.heading = (this.bearingTo(latlng) -180) % 360;
  //   }
  //   this.setRotationAngle(this.position.heading)
  // },
  _extractLocation: function(e) {
    this.position = (({ latitude, longitude, altitude, vario, accuracy, altitudeAccuracy, heading, bearing, estimatedSpeed, speed, timestamp }) => ({ latitude, longitude, altitude, vario, accuracy, altitudeAccuracy, heading, bearing, estimatedSpeed, speed, timestamp }))(e)
    return this
  }
});
