import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";


import React, { useState, useEffect } from 'react';
import * as dfd from "danfojs";
import * as tf from '@tensorflow/tfjs'
import { DecisionTreeRegressor, setBackend } from 'scikitjs'
import Plot from 'react-plotly.js';
import { Unit } from "../../charts/Labels/Units"

setBackend(tf)


function Forecast() {
  const [data, setData] = useState()
  const fetchData = async () => {
    const file = "./Automobile_data.csv";
    let df = await dfd.readCSV(file)
    let data = df.dropNa({ axis: 1 })
    let y = data.price
    let data_features = ['wheel-base', 'length', 'width', 'height', 'curb-weight', 'engine-size', 'compression-ratio', 'horsepower', 'peak-rpm', 'city-mpg', 'highway-mpg', 'city-L/100km']
    const x = data.loc({ columns: data_features })
    x.describe().print()

    let model = new DecisionTreeRegressor()

    model.fit(x, y)

    data = model.predict(x.values)
    console.log(x[data_features[0]])
    // console.log(model.predict([[0.811148486,0.890277778,  0.816053512, 2548, 130,9, 111,  5000, 21, 8.703703704, 11.19047619]]))

    let dataset = [];
    for (var i = 0; i < data.length; i++) {
      let columndata = x[data_features[i]]
      if (columndata != undefined) {
        let labelX = 'x' + (i + 1)
        let labelY = 'y' + (i + 1)
        let Name = data_features[i]
        if (Unit[data_features[i]]) {
          Name += " in " + Unit[data_features[i]]
        }
        dataset.push({
          x: columndata.values,
          y: y.values,
          xaxis: labelX,
          yaxis: labelY,
          type: 'scatter',
          mode: 'markers',
          name: Name
        })
      }
    }

    console.log(dataset)
    setData(dataset)
  }
  useEffect(() => {
    fetchData();
  }, [])

  const layout = {
    width: 1100,
    height: 700,
    grid: { rows: 3, columns: 4, pattern: 'independent' },
    title: 'Prediction of Price based on automobile features'
  };

  return (
    <DashboardLayout>
      <MDBox mt={2} mb={1}>
        <Grid>
          <MDBox mb={3}>
            <Card sx={{ height: "100%" }}>
              <MDBox>
                <Plot
                  data={data}
                  layout={layout}
                />
              </MDBox>
            </Card>
          </MDBox>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Forecast;