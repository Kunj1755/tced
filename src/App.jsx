import { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './components/LoginPage.jsx';
import MapPage from './components/MapPage.jsx';
import { muiTheme } from './theme/muiTheme';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ThemeProvider theme={muiTheme}>
      {/* <CssBaseline /> */}
      <div className="size-full">
        {isLoggedIn ? (
          <MapPage onLogout={() => setIsLoggedIn(false)} />
        ) : (
          <LoginPage onLogin={() => setIsLoggedIn(true)} />
        )}
      </div>
    </ThemeProvider>
  );
}
