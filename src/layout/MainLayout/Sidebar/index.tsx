"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import { drawerWidth } from "../config";
import Navigation from "./Navigation";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";

interface Props {
  session: { user: CustomUser };
  mobileOpen: boolean;
  handleDrawerTransitionEnd: () => void;
  handleDrawerClose: () => void;
}

export default function Sidebar({
  session,
  mobileOpen,
  handleDrawerTransitionEnd,
  handleDrawerClose,
}: Props) {
  const drawer = (
    <div>
      <Toolbar />
      <Divider />

      <Navigation session={session} />
    </div>
  );

  const container =
    typeof window !== "undefined" ? () => window?.document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
