L.Handler.TrackBase = L.Handler.extend({
  initialize: function (control) {
    this._control = control;
    this.marker = new L.Marker.Trackpoint([],
      L.extend({ }, this._control.options.trackpoint))
    this.trace = new L.Polyline([], this._control.options.trace)
    this.circle = new L.Circle([], this._control.options.trackcircle)
  },
  addHooks: function() {
    this.target.style.filter = 'invert(1)';

    map
      .on('locationfound', this._locationFound, this)
      .on('locationerror', this._locationError, this)
      .locate(L.extend({ watch: true }, this._control.options.track))
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
      try {
        estimated = {
          heading: (this.marker.bearing(e.latlng)),
          speed: this.marker.distance(e.latlng) / (e.timestamp - this.marker.position.timestamp)
        }
      } catch {}

    this.marker
      .setLatLng(e.latlng)
      .addTo(map)
      .setOpacity(1)
      .bindTooltip(this.marker.options.tooltip, { direction: 'auto' })
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
    this.marker
      .setOpacity(0.5)
      .bindTooltip('Location lost', { direction: 'auto' })
      .addTo(map);
  }
});
