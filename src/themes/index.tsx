"use client";

import React, { useMemo } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { createTheme, ThemeOptions } from "@mui/material/styles";

// Project imports
import Palette from "./palette";
import Typography from "./typography";
import CustomShadows from "./shadows";
import componentsOverride from "./overrides";
import { CssBaseline } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function ThemeCustomization({ children }: Props) {
  const theme = Palette("light");

  const themeTypography = Typography(`'Public Sans', sans-serif`);
  const themeCustomShadows = useMemo(() => CustomShadows(theme), [theme]);

  const themeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024,
          lg: 1266,
          xl: 1536,
        },
      },
      direction: "ltr",
      mixins: {
        toolbar: {
          minHeight: 60,
          paddingTop: 8,
          paddingBottom: 8,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: themeTypography,
    }),
    [theme, themeTypography, themeCustomShadows]
  );

  const themes = createTheme(themeOptions as ThemeOptions);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
