import React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import ThemeCustomization from "@/themes";

interface Props {
  children?: React.ReactNode;
}

export default function MuiThemeProvider({ children }: Props) {
  return (
    <AppRouterCacheProvider>
      <ThemeCustomization>{children}</ThemeCustomization>
    </AppRouterCacheProvider>
  );
}
