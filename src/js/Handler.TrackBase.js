L.Handler.TrackBase = L.Handler.extend({
  initialize: function (control, options) {
    L.Util.setOptions(this, options);
    this._control = control;

    this.marker = new L.Marker.Trackpoint([],
      L.extend({ }, this.options.marker))
      .bindTooltip(this.options.marker.tooltip, { direction: 'auto' })

    this.trace = new L.Polyline([], this.options.trace)
    this.circle = new L.Circle([], this.options.circle)
  },
  addHooks: function() {
    this.target.style.filter = 'invert(1)';

    map
      .on('locationfound', this._locationFound, this)
      .on('locationerror', this._locationError, this)
      .locate(L.extend({ watch: true }, this.options.locate))
      .fire('traceroute:track:start', this);
    this.trace.addTo(map);
  },
  removeHooks: function() {
    this.target.style.filter = 'invert(0)';

    map
      .stopLocate()
      .fire('traceroute:track:stop', this)
      .off('locationfound', this._locationFound, this)
      .off('locationerror', this._locationError, this);
  },
  _locationFound: function(e) {
      let estimated =  {}
      if (map.hasLayer(this.marker)) {
          estimated = {
            bearing: (this.marker.bearing(e.latlng)),
            estimatedSpeed: this.marker.distance(e.latlng) / Math.floor((e.timestamp - this.marker.position.timestamp)/1000),
            vario: (this.marker.position.altitude - e.altitude) / Math.floor((e.timestamp - this.marker.position.timestamp)/1000)
          }
      }

    this.marker
      .setLatLng(e.latlng)
      .addTo(map)
      .setOpacity(1)
      // .bindTooltip(this.marker.options.tooltip, { direction: 'auto' })
      .decorate(L.extend(estimated, e))

    this.circle
      .setLatLng(e.latlng)
      .addTo(map)
      .setRadius(e.accuracy)
    this.trace
      .addTo(map)
      .addLatLng(e.latlng)

    map
      .fire('traceroute:track:found', e)
  },
  _locationError: function(e) {
    // Start a new polyine segment
    this.marker
      .setOpacity(0.5)
      // .bindTooltip('Location lost', { direction: 'auto' })
      .addTo(map);
  }
});
