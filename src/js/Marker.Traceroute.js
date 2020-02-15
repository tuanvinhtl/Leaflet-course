L.Marker.Traceroute = L.Marker.extend({
  initialize: function (latlng, options) {
    this.fellow = {};
    this.data = {};
    L.Marker.prototype.initialize.call(this, latlng, options);
  },
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
    return this._map.distance(this._latlng, latlng);
  },
  export: function() {
    return {}
  }
});