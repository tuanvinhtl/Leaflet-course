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
* Please take a look at the [**Demo**](https://elmatou.github.io/Leaflet-control-traceroute/demo.html)

## Usage

Add 3 code lines within your **HTML-file** to load the .css and .js files of the plugin:
```html
  <script src="https://cdn.jsdelivr.net/npm/leaflet.geodesic"></script>
  <link rel="stylesheet" href="src/css/leaflet-control-traceroute.css" />
  <script src="src/js/leaflet-control-traceroute.js"></script>
```

Add 1 code line within your **Javascript-file** to add the plugin's control into your Leaflet map.  
```js
L.control.traceroute(options).addTo(map);
```

## Package manager install

It will be possible to install and update this plugin using package managers like `npm`.

## Default options

```js
options: {
  route: ['☡', 'Start a route'], // Control icon for drawing routes
  clear: ['✗', 'Clear routes'], // Control icon for clearing routes
  pointIcon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<span class='leaflet-control-traceroute-point'></span>", iconAnchor: [20, 18], iconSize:[40, 40]}), // Icon for a waypoint
  arrowIcon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: L.DomUtil.create('div', 'leaflet-control-traceroute-arrow'), iconAnchor: [20, 18], iconSize:[40, 40]}), // Icon for midways points
  pointPopup: "<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}<br /><strong>Total distance :</strong> {totalDistance}", // Template for the popups
  pointTooltip:"<strong>in :</strong> {in}<br /><strong>out :</strong> {out}<br /><strong>distance :</strong> +{distance}", // Template for the tooltips
 },
```
## Data structure

### `LayerRoute`
Represent a whole route, with points, lines and decorations, extends `LayerGroup`.

  * `<LayerRoute>.waypoints` is a `LayerGroup` of Markers representing ... waypoints.
  * `<LayerRoute>.trace` is a [`Leaflet.Geodesic`](https://github.com/henrythasler/Leaflet.Geodesic) hosting the Polyline
  * `<LayerRoute>.midpoints` is a `LayerGroup` of Markers representing midpoint of each segment. They are generated each time the line is redrawn (on waypoint addition, insertion, removing).

### Waypoint
Markers are decorated in there options attributes with input bearing, output bearing, distance from last point and distance from beginning.
You can add more attributes (like, name, altitude, ...) with a hook on the `traceroute:point:add` events.

### `<Traceroute>._routes`

### `<Traceroute>.activeRoute`

```js
<Marker>.options = {
  // ...
  "routeId": 115,
  "in": "115.0°",
  "out": "255.7°",
  "distance": "2515.8NM",
  "totalDistance": "2515.8NM",
  "_totalDistance": 4659293.312335049
}
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
map.on('traceroute:waypoint:add', e => { /* <Marker> */});
map.on('traceroute:waypoint:move', e => { /* <Marker> */});
map.on('traceroute:waypoint:remove', e => { /*<Marker> */});
```
Please take a look at the [**Demo**](https://elmatou.github.io/Leaflet-control-traceroute/demo.html) each event is printed in the console.
