# Understanding the Basics of Spatial Data

<!-- IMPORTS -->
```js
import {utcParse} from "d3-time-format";
// Import deck.gl components for interactive map
import deck from "npm:deck.gl";
const {Deck, AmbientLight, GeoJsonLayer, TextLayer, IconLayer, HexagonLayer, PointLight, ScatterplotLayer} = deck;
```

## Resources & Readings

- GeoJson data format. [geojson.org](https://geojson.org/)
- U.S. Atlas TopoJSON - [us-atlas](https://www.npmjs.com/package/us-atlas): Node package that provides a convenient redistribution of the Census Bureau’s cartographic boundary shapefiles as TopoJSON files.
- [deck.gl](https://www.npmjs.com/package/deck.gl): Node package that provides a convenient redistribution of the Census Bureau’s cartographic boundary shapefiles as TopoJSON files.
- **Common deck.gl Layers**
  - [@GeoJsonLayer](https://deck.gl/docs/api-reference/layers/geojson-layer): The GeoJsonLayer renders GeoJSON formatted data as polygons, lines and points (circles, icons and/or texts).
  - [@TextLayer](https://deck.gl/docs/api-reference/layers/text-layer): The TextLayer renders text labels at given coordinates.
  - [IconLayer](https://deck.gl/docs/api-reference/layers/icon-layer): The IconLayer renders raster icons at given coordinates.
  - [HeatmapLayer](https://deck.gl/docs/api-reference/aggregation-layers/heatmap-layer): HeatmapLayer can be used to visualize spatial distribution of data. It internally implements Gaussian Kernel Density Estimation to render heatmaps.
  - [HexagonLayer](https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer): The HexagonLayer aggregates data into a hexagon-based heatmap. The color and height of a hexagon are determined based on the objects it contains.
  - See all of the other available options in the docs.


## Primer on Geo-Spatial Data

In this notebook, we will learn how to use a conveniently hosted st of Census shape files from the . All of these files follow from the[ GeoJSON data format specification](https://geojson.org/), which looks like the following example:

```javascript
{
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
```

Check out a live, hosted example on their CDN (content delivery network) for U.S. state-level shapes: [states-10m.json](https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json).

## 2. How to Fetch GeoJSON with us-atlas

We're going to use a handy node module, us-atlas, to fetch and use GeoJSON shape datasets. Here's one way to get started:

```javascript
// Get county-level shape data for US
const us = await fetch(import.meta.resolve("npm:us-atlas/counties-10m.json")).then((r) => r.json())

// Isolate polygons by US State
const states = topojson.feature(us, us.objects.states)

// Use .map() to isolate state centroids (for text label)
const stateCentroid = states.features.map(d => ({name: d.properties.name, longitude: d3.geoCentroid(d.geometry)[0], latitude: d3.geoCentroid(d.geometry)[1]}))
```

Note how we are fetching the counties-10m.json file on-the-fly, so we do not need to host all of the data in our repo. But, that means we need to be connected to the internet to use it.

<!-- GET US STATE -->
```js
// Get county-level shape data for US
const us = await fetch(import.meta.resolve("npm:us-atlas/counties-10m.json")).then((r) => r.json())
// Isolate polygons by US State
const states = topojson.feature(us, us.objects.states)
// Find state centroids (for text label)
const stateCentroid = states.features.map(d => ({name: d.properties.name, longitude: d3.geoCentroid(d.geometry)[0], latitude: d3.geoCentroid(d.geometry)[1]}))
```

## 3. How To Create Maps in Observable with Deck.gl

Let's look in our code editor and review the steps to create the map.

<!-- 1. HTML TEMPLATE with OBSERVABLE CLASSES -->
<div class="grid grid-cols-3">
  <div class="card grid-colspan-3" style="padding: 0px;">
    <div style="padding: 1rem;">
      <h2>Simple Map with State-Level Shapes & Labels</h2>
      <p>Zoom and scroll, or hold down Shift to rotate.</p>
    </div>
  <div>
    <figure style="max-width: none; position: relative;">
      <div id="container__us_basic" style="border-radius: 8px; overflow: hidden; height: 620px; margin: 0rem 0;">
        <!-- The map gets inserted inside this canvas element with this ID attribute -->
        <canvas id="container__us_basic_canvas"></canvas>
      </div>
    </figure>
  </div>
</div>
</div>

<!-- 2. Create the initial state of the map to render -->
```js
const initialViewState = {
  longitude: -93,
  latitude: 38,
  zoom: 3,
  minZoom: 2,
  maxZoom: 12,
  pitch: 0,
  bearing: 0
}

// 3. Get canvas element via HTML ID attribute;
//    needed for cleaning up rendered map on page,
//    upon interactive updates with users
const canvasContainer = document.getElementById('container__us_basic_canvas')
```

<!-- 4. Create a new Deck() object -->
```js
const deckInstance = new Deck({
  canvas: "container__us_basic_canvas",
  initialViewState,
  controller: true,
  getTooltip: ({object}) => object && object.name,
})

// clean up if this code re-runs
invalidation.then(() => {
  deckInstance.finalize();
  canvasContainer.innerHTML = "";
})

// Fun icon example :-)
const lindgren = [
  {"name":"Former Lindgren Farmstead","address":"447 170th Ave SE, Hillsboro, ND 58045","coordinates":[-96.92278824723499, 47.34631985656351]},
  {"name":"Second home in Beaverton, OR","address":"14376 SW Farmington Rd, Beaverton, OR 97005","coordinates":[-122.82430999003266, 45.4853808857457]},
]
```

<!--
  5. Set properties on the Deck object,
     which includes drawing one layer at
     a time within the `layers: []` property.
-->
```js
deckInstance.setProps({
  controller: true,
  layers: [
    // 1. Basic state-level map
    new GeoJsonLayer({
      id: "us-base-map",
      data: states,
      lineWidthMinPixels: 1.5,
      getLineColor: [38, 38, 38],
      getFillColor: [255,255,255, 100]
    }),
    // 2. Labels for states
    new TextLayer({
      id: "us-text-layer",
      data: stateCentroid,
      getPosition: d => [d.longitude, d.latitude],
      getText: d => d.name,
      fontFamily: 'Helvetica',
      fontWeight: 200,
      background: false,
      fontSettings: ({
        sdf: true,
      }),
      outlineWidth: 1,
      getSize: 10,
      getColor: [8,8,8, 155],
      getTextAnchor: 'middle',
      getAlignmentBaseline: 'center',
      getPixelOffset: [0, -10]
    }),
    // 3. Add Icons
    // new IconLayer({
    //   id: 'IconLayer',
    //   data: lindgren,
    //   // data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',
    //   getColor: d => [Math.sqrt(d.exits), 140, 0],
    //   getIcon: d => 'marker',
    //   getPosition: d => d.coordinates,
    //   getSize: 40,
    //   iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    //   iconMapping: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.json',
    //   pickable: true
    // })
  ]
});
```
