import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import { Line, Bar } from 'react-chartjs-2';
import VisualizePlots from "charts/getData/fetchData";

import React, { useState, useEffect } from 'react';
import * as dfd from "danfojs";
import Select from 'react-select';
import '../../style.css'

function PlayAround() {
  const [Xcolumns, setXColumns] = useState()
  const [Ycolumns, setYColumns] = useState()
  const [ChartType, setChartType] = useState()
  const [XAxis, setXAxis] = useState()
  const [YAxis, setYAxis] = useState()
  const [CalculateOperation, setCalculateOpeartion] = useState()
  const [file, setFile] = useState("./Automobile_data.csv")

  const heading = () => (
    <MDTypography color="dark" fontWeight="bold">
      Play-around with charts!!
    </MDTypography>
  );

  const loadingMessageUploadFile = () => (
    <MDTypography color="dark" fontWeight="bold">
      Please upload your file!
    </MDTypography>
  );

  const loadingMessageSelectCol = () => (
    <MDTypography color="dark" fontWeight="bold">
      Please select columns!
    </MDTypography>
  );

  const GetColumns = async () => {
    let df = await dfd.readCSV(file)
    let cols = df.columns

    let SelectXAxisColumns = [];
    let SelectYAxisColumns = [];

    for (var i = 0; i < cols.length; i++) {
      SelectXAxisColumns.push({
        label: cols[i],
        value: cols[i]
      })

      if (df[cols[i]].dtype === 'int32') {
        SelectYAxisColumns.push({
          label: cols[i],
          value: cols[i]
        })
      }
    }

    setXColumns(SelectXAxisColumns)
    setYColumns(SelectYAxisColumns)
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
  }

  const handleXAxisOnChange = (event) => {
    const value = event.value
    setXAxis(value)
  }

  const handleYAxisOnChange = (event) => {
    const value = event.value
    setYAxis(value)
  }

  const handleCalculateOnChange = (event) => {
    const value = event.value
    setCalculateOpeartion(value)
  }

  function handleFileUploadChange(event) {
    setFile(event.target.files[0])
    setXColumns(undefined)
    setYColumns(undefined)
    setXAxis(undefined)
    setYAxis(undefined)
  }

  return (
    <DashboardLayout>
      <MDBox mt={5} mb={2}>
        <Grid justifyContent='center'>
          {heading()}
          <form>
            <p>Choose your file: </p>
            <input type="file" onChange={handleFileUploadChange} />
            <MDButton onClick={GetColumns} size="small" color="dark">Upload</MDButton>
          </form>
          <div className="select">
            <Select className="selectOption"
              placeholder='Chart-Type'
              options={SelectChartType}
              onChange={handleChartTypeOnChange}
            />
            <Select className="selectOption"
              placeholder='X-Axis'
              options={Xcolumns}
              onChange={handleXAxisOnChange}
            />
            <Select className="selectOption"
              placeholder='Y-Axis'
              options={Ycolumns}
              onChange={handleYAxisOnChange}
            />
            <Select className="selectOption"
              placeholder='Operation'
              options={SelectCalculateOperation}
              onChange={handleCalculateOnChange}
            />
          </div>
          <MDBox mb={3}>
            <Card sx={{ height: "100%" }}>
              <MDBox padding="1rem" height="30rem" className="PlayAroundCanvas">
                {Xcolumns === undefined && Ycolumns === undefined ?
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '55vh' }}>{loadingMessageUploadFile()}</div> :
                  (XAxis !== undefined && YAxis !== undefined ?
                    <VisualizePlots file={file} ChartType={(ChartType) ? ChartType : Bar} columnX={XAxis} columnY={[YAxis]} Calculate={CalculateOperation ? CalculateOperation : ['sum']} />:
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '55vh' }}>{loadingMessageSelectCol()}</div>
                  )
                }
              </MDBox>
            </Card>
          </MDBox>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default PlayAround;