# Leaflet.Control.Traceroute

~~ This plugin is heavily inspired by [Leaflet.PolylineMeasure](https://github.com/ppete2/Leaflet.PolylineMeasure) (even the README), I rewrite the plugin in a more 'leaflet' way using, markers, icons, popup, tooltips and so on in order to be more flexible.

* Leaflet Plugin to **trace routes** on earth or sea.
* Measuring **distance**, **heading** and **bearing**.
* Lines are drawn as realistic arcs. **Bearings** and **distances** are calculated considering [**Great-circle distance**](https://en.wikipedia.org/wiki/Great-circle_distance) which is the shortest path between 2 points on Earth.
* **Arrows** indicating the **real midways** of the line's great-circle **distances**, not their optical middle which is different due to projection, especially in high latitudes.
* To **finish** drawing a route just *doubleclick*, or *singleclick* onto the last point, or *press "ESC"-key*.
* **Moving** of route's points afterwards is possible by *dragging* them.
* **resume** a route after it has been finished, by *clicking* onto the last point of a line.
* **insert** points, by *clicking* onto an arrow.
* **delete** points, by *right clicking* onto a point.
* Should work on **touchscreen** too.

## Demo
* Please take a look at the [**Demo**](https://elmatou.github.io/Leaflet-control-traceroute/trace.html)

## Usage

Add 1 code line within your **HTML-file** to load the .js files of the plugin:
```html
  <script src="src/js/leaflet-control-traceroute.js"></script>
```

Add 1 code line within your **Javascript-file** to add the plugin's control into your Leaflet map.  
```js
L.control.traceroute(options).addTo(map);
```
It will be possible to install and update this plugin using package managers like `npm`.

## Default options
```js
{
  control: {
    toggle: ['☡', 'Start a route'],  // Control icon for drawing routes ⥉
    clear: ['✗', 'Clear routes'], // Control icon for clearing routes ⥇
    compass: ['∡', 'Radio Navigation'], // Control icon for adding bearing calculation to a route  🧭 ∢ ∠
  },
  waypoint: { // Icon for a waypoint
    icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<span class='leaflet-control-traceroute-point'></span>", iconAnchor: [20, 18], iconSize:[40, 40]}),
    popup: p => { // Content of the popup
      return L.Util.template("<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}<br /><strong>Total distance :</strong> {totalDistance}", L.Control.Traceroute.extractData(p))
    },
    tooltip: p => { // Content of the tooltip
      return L.Util.template("<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}", L.Control.Traceroute.extractData(p))
    },
  },
  midpoint: { // Icon for a midpoint
    icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: L.DomUtil.create('div', 'leaflet-control-traceroute-arrow'), iconAnchor: [20, 18], iconSize:[40, 40]}),
  },
  pointerTrace: {dashArray: '8'}, // temporary trace while mouse is moving
  trace: { // trace of the route on the map.
    weight: 5,
    opacity: 0.5,
    color: 'black',
  }
}
```
## Data structure

### `<Control.Traceroute>._routes`
### `<Control.Traceroute>._currentRoute`
### `<LayerGroup.Route>`
Represent a whole route, with points, lines and decorations, extends `LayerGroup`.

  * `<LayerRoute>.waypoints` is a `LayerGroup` of Markers representing ... waypoints.
  * `<LayerRoute>.trace` is a [`Leaflet.Geodesic`](https://github.com/henrythasler/Leaflet.Geodesic) hosting the Polyline
  * `<LayerRoute>.midpoints` is a `LayerGroup` of Markers representing midpoint of each segment. They are generated each time the line is redrawn (on waypoint addition, insertion, removing).

### Waypoint
Markers are decorated with input bearing, output bearing, distance from last point and distance from beginning.
You can add more attributes (like, name, altitude, ...) with a hook on the `traceroute:waypoint:add` events.
```js
<Marker.Waypoint>.options // {
  //   "routeId": 115,
  // }
<Marker.Waypoint>.route // {
  //   "in": 115.01,
  //   "out": 255.72,
  //   "distance": 2515.8,
  //   "totalDistance": 2515.8,
  // }
```



## Events
It fire some events during the tracing in order to allow more interactivity with the app. Subscribe to events with :
```js
map.on('traceroute:toggle', e=> { /* <Control.Traceroute>  with active: true|false */ });
map.on('traceroute:new', e=> { /* <LayerRoute> */ });
map.on('traceroute:finish', e=> { /* <LayerRoute> */ });
map.on('traceroute:resume', e=> { /* <LayerRoute> */ });
map.on('traceroute:clear', e=> { /* */ });
map.on('traceroute:update', e=> { /* <LayerRoute> */ });
map.on('traceroute:waypoint:add', e => { /* <Marker.Waypoint> */});
map.on('traceroute:waypoint:move', e => { /* <Marker.Waypoint> */});
map.on('traceroute:waypoint:remove', e => { /*<Marker.Waypoint> */});
```
Please take a look at the [**Demo**](https://elmatou.github.io/Leaflet-control-traceroute/trace.html) each event is printed in the console.

## Helpers
the library come with some handy function to help you.
```js
L.Control.Traceroute.format(number, unit);
L.Control.Traceroute.extractData(<Marker.Waypoint>);
L.Control.Traceroute.export(<LayerRoute>);

```
