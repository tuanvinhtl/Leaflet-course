// import L from 'leaflet';
import './LayerGroup.Ordered'

L.FeatureGroup.Ordered = L.LayerGroup.Ordered.extend({
  addLayer: function (layer) {
    if (this.hasLayer(layer)) {
      return this;
    }

    layer.addEventParent(this);

    L.LayerGroup.Ordered.prototype.addLayer.call(this, layer);

    // @event layeradd: LayerEvent
    // Fired when a layer is added to this `FeatureGroup`
    return this.fire('layeradd', {layer: layer});
  },
  insertLayer: function(layer, after) {
    if (this.hasLayer(layer)) {
      return this;
    }

    layer.addEventParent(this);

    L.LayerGroup.Ordered.prototype.insertLayer.call(this, layer, after);

    // @event layeradd: LayerEvent
    // Fired when a layer is added to this `FeatureGroup`
    return this.fire('layeradd', {layer: layer});
  },
  removeLayer: function (layer) {
    if (!this.hasLayer(layer)) {
      return this;
    }
    if (this._layers.has(layer)) {
      layer = this.getLayer(layer);
    }

    layer.removeEventParent(this);

    L.LayerGroup.Ordered.prototype.removeLayer.call(this, layer);

    // @event layerremove: LayerEvent
    // Fired when a layer is removed from this `FeatureGroup`
    return this.fire('layerremove', {layer: layer});
  },
  // @method setStyle(style: Path options): this
  // Sets the given path options to each layer of the group that has a `setStyle` method.
  setStyle: function (style) {
    return this.invoke('setStyle', style);
  },

  // @method bringToFront(): this
  // Brings the layer group to the top of all other layers
  bringToFront: function () {
    return this.invoke('bringToFront');
  },

  // @method bringToBack(): this
  // Brings the layer group to the back of all other layers
  bringToBack: function () {
    return this.invoke('bringToBack');
  },

  // @method getBounds(): LatLngBounds
  // Returns the LatLngBounds of the Feature Group (created from bounds and coordinates of its children).
  getBounds: function () {
    var bounds = new L.LatLngBounds();

    this._layers.forEach((layer) => {
      bounds.extend(layer.getBounds ? layer.getBounds() : layer.getLatLng());
    })
    return bounds;
  }
});

// L.featuregroup.ordered= function(layers, options) {
//   return new L.FeatureGroup.Ordered(layers, options);
// };
