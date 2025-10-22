import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-300 via-slate-200 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-xl border border-slate-200 p-8 backdrop-blur-sm">
          {/* Logo and Company Name */}
          <div className="flex flex-col items-center mb-8">
            <img
              src={'/company_logo.png'}
              alt="Thrissur Corporation Electricity Department"
              className="h-32 w-auto mb-4 drop-shadow-md"
            />
            <div className="text-center">
              <h1 className="text-slate-800 text-lg sm:text-xl xl:whitespace-nowrap tracking-wide">
                Thrissur Corporation Electricity Department
              </h1>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <TextField
            style={{marginBottom:'25px'}}
              id="username"
              label="Username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              fullWidth
              variant="outlined"
            />

            <TextField
             style={{marginBottom:'25px'}}
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              fullWidth
              variant="outlined"
            />

            <div className="flex items-center justify-between">
              <FormControlLabel
                control={
                  <Checkbox checked={rememberMe} onChange={e => setRememberMe(e.target.checked)} />
                }
                label="Remember me"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: '#475569' } }}
              />

              <a
                href="#"
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors font-medium"
                onClick={e => e.preventDefault()}>
                Forgot password?
              </a>
            </div>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                bgcolor: '#1e293b',
                '&:hover': { bgcolor: '#0f172a' },
                height: '44px',
                textTransform: 'none',
                fontSize: '1rem',
              }}>
              Sign In
            </Button>

            <div className="text-center pt-4 border-t border-slate-200">
              <p className="text-sm text-slate-700">
                Don't have an account?{' '}
                <a
                  href="#"
                  className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
                  onClick={e => e.preventDefault()}>
                  Create new account
                </a>
              </p>
            </div>
          </form>
        </div>
        {/* 
				<p className="text-center text-slate-600 text-sm mt-6">
					© 2025 Thrissur Corporation Electricity Department
				</p> */}
      </div>
    </div>
  );
}
