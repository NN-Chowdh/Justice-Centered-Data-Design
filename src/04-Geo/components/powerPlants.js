import * as Plot from "npm:@observablehq/plot";

const MW_CONSTANT = 3500

export const getPowerPlantBarY = (width, height, sampledPowerPlants) => {
  return Plot.plot(
    {
      title: `Normalized Mean Avg Total MW`,
      width: width,
      height: height-150,
      marginLeft: 100,
      marginBottom: 50,
      color: { legend: true },
      marks: [
        Plot.dotX(
          sampledPowerPlants,
          Plot.normalizeX({
            basis: "mean",
            x: "Total_MW",
            y: "PrimSource",
            fill: "PrimSource",
            stroke: "PrimSource",
            tip: true,
          })
        )
      ]
    }
  )
}

export const getPowerPlantMap = (width, height, shapes, sampledPowerPlants) => {
  return Plot.plot({
    width: width,
    height: height,
    projection: "albers-usa", // Set the projection
    marks: [
      Plot.geo(shapes.nation),
      Plot.geo(shapes.counties, { fill: "white", stroke: "var(--theme-foreground)", opacity: 0.1, }), // Add the state & county boundaries
      Plot.dot(sampledPowerPlants,
        { // Create dot marks (bubbles) using data from power_plants
          x: "longitude", // Provide longitude values
          y: "latitude", // Provide latitude values
          r: "Total_MW", // Update bubble radius based on this variable's value
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
          filter: d => d.Total_MW > MW_CONSTANT
        }
      ),
      Plot.text(sampledPowerPlants,
        { // Add text to the map using data from us_power_plants
          x: "longitude", // Place text horizontally at plant longitude
          y: "latitude", // Place text vertically at plant latitude
          text: "Plant_Name", // The text that appears is the value from the Plant_Name column,
          filter: (d) => d.Total_MW > MW_CONSTANT, // Only add text for plants with capacity exceeding define MW constant
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
}