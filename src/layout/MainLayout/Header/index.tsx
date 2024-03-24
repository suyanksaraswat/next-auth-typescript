import * as React from "react";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { drawerWidth } from "../config";
import Profile from "./Profile";
import { Box, styled, useTheme } from "@mui/material";

interface Props {
  handleDrawerToggle: () => void;
}

export default function Header({ handleDrawerToggle }: Props) {
  const theme = useTheme();

  const appBar = {
    elevation: 0,
    sx: {
      borderBottom: `1px solid ${theme.palette.divider}`,
      width: { sm: `calc(100% - ${drawerWidth}px)` },
      ml: { sm: `${drawerWidth}px` },
    },
  };

  return (
    <AppBar position="fixed" color="inherit" {...appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ width: "100%" }}>
          <Typography variant="h6" component="div">
            Responsive drawer
          </Typography>
        </Box>

        <Box sx={{ width: "100%", ml: 1 }} />

        <Profile />
      </Toolbar>
    </AppBar>
  );
}
