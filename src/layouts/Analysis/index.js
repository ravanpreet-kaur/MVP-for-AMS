import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import Card from "@mui/material/Card";
import { Bar, Pie, Doughnut, Line } from "react-chartjs-2";
import VisualizePlots from "charts/getData/fetchData";
import '../../style.css'

function Analysis() {
  return (
    <DashboardLayout>
      <MDBox py={3}>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>
                  <MDBox padding="1rem">
                    <VisualizePlots ChartType={Bar} columnX={"Client_Country"} columnY={["price"]} Calculate={["sum"]} title={"Total Sales per country"} />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>
                  <MDBox padding="1rem">
                    <VisualizePlots ChartType={Line} columnX={"fuel-system"} columnY={["price"]} Calculate={["mean"]} title={"Fuel system by price"} />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>
                  <MDBox padding="1rem">
                    <VisualizePlots ChartType={Bar} columnX={"fuel-system"} columnY={["highway-mpg"]} Calculate={["mean"]} title={"Average highway mpg by fuel-system"} />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>
                  <MDBox padding="1rem">
                    <VisualizePlots ChartType={Bar} columnX={"horsepower-binned"} columnY={["price"]} Calculate={["mean"]} title={"Horsepower-binned by price"} />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>
                  <MDBox padding="1rem">
                    <VisualizePlots ChartType={Line} radius={0} columnX={"engine-size"} columnY={["price"]} Calculate={"series"} title={"Engine-size by average price"} />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <Card sx={{ height: "100%" }}>
                  <MDBox padding="1rem">
                    <VisualizePlots ChartType={Bar} columnX={"drive-wheels"} columnY={["price"]} Calculate={["mean"]} title={"Wheel drive with price"} />
                  </MDBox>
                </Card>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={7}>
              <Card sx={{ height: "100%" }}>
                <MDBox padding="1rem">
                  <VisualizePlots ChartType={Line} columnX={"make"} columnY={["price"]} Calculate={["sum"]} title={"Total Sales per make"} />
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              <Card sx={{ height: "100%" }}>
                <MDBox padding="1rem" className="ChartCanvas">
                  <VisualizePlots ChartType={Bar} indexAxis={'y'} columnX={"Client_Country"} columnY={["diesel", "gas"]} Calculate={["sum", "sum"]} title={"Diesel and Gas Automobiles per country"} />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={6}>
              <Card sx={{ height: "100%" }}>
                <MDBox padding="1rem">
                  <VisualizePlots ChartType={Line} columnX={"make"} columnY={["diesel", "gas"]} Calculate={["sum", "sum"]} title={"Diesel and Gas Automobiles per make"} />
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Card sx={{ height: "100%" }}>
                <MDBox padding="1rem">
                  <VisualizePlots ChartType={Line} columnX={"peak-rpm"} columnY={["price"]} Calculate={["mean"]} title={"Average price by peak-rpm"} />
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
    </DashboardLayout>
  );
}

export default Analysis;