# Leaflet.Control.Traceroute

This plugin is heavily inspired by [Leaflet.PolylineMeasure](https://github.com/ppete2/Leaflet.PolylineMeasure) (even the README), I rewrote the plugin in a more 'leaflet' way using, markers, handler, icons, and so on in order to be more flexible.

* Leaflet Plugin to **trace routes** on earth or sea.
* Measuring **distance**, **heading** and **bearing**.
* Lines are drawn as realistic arcs. **Bearings** and **distances** are calculated considering [**Great-circle distance**](https://en.wikipedia.org/wiki/Great-circle_distance) which is the shortest path between 2 points on Earth.
* **Arrows** indicating the **real midways** of the line's great-circle **distances**, not their optical middle which is different due to projection, especially in high latitudes.
* To **finish** a route just *click* onto the last point, or *press "ESC" key*.
* **Moving** of route's points afterwards is possible by *dragging* them.
* **Resume** a route after it has been finished, by *clicking* onto the last point.
* **Insert** points, by *clicking* onto an arrow.
* **Delete** points, by *right clicking* onto a point.
* Work on **touchscreen** too. *rightclick* become *long press*

## Demo
* Please take a look at the [**Demo**](https://elmatou.github.io/Leaflet-traceroute/dist/demo.html)

## Usage

Add 1 line of code within your **HTML-file** to load the .js files of the plugin:
```html
  <script src="src/js/leaflet-control-traceroute.js"></script>
```

Add 1 line of code within your **Javascript-file** to add the plugin's control into your Leaflet map.  

```js
  L.control.traceroute(<options ?>).addTo(map);
```

Alternatively you can install the plugin with npm : `npm install leaflet-traceroute`

## Options & defaults
The default options are the following.

```js
  {
    position: 'topright',
    cursor: 'crosshair',
    tools: {
      route: {
        icon: '☡',
        title: 'Start a route',
        handler: L.Handler.RouteBase, // Should not be changed unless you extended the plugin
        waypoint: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<span class='leaflet-control-traceroute-point'></span>", iconAnchor: [20, 18], iconSize: [40, 40] }),
          popup: p => `<pre>${JSON.stringify(L.Control.Traceroute.extract(p.export()), null, 2)}</pre>`,
          tooltip: p => `<pre>${JSON.stringify(L.Control.Traceroute.extract(p.export()), null, 2)}</pre>`,
        },
        midpoint: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<div class='leaflet-control-traceroute-arrow'></div>", iconAnchor: [20, 18], iconSize: [40, 40] }),
          tooltip: 'Click to insert a waypoints here',
          opacity: 0.5
        },
        trace: { weight: 5, opacity: 0.5, color: 'black' }, // See Polyline for supported options
        pointer: { dashArray: '8' }, // See Polyline for supported options
      },
      bearing: {
        icon: '∡',
        title: 'Radio Navigation',
        handler: L.Handler.BearingBase, // Should not be changed unless you extended the plugin
        marker: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<span class='leaflet-control-traceroute-losange'></span>", iconAnchor: [20, 18], iconSize: [40, 40] }),
          tooltip: p => `<pre>${JSON.stringify(L.Control.Traceroute.extract(p.export()), null, 2)}</pre>`,
        },
        trace: { dashArray: '5,5,1,5', opacity: 0.3, color: 'grey', }, // See Polyline for supported options
        pointer: { dashArray: '8' } // See Polyline for supported options
      },
      track: {
        icon: '✈',// ✇
        title: 'Track Position',
        handler: L.Handler.TrackBase, // Should not be changed unless you extended the plugin
        marker: {
          icon: L.divIcon({ className: 'leaflet-control-traceroute-icon', html: "<div class='leaflet-control-traceroute-airplane'></div>", iconAnchor: [20, 18], iconSize: [40, 40] }),
          tooltip: p => `<pre>${JSON.stringify(L.Control.Traceroute.extract(p.export()), null, 2)}</pre>`,
        },
        circle: {},
        trace: { weight: 5, opacity: 0.5, color: 'black' }, // See Polyline for supported options
        locate: { enableHighAccuracy: true, timeout: 5000, maximumAge: 0, setView: true } // See map.locate() for supported options.
      },
      clear: {
        icon: '✗',// ⥇
        title: 'Clear routes',
        handler: L.Handler.ClearBase // Should not be changed unless you extended the plugin
      }
    }
  }
```

You can fine tune the control by setting different value, or `undefined` if you want to disable a specific feature.

eg: this one will disable the bearing measurement and track tools. It also will remove the popup on waypoints.

```js
  {
    tools: {
      route: {
        waypoint: {
          popup: undefined,
        }
      },
      bearing: undefined,
      track: undefined,
    }
  }
```
You can also create a new tool prety easily. see the [extend section](##Extend the plugin with new tool) below, or ask in the issues tracker.

## Styling
Traces and lines are styled in options with corresponding Leaflet object.

Markers icons are styled with embedded CSS. You can see it [in source](/src/css/trace.css).

You can create new classes based on the current, just be sure to set the orientation of tracker or arrow icons.

## Data structure
We use subclasses of leaflet objects.

### `<Control.Traceroute>`
Extends `Control`, will load the tools set in options. will handle display of icons, and handle the state of each tool. Got an export() method to to get current route or track drawn by the plugin.

#### `export()`

### `<LayerGroup.Route>`
Represent a whole route, with points, lines and decorations, extends `LayerGroup`.

```js
  <LayerGroup.Route>.waypoints // is a `LayerGroup` of Markers representing ... waypoints.
  <LayerGroup.Route>.trace // is a [`Leaflet.Geodesic`](https://github.com/henrythasler/Leaflet.Geodesic) hosting the Polyline
  <LayerGroup.Route>.midpoints // is a `LayerGroup` of Markers representing midpoint of each segment. They are generated each time the line is redrawn (on waypoint addition, insertion, removing).

  <LayerGroup.Route>.export() // return a representation of the route.
```

### `<Marker.Waypoint>`
Waypoints are <Marker> decorated with input bearing, output bearing, distance from last point and distance from beginning. they are chained to make a route.
You can add more attributes (like, name, altitude, ...) with a hook on the `traceroute:waypoint:add` events.

```js
  <Marker.Waypoint>.data // {
  //   "in": 115.01,
  //   "out": 255.72,
  //   "distance": 2515.8,
  //   "totalDistance": 2515.8,
  // }
  <Marker.Waypoint>.previous // previous Waypoint in route or null
  <Marker.Waypoint>.next // next Waypoint in route or null
  <Marker.Waypoint>.fellow.bearings // array of Bearings associated to this Waypoint.

  <Marker.Waypoint>.export() // return a representation of the Waypoint.
```

to document : setSiblings(), toLast(), toFirst(), registerBearing(),

### `<Marker.Bearing>`
Bearing are Markers decorated with input bearing, output bearing, distance.
You can add more attributes (like, name, altitude, ...) with a hook on the `traceroute:waypoint:add` events.
```js
  <Marker.Bearing>.data // {
  //   "QDR": 115.01,
  //   "QDM": 255.72,
  //   "distance": 2515.8,
  // }
  <Marker.Bearing>.previous // previous Waypoint in route or null
  <Marker.Bearing>.next // next Waypoint in route or null
  <Marker.Bearing>.fellow.origin // Waypoint associated to this Bearing.

  <Marker.Bearing>.export() // return a representation of the Bearing.
```

### `<Marker.Trackpoint>`

## Importing and exporting routes & tracks

### export()

### import()

## Events
It fire some events during the tracing in order to allow more interactivity with the app. Subscribe to events with :
```js
map.on(
  'traceroute:route:start' // <Control.Traceroute>
  'traceroute:route:stop' // <Control.Traceroute>
  'traceroute:route:update' // <LayerGroup.Route>
  'traceroute:route:new' // <LayerGroup.Route>
  'traceroute:route:finish' // <LayerGroup.Route>
  'traceroute:route:abort' // <LayerGroup.Route>
  'traceroute:route:resume' // <LayerGroup.Route>

  'traceroute:clear' // nothing

  'traceroute:waypoint:add' // <Marker.Waypoint>
  'traceroute:waypoint:move' // <Marker.Waypoint>
  'traceroute:waypoint:remove' // <Marker.Waypoint>
  'traceroute:waypoint:update' // <Marker.Waypoint>

  'traceroute:bearing:start' // <Control.Traceroute>
  'traceroute:bearing:stop' // <Control.Traceroute>
  'traceroute:bearing:add' //FIXME
  'traceroute:bearing:move' //FIXME
  'traceroute:bearing:remove' //FIXME

  'traceroute:track:start' // <Control.Traceroute>
  'traceroute:track:stop' // <Control.Traceroute>
  'traceroute:track:found' // <GeolocationPosition>
  'traceroute:track:error' // <GeolocationPositionError>
);
```

Please take a look at the [**Demo**](https://elmatou.github.io/Leaflet-traceroute/dist/demo.html) each event is printed in the console.

## Helpers
the library come with some handy function to help you.

```js
L.Control.Traceroute.format(number, unit); // convert and format values issued from leaflet  Control.Traceroute or Geolocation API to the desired units. supports km, mi, NM, km/h, ft/min, kt, ft, °, time default to m
L.Control.Traceroute.extract(data); // from (<Marker.Waypoint> | <Marker.Bearing> | <Marker.Trackpoint>).data . Filter and Format the data to print them elsewhere.
```

## Extend the plugin with new tool

It is pretty easy to extend the plugin with new tools. You basicaly need to do two things :

  * add your tool part in options 
  ```js
  {
    tools: {
      //...
      mytool: {
        icon: 'A',
        title: 'My new Tool',
        handler: L.Handler.MyToolBase
      }
    }
  }
  ```
  * Create a new handler `L.Handler.MyToolBase`

  ```js
  L.Handler.MyToolBase = L.Handler.extend({
  initialize: function (control, options) {
    L.Util.setOptions(this, options);
    this._control = control;
    // host & initialize values here.
  },
  addHooks: function() {
    this.target.style.filter = 'invert(1)';
    // Set your behaviour here.
    map.fire('traceroute:mytool:start'), this._control; // fire some event is a good practice
  },
  removeHooks: function() {
    this.target.style.filter = 'invert(0)';
    // Unset your behaviour here.
    map.fire('traceroute:mytool:stop', this._control); // fire some event is a good practice
  },
});
  ```
for a pretty simple example see [Clear tool](src/js/Handler.ClearBase.js) which remove anything drawn with this control from the map.

for a more complex one see [the Route tool](src/js/Handler.RouteBase.js) which is a suite of handlers describing the several states needed to create and edit a route.