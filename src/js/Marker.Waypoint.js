L.Marker.Waypoint = L.Marker.extend({
  initialize: function(latlng, options) {
    L.Marker.prototype.initialize.call(this, latlng, L.extend({ draggable: true, autoPan: true}, options));
    this.route = { in: 0, out: 0, distance: 0, totalDistance:0 };
  },
  position: () => { return this._latlng },
  data: {},
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
