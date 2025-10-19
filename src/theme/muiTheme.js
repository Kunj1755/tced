import { createTheme } from '@mui/material/styles';

// TCED Professional Color Palette
export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#38a169', // TCED Success Green for active states
      dark: '#0e5a3f', // TCED Primary Green
      light: '#4ade80',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#64748b', // Professional slate
      dark: '#1e293b',
      light: '#94a3b8',
      contrastText: '#ffffff',
    },
    error: {
      main: '#c41e3a', // TCED Accent Red
      contrastText: '#ffffff',
    },
    warning: {
      main: '#eab839', // TCED Secondary Golden
      contrastText: '#1a1a1a',
    },
    info: {
      main: '#3b82f6',
      contrastText: '#ffffff',
    },
    success: {
      main: '#38a169',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontSize: 16,
    h1: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h2: {
      fontSize: '1.25rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.5,
    },
    button: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          padding: '0.5rem 1rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        sizeLarge: {
          padding: '0.75rem 1.5rem',
        },
        sizeSmall: {
          padding: '0.25rem 0.75rem',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.5rem',
            '& fieldset': {
              borderColor: '#e2e8f0',
            },
            '&:hover fieldset': {
              borderColor: '#cbd5e1',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#38a169',
              borderWidth: '2px',
            },
          },
          '& .MuiInputLabel-root': {
            backgroundColor: 'white',
            paddingLeft: '4px',
            paddingRight: '4px',
            '&.Mui-focused': {
              color: '#38a169',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
          '& fieldset': {
            borderColor: '#e2e8f0',
          },
          '&:hover fieldset': {
            borderColor: '#cbd5e1',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#38a169',
            borderWidth: '2px',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
          paddingLeft: '4px',
          paddingRight: '4px',
          '&.Mui-focused': {
            color: '#38a169',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#1e293b',
          fontSize: '0.875rem',
          borderRadius: '0.375rem',
          padding: '0.5rem 0.75rem',
        },
      },
    },
  },
});
