"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "./config";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

interface Props {
  session: { user: CustomUser };
  children: React.ReactNode;
}

export default async function MainLayout({ session, children }: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Header handleDrawerToggle={handleDrawerToggle} session={session} />

      <Sidebar
        session={session}
        mobileOpen={mobileOpen}
        handleDrawerClose={handleDrawerClose}
        handleDrawerTransitionEnd={handleDrawerTransitionEnd}
      />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Box>{children}</Box>
      </Box>
    </Box>
  );
}
