# Mapping Data with Observable Plot

<!-- IMPORTS -->
```js
import {utcParse} from "d3-time-format";
import {getPowerPlantBarY, getPowerPlantMap} from "./components/powerPlants.js";
```

<!-- GET DATA -->
```js
const us_power_plants = FileAttachment("./../data/us_power_plants.csv").csv({typed: true})
```

<!-- GET US Shapes -->
```js
// Get county-level shape data for US
const us = await fetch(import.meta.resolve("npm:us-atlas/counties-10m.json")).then((r) => r.json())

// Isolate polygons by US Nation, States, and Counties
const nation = topojson.feature(us, us.objects.nation)
const states = topojson.feature(us, us.objects.states)
const counties = topojson.feature(us, us.objects.counties)

// Find state centroids (for text label)
const stateCentroid = states.features.map(d => ({name: d.properties.name, longitude: d3.geoCentroid(d.geometry)[0], latitude: d3.geoCentroid(d.geometry)[1]}))
```

## Resources & Readings

- GeoJson data format. [geojson.org](https://geojson.org/)
- U.S. Atlas TopoJSON - [us-atlas](https://www.npmjs.com/package/us-atlas): Node package that provides a convenient redistribution of the Census Bureau’s cartographic boundary shapefiles as TopoJSON files.
- **Observable Plot**
  - [Mapping with Plot](https://observablehq.com/@observablehq/plot-mapping): A great primer to bookmark.
  - [Projections](https://observablehq.com/plot/features/projections): Learn more about map projections, which are `x` and `y` coordinates that are mapped onto to a screen's pixel positions.
  - [Geo marks](https://observablehq.com/plot/marks/geo): Learn how to draw geographic features, such as polygons, lines, points, and other geometry, as thematic maps.


## 1. Review: Geo-Spatial Data

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

## 2. Basic TopoJSON File Shape

### us.objects.*nation*

<img src="https://raw.githubusercontent.com/topojson/us-atlas/master/img/nation.png" />

The nation has two fields:

* *nation*.id - the string `"US"`
* *nation*.properties.name - the string `"United States"`

### us.objects.*states*

<img src="https://raw.githubusercontent.com/topojson/us-atlas/master/img/states.png" />

Each state has two fields:

* *state*.id - the two-digit [FIPS state code](https://en.wikipedia.org/wiki/Federal_Information_Processing_Standard_state_code), such as `"06"`
* *state*.properties.name - the state name, such as `"California"`

### us.objects.*counties*

<img src="https://raw.githubusercontent.com/topojson/us-atlas/master/img/counties.png" />

Each county has two fields:

* *county*.id - the five-digit [FIPS county code](https://en.wikipedia.org/wiki/FIPS_county_code), such as `"06069"`
* *county*.properties.name - the county name, such as `"San Benito"`

The first two digits of the county FIPS code is the state FIPS code.

If that's the case, then you can filter for a particular state, such as North Carolina with a FIPS code of `37`.

```js
const nc_Counties = ({type: "FeatureCollection", features: counties.features.filter((d) => d.id.startsWith("37"))})
const nc_State = states.features.find((d) => d.id === "37")
```

```js
nc_Counties
```

## 3. Review: How to Fetch GeoJSON with us-atlas

We're going to use a handy node module, us-atlas, to fetch and use GeoJSON shape datasets. Here's one way to get started:

```javascript
// Get county-level shape data for US
const us = await fetch(import.meta.resolve("npm:us-atlas/counties-10m.json")).then((r) => r.json())

// Isolate polygons by US Nation, States, and Counties
const nation = topojson.feature(us, us.objects.nation)
const states = topojson.feature(us, us.objects.states)
const counties = topojson.feature(us, us.objects.counties)

// Use .map() to isolate state centroids (for text label)
const stateCentroid = states.features.map(d => ({name: d.properties.name, longitude: d3.geoCentroid(d.geometry)[0], latitude: d3.geoCentroid(d.geometry)[1]}))
```

Note how we are fetching the counties-10m.json file on-the-fly, so we do not need to host all of the data in our repo. But, that means we need to be connected to the internet to use it.

## 4. How To Create Maps with Observable Plot

```js
us_power_plants
```

```js
const selectPrimSource = view(
  Inputs.select(
    us_power_plants.map(d => d.PrimSource),
    {
      unique: true,
      label: "Select primary source(s):",
      multiple: true,
      value: ["coal", "nuclear", "hydroelectric", "wind"],
    }
  )
)
```

```js
const sampledPowerPlants = us_power_plants.filter(
  d => {
    for (let source of selectPrimSource) {
      if (d.PrimSource == source) {
        return d
      }
    }
  }
)
```

```js
Plot.plot(
  {
    marginLeft: 100,
    marks: [
      Plot.barX(
        sampledPowerPlants,
         {
          y: "PrimSource",
          x: "Total_MW",
          fill: "PrimSource",
          tip: true,
          sort: {y: "-x"},
        }
      )
    ]
  }
)
```

```js
Plot.plot({ // Initialize the plot
  projection: "albers-usa", // Set the projection
  marks: [
    Plot.geo(counties, { fill: "white", stroke: "var(--theme-foreground)", opacity: 0.1, }), // Add the state & county boundaries
    Plot.dot(sampledPowerPlants,
      { // Create dot marks (bubbles) using data from power_plants
        x: "longitude", // Provide longitude values
        y: "latitude", // Provide latitude values
        r: "Install_MW", // Update bubble radius based on this variable's value
        fill: "PrimSource", // Update dot fill color to depend on primary source (variable: PrimSource)
        opacity: 0.7, // Decrease opacity (0 = transparent, 1 = opaque)
        tip: true,
      }
    ),
    Plot.dot(sampledPowerPlants,
      { // Can you figure out what this additional Plot.dot layer adds?
        x: "longitude",
        y: "latitude",
        r: "Total_MW",
        fill: "PrimSource",
        stroke: "black",
        filter: d => d.Total_MW > 3500
      }
    ),
    Plot.text(sampledPowerPlants,
      { // Add text to the map using data from us_power_plants
        x: "longitude", // Place text horizontally at plant longitude
        y: "latitude", // Place text vertically at plant latitude
        text: "Plant_Name", // The text that appears is the value from the Plant_Name column,
        filter: (d) => d.Total_MW > 3500, // Only add text for plants with capacity exceeding 3500 MW
        fontSize: 12, // Increased font size
        fontWeight: 600, // Increased font weight
        stroke: "white", // Adds white outer stroke to text (for readability)
        fill: "black", // Text fill color
        textAnchor: "start", // Left align text with the x- and y-coordinates
        dx: 15 // Shifts text to the right (starting from left alignment with coordinate)
      }
    ),
  ],
  r: { range: [1, 15] }, // Limit the size range for dot radii
  color: { legend: true }, // Include a legend for the fill color
  margin: 50,
})
```

## 5. State-Only: North Carolina Power Plants Only

Let's filter the sampled data to only draw power plants in North Carolina.

We will use D3's d3-geo function called `.geoContains()`:

> **geoContains(object, point)**
>
> - Returns `true` if and only if the specified GeoJSON object contains the specified point, or false if the object does not contain the point.
>
> - Point must be specified as a two-element array [longitude, latitude] in degrees.

Each power plant entry has a `longitude` and a `latitude` property, which we simply need to provide as an Array to `.geoContains()`.

```javascript
const sampled_NC_PowerPlants = us_power_plants.filter(
  (pp) => {
    // Go through each selected source type from the above selection form
    for (let source of selectPrimSource) {
      // If the selected source & if the lat-lon are within the provided geo shape, return the row
      if ( (pp.PrimSource == source) && (d3.geoContains(nc_State, [pp.longitude, pp.latitude]) === true)) {
        return pp
      }
    }
  }
)
```

```js
const sampled_NC_PowerPlants = us_power_plants.filter(
  (pp) => {
    for (let source of selectPrimSource) {
      if ( (pp.PrimSource == source) && (d3.geoContains(nc_State, [pp.longitude, pp.latitude]) === true)) {
        return pp
      }
    }
  }
)
```

```js
sampled_NC_PowerPlants
```

```js
Plot.plot({
  // See projection references:
  // - NC-specific: https://observablehq.com/@observablehq/plot-north-carolina-map
  // - All states: https://github.com/veltman/d3-stateplane
  projection: {
    type: "conic-conformal",
    rotate: [80, 0],
    domain: nc_Counties,
  },
  // Add your marks
  marks: [
    Plot.geo(nc_Counties, { fill: "white", stroke: "var(--theme-foreground)", opacity: 0.3, }), // Add the state & county boundaries
    Plot.dot(sampled_NC_PowerPlants,
      { // Create dot marks (bubbles) using data from power_plants
        x: "longitude", // Provide longitude values
        y: "latitude", // Provide latitude values
        r: "Install_MW", // Update bubble radius based on this variable's value
        fill: "PrimSource", // Update dot fill color to depend on primary source (variable: PrimSource)
        opacity: 0.7, // Decrease opacity (0 = transparent, 1 = opaque)
        tip: true,
      }
    ),
    Plot.dot(sampled_NC_PowerPlants,
      { // Can you figure out what this additional Plot.dot layer adds?
        x: "longitude",
        y: "latitude",
        r: "Total_MW",
        fill: "PrimSource",
        stroke: "black",
        filter: d => d.Total_MW > 1750
      }
    ),
    Plot.text(sampled_NC_PowerPlants,
      { // Add text to the map using data from us_power_plants
        x: "longitude", // Place text horizontally at plant longitude
        y: "latitude", // Place text vertically at plant latitude
        text: "Plant_Name", // The text that appears is the value from the Plant_Name column,
        filter: (d) => d.Total_MW > 1750, // Only add text for plants with capacity exceeding 3500 MW
        fontSize: 12, // Increased font size
        fontWeight: 600, // Increased font weight
        stroke: "white", // Adds white outer stroke to text (for readability)
        fill: "black", // Text fill color
        textAnchor: "start", // Left align text with the x- and y-coordinates
        dx: 15 // Shifts text to the right (starting from left alignment with coordinate)
      }
    ),
  ],
  r: { range: [1, 15] }, // Limit the size range for dot radii
  color: { legend: true }, // Include a legend for the fill color
  margin: 50,
})
```


## 6. Grid Layout Version

```js
const shapeDict = {
  nation: nation,
  states: states,
  counties: counties,
}
```

<section>
  <h3>Map & Chart with Grid Layout</h3>

  <div class="grid grid-cols-3 grid-rows-3" style="grid-auto-rows: 700px">
    <div class="card grid-colspan-1 grid-rows-3">${resize((width, height) => getPowerPlantBarY(width, height, sampledPowerPlants))}</div>
    <div class="card grid-colspan-2 grid-rows-3">${resize((width, height) => getPowerPlantMap(width, height, shapeDict, sampledPowerPlants))}</div>
  </div>

</section>
