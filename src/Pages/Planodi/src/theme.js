import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import yellow from '@material-ui/core/colors/yellow';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: amber[500],
      main: '#8c50ff',
      dark: amber[800],
      contrastText: '#fff',
    },
    secondary: {
      light: yellow[400],
      main: '#8c50ff',
      dark: yellow[600],
      contrastText: '#fff',
    },
  },
});

export default theme;
