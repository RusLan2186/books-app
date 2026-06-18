import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: "#f4f6f8",
      paper: "#ffffff",
    },
    primary: {
      main: '#1976d2',
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: "#0b111a", 
      paper: "#151f2b",   
    },
    primary: {
      main: '#3391ff',
    },
    divider: 'rgba(255, 255, 255, 0.08)',
    action: {
      hover: 'rgba(255, 255, 255, 0.04)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none', 
        },
      },
    },
  },
});