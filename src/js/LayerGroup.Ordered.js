// Standart LayerGroup use JS object to store layers. This is not suitable to maintain order (insertion or else) in the collection. here we use Map, and create some useful methods
// import L from 'leaflet';

L.LayerGroup.Ordered = L.LayerGroup.extend({
  initialize: function (layers, options) {
    L.Util.setOptions(this, options);

    this._layers = new Map;

    var i, len;

    if (layers) {
      for (i = 0, len = layers.length; i < len; i++) {
        this.addLayer(layers[i]);
      }
    }
  },
  addLayer: function (layer) {
    var id = this.getLayerId(layer);

    this._layers.set(id, layer);

    if (this._map) {
      this._map.addLayer(layer);
    }

    return this;
  },
  removeLayer: function (layer) {
    var id = this._layers.has(layer) ? layer : this.getLayerId(layer);

    if (this._map && this._layers.delete(id)) {
      this._map.removeLayer(layer);
    }

    return this;
  },
  // // @method hasLayer(layer: Layer): Boolean
  // // Returns `true` if the given layer is currently added to the group.
  // // @alternative
  // // @method hasLayer(id: Number): Boolean
  // // Returns `true` if the given internal ID is currently added to the group.
  // hasLayer: function (layer) {
  //   return !!layer && (this._layers.has(layer) ||  this._layers.has(this.getLayerId(layer)));
  // },
  // @method insertLayer(layer: Layer, after: Number): this
  // Inserts the given layer to the group after the layer with the given internal ID.
  insertLayer: function(new_layer, after) {
    let newMap = new Map();
    this._layers.forEach((value, key, map) => {
      newMap.set(key, value);
      if(key === after) {
        newMap.set(this.getLayerId(new_layer), new_layer);
      }
    });
    this._layers = newMap;

    if (this._map) {
      this._map.addLayer(new_layer);
    }
    return this;
  },
  last: function() {
    return Array.from(this._layers.values()).pop();
  },
  invoke: function (methodName) {
    for (layer of this._layers.values()) {
      if (layer[methodName]) {
        layer[methodName].apply(layer, args);
      }
    }

    return this;
  },
  eachLayer: function (method, context) {
    for (var layer of this._layers.values()) {
      method.call(context, layer);
    }
    return this;
  },
  getLayer: function (id) {
    return this._layers.get(id);
  },
  getLayers: function () {
    return Array.from(this._layers.values());
  }
});
