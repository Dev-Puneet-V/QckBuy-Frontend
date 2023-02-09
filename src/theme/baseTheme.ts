import {createTheme} from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        heading: React.CSSProperties;
        subtitle3: React.CSSProperties;
        body3: React.CSSProperties;
        caption1: React.CSSProperties;
        caption2: React.CSSProperties;
    }
  
    interface TypographyVariantsOptions {
        heading?: React.CSSProperties;
        subtitle3?: React.CSSProperties;
        body3?: React.CSSProperties;
        caption1?: React.CSSProperties;
        caption2?: React.CSSProperties;
    }

    interface PaletteColor {
        darker?: string;
        border?: string;
        placeholder?: string;
    }

    interface SimplePaletteColorOptions {
        darker?: string;
        placeholder?: string;
        border?: string;
    }

    interface Palette {
        greyscale: Palette['primary'];
        textcolor: Palette['primary'];
        backgroundcolor: Palette['primary'];
    }

    interface PaletteOptions {
        greyscale?: PaletteOptions['primary'];
        textcolor?: PaletteOptions['primary'];
        backgroundcolor?: PaletteOptions['primary'];
    }
    
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        heading: true;
        subtitle3: true;
        body3: true;
        caption1: true;
        caption2: true;
    }
}
  


let baseTheme = createTheme({
    palette: {
        primary: {
            light: '#E2F2E9',
            main: '#2CE080',
            dark: '#22C870',
            darker: '#20BA68',
        },
        secondary: {
            light: '#DFE8F6',
            main: '#0365F2',
        },
        greyscale: {
            light: '#BAC9CF',
            dark: '#3A4649',
            main: '#6C787F',
            darker: '#042330',
        },
        textcolor: {
            light: '#6D787E',
            main: '#03314B',
            placeholder: '#747575',
            dark: '#042330',
        },
        backgroundcolor: {
            light: '#F7F7F7',
            main: '#F1F6F4'
        }  
    },
    typography: {
        fontFamily: "Cera Pro",
        heading: {
            fontSize: '36px',
            lineHeight: '45px',
            fontWeight: 700,
        },
        subtitle1: {
            fontSize: '18px',
            lineHeight: '32px',
            fontWeight: 800,
        },
        subtitle2: {
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: 700,
        },
        subtitle3: {
            fontSize: '18px',
            lineHeight: '24px',
            fontWeight: 400,
        },
        body1: {
            fontSize: '16px',
            lineHeight: '20px',
            fontWeight: 500,
        },
        body2: {
            fontSize: '16px',
            lineHeight: '24px',
            fontWeight: 400,
        },
        body3: {
            fontSize: '22px',
            lineHeight: '20px',
            fontWeight: 400,
        },
        caption1: {
            fontSize: '14px',
            lineHeight: '22px',
            fontWeight: 400,
        },
        caption2: {
            fontSize: '10px',
            lineHeight: '22px'
        },
    },
    spacing: [4, 8, 12, 16, 20, 32, 48]
});


export default baseTheme;