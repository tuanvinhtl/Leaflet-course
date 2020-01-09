L.Marker.Traceroute = L.Marker.extend({
  initialize: function(latlng, options) {
    L.Marker.prototype.initialize.call(this, latlng, L.extend({ autoPan: true}, options));
  },
  position: () => { return this._latlng },
});

L.Marker.Waypoint = L.Marker.Traceroute.extend({
  initialize: function(latlng, options) {
    // TODO: Make WP draggable if Handler.Edit.enabled();
    L.Marker.prototype.initialize.call(this, latlng, options);
    this.route = { in: 0, out: 0, distance: 0, totalDistance:0 };
  },
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
