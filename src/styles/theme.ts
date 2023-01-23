import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        background: {
          default: "#FAFAFA",
        },
        primary: {
            light: '#235EE7',
            main: '#17223E',
        },
        secondary: {
            main: '#D32811'
        }
    },
    typography: {
      fontFamily: 'Inter', 
      fontWeightRegular: 400,
      fontWeightMedium: 600,
      fontWeightBold: 800,
      fontSize: 16,
  
      title: {
        fontSize: "2.25rem",
        lineHeight: "125%",
        fontWeight: 700,
      },
  
      subtitle: {
        fontSize: "1.5rem",
        lineHeight: "125%",
        fontWeight: 600,
      },
  
      description: {
        fontSize: ".875rem",
        lineHeight: "125%",
        fontWeight: 600,
      },
    }
});

declare module '@mui/material/styles' {
  interface Theme {
    pallete: {
      background: {
        default: string,
      },
      primary: {
        light: string,
        main: string,
      },
      secondary: {
        main: string
      }
    };
  }

  interface Palette {
    primary: Palette['primary'];
    secondary: Palette['secondary'];
  }

  interface PaletteOptions {
    primary?: PaletteOptions['primary'];
    secondary?: PaletteOptions['secondary'];
  }

  interface PaletteColor {
    default: string;
    light: string;
    main: string;
  }
  interface TypographyVariants {
    title: React.CSSProperties;
    subtitle: React.CSSProperties;
    description: React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
    subtitle?: React.CSSProperties;
    description?: React.CSSProperties;
    
  }

}