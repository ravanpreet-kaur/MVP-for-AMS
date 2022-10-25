import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import Sidenav from "examples/Sidenav";
import theme from "assets/theme";
import routes from "routes";
import { useMaterialUIController } from "context";

export default function App() {
  const [controller] = useMaterialUIController();
  const { layout } = controller;

  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            brandName="Automobile Management"
            routes={routes}
          />
        </>
      )}
      <Routes>
        {getRoutes(routes)}
        <Route path="*" element={<Navigate to="/Analysis" />} />
      </Routes>
    </ThemeProvider>
  );
}
