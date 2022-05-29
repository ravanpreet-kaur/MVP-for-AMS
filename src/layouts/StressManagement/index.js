import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";

function StressManagement() {
  const alertContent = () => (
    <MDTypography variant="body2" color="white">
      Coming soon!!!!
      Stay Tuned for something amazing!
    </MDTypography>
  );


  return (
    <DashboardLayout>
      <MDBox mt={10} mb={3}>
        <Grid justifyContent="center">
          <MDAlert color="info" dismissible>
            {alertContent()}
          </MDAlert>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default StressManagement;