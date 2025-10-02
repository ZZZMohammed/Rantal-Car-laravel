// MiniDrawer.jsx
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { lightTheme, darkTheme } from "../../theme"; // 👈 import themes
import TopBar from "./TopBar";
import SideBar from "./SideBar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState("light"); // 👈 toggle state

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  return (
    <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <TopBar
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          mode={mode}
          setMode={setMode} // 👈 pass toggle function
        />
        <SideBar open={open} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <h2>Dashboard Content</h2>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
