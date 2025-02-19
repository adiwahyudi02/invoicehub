"use client";
import { openSans } from "@/constants/fonts.constants";
import { alpha, createTheme } from "@mui/material/styles";

const theme = createTheme({
  cssVariables: {
    colorSchemeSelector: "class",
  },
  colorSchemes: {
    light: {
      palette: {
        mode: "light",
        background: {
          default: "#f1f5f9",
          paper: "#ffffff",
        },
        text: {
          primary: "#1c2434",
          secondary: "#4b5563",
        },
      },
    },
    dark: {
      palette: {
        mode: "dark",
        background: {
          default: "#1c2434",
          paper: "#273143",
        },
        text: {
          primary: "#ffffff",
          secondary: "#cbd5e1",
        },
      },
    },
  },
  palette: {
    background: {
      default: "#f1f5f9",
    },
    primary: {
      main: "#3c50e0",
    },
    success: {
      main: "#34d399",
    },
    warning: {
      main: "#ffa70b",
    },
  },
  typography: {
    fontFamily: openSans.style.fontFamily,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0rem 0.25rem 0.75rem rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: "1rem 1.5rem",
          borderBottom: "0.0625rem solid",
          borderBottomColor: "var(--mui-palette-divider)",
        },
        title: {
          fontSize: "1rem",
          fontWeight: "600",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: "1.25rem 1.5rem",
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: "0 1.5rem 1.5rem",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          paddingBlock: "0.85rem !important",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "& .MuiChip-label": { fontWeight: 500 },
        },
      },
      defaultProps: {
        color: "default",
      },
      variants: [
        {
          props: { color: "primary" },
          style: ({ theme }) => ({
            color: theme.palette.primary.main,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            border: "none",
          }),
        },
        {
          props: { color: "success" },
          style: ({ theme }) => ({
            color: theme.palette.success.main,
            backgroundColor: alpha(theme.palette.success.main, 0.1),
            border: "none",
          }),
        },
        {
          props: { color: "warning" },
          style: ({ theme }) => ({
            color: theme.palette.warning.main,
            backgroundColor: alpha(theme.palette.warning.main, 0.1),
            border: "none",
          }),
        },
        {
          props: { color: "error" },
          style: ({ theme }) => ({
            color: theme.palette.error.main,
            backgroundColor: alpha(theme.palette.error.main, 0.1),
            border: "none",
          }),
        },
      ],
    },
  },
});

export default theme;
