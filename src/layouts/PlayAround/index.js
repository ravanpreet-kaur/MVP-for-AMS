import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import { Line, Bar } from 'react-chartjs-2';
import VisualizePlots from "charts/getData/fetchData";

import React, { useState, useEffect } from 'react';
import * as dfd from "danfojs";
import Select from 'react-select';
import '../../style.css'

function PlayAround() {
  const [columns, setColumns] = useState()
  const [ChartType, setChartType] = useState()
  const [XAxis, setXAxis] = useState()
  const [YAxis, setYAxis] = useState()
  const [CalculateOperation, setCalculateOpeartion] = useState()

  const heading = () => (
    <MDTypography variant="body1" color="dark">
      Play-around with charts!!
    </MDTypography>
  );

  const GetColumns = async () => {
    const file = "./Automobile_data.csv";
    let df = await dfd.readCSV(file)
    let cols = df.columns

    let SelectAxisColumns = [];

    for (var i = 0; i < cols.length; i++) {
      SelectAxisColumns.push({
        label: cols[i],
        value: cols[i]
      })
    }

    setColumns(SelectAxisColumns)
  }
  useEffect(() => {
    GetColumns();
  }, [])

  const SelectChartType = [
    { label: "Bar", value: Bar },
    { label: "Line", value: Line },
  ]

  const SelectCalculateOperation = [
    { label: "mean", value: ['mean'] },
    { label: "sum", value: ['sum'] },
    { label: "count", value: ['count'] },
    { label: "series", value: 'series' },
  ]

  const handleChartTypeOnChange = (event) => {
    const value = event.value
    setChartType(value)
    console.log(value)
  }

  const handleXAxisOnChange = (event) => {
    const value = event.value
    setXAxis(value)
    console.log(value)
  }

  const handleYAxisOnChange = (event) => {
    const value = event.value
    setYAxis(value)
    console.log(value)
  }

  const handleCalculateOnChange = (event) => {
    const value = event.value
    setCalculateOpeartion(value)
    console.log(value)
  }

  return (
    <DashboardLayout>
      <MDBox mt={10} mb={3}>
        <Grid justifyContent='center'>
          {heading()}
          <div className="select">
            <Select className="selectOption"
              options={SelectChartType}
              onChange={handleChartTypeOnChange}
            />
            <Select className="selectOption"
              options={columns}
              onChange={handleXAxisOnChange}
            />
            <Select className="selectOption"
              options={columns}
              onChange={handleYAxisOnChange}
            />
            <Select className="selectOption"
              options={SelectCalculateOperation}
              onChange={handleCalculateOnChange}
            />
          </div>
          <MDBox mb={3}>
            <Card sx={{ height: "100%" }}>
              <MDBox padding="1rem" height="30rem" className="PlayAroundCanvas">
                <VisualizePlots ChartType={(ChartType) ? ChartType : Bar} columnX={XAxis ? XAxis : ''} columnY={YAxis ? [YAxis] : []} Calculate={CalculateOperation ? [CalculateOperation] : []} />
              </MDBox>
            </Card>
          </MDBox>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default PlayAround;