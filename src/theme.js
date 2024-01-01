import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#D7B56D', // Change this to your desired primary color
        },
        secondary: {
            main: '#FF4081', // Change this to your desired secondary color
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif', // Change this to your desired font family
    }
});

export default theme;
