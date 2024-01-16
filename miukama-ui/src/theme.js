'use client';

import { createTheme } from '@mui/material/styles';
import config from '../config.json';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: config.primary,
    },
    secondary: {
      main: config.secondary,
      contrastText: '#1A1A1A',
    },
    warning: {
      main: config.warning,
    },
    success: {
      main: '#014F04',
      dark: '#093629',
      contrastText: '#1A1A1A',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        sizeSmall: {
          padding: '14px 28px',
          fontSize: '14px',
          lineHeight: '20px',
        },
        sizeLarge: {
          padding: '22px 28px',
          fontSize: '18px',
          lineHeight: '27px',
        },
        sizeMedium: {
          padding: '16px 41px',
          lineHeight: '24px',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: '0 !important',
        },
        input: {
          padding: '23px 23px 23px !important',
          lineHeight: '27px',
          fontSize: '18px',
          '&::placeholder': {
            color: '#fff',
          },
        },
        inputSizeSmall: {
          padding: '14px 28px !important',
          lineHeight: '17px',
          fontSize: '14px',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        size: 'small',
        fullWidth: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          padding: '0px 0px',
          backgroundColor: 'rgba(0,0,0,.6)',
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {
          padding: '0px 0px',
          borderRadius: '0px',
          marginRight: '5px',
        },
      },
    },

    MuiTypography: {
      h2: {
        '@media (max-width:600px)': {
          fontSize: '1.5rem',
        },
        // [theme.breakpoints.up('md')]: {
        //   fontSize: '2.4rem',
        // },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        endAdornment: {
          position: 'absolute',
          top: 'calc(50% - 25px)',
        },
      },
    },
  },
});

export default theme;
