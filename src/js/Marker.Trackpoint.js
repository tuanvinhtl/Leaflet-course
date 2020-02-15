import './Marker.Course';
import 'leaflet-rotatedmarker'

L.Marker.Trackpoint = L.Marker.Course.extend({
  decorate: function(e) {
    this
      ._extractLocation(e)
      .setRotationAngle(e.heading || 0)
      .toggleTooltip().toggleTooltip();
  },
  // setHeading: function(latlng) {
  //   if (typeof this.data.heading == 'undefined') {
  //     this.data.heading = (this.bearingTo(latlng) -180) % 360;
  //   }
  //   this.setRotationAngle(this.data.heading)
  // },
  _extractLocation: function(e) {
    let params = [latitude, longitude, altitude, vario, accuracy, altitudeAccuracy, heading, bearing, estimatedSpeed, speed, timestamp];
    this.data = (({ ...params }) => ({ ...params }))(e)
    return this
  }
});
