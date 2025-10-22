import { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';

export default function MapHeader({ onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  return (
    <header
      className="h-16 shadow-lg flex items-center justify-between px-3 sm:px-4 md:px-6 sticky top-0 z-50 relative"
      style={{
        backgroundImage: "url('/app_header_background.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#1e293b', // fallback color while image loads
      }}>
      {/* Hidden image to encourage browser preload in SPA routes (alternatively place preload in index.html) */}
      <img src="/app_header_background.png" alt="" className="hidden" aria-hidden />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30" />

      <div className="flex items-center gap-2 sm:gap-3 md:gap-4 relative z-10 flex-1 min-w-0">
        <img
          src={'/company_logo.png'}
          alt="Thrissur Corporation Electricity Department"
          className="h-8 sm:h-10 md:h-11 w-auto drop-shadow-lg flex-shrink-0"
        />
        <div className="border-l border-white/40 h-6 sm:h-8 md:h-10" />
        <div className="flex-1 min-w-0">
          <h1
            className="text-white text-xs sm:text-sm md:text-base lg:text-base tracking-wide drop-shadow-lg truncate"
            style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}>
            Thrissur Corporation Electricity Department
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 relative z-10 flex-shrink-0">
        <Button
          onClick={handleClick}
          sx={{
            color: 'white',
            '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.2)' },
            px: { xs: 1, sm: 1.5, md: 2 },
            minWidth: 'auto',
            height: { xs: '36px', sm: '40px' },
            textTransform: 'none',
          }}
          aria-label="User menu">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-lg">
              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
            <div className="text-left hidden md:block">
              <p
                className="text-sm leading-tight drop-shadow-lg"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                test user
              </p>
              <p
                className="text-xs text-white/90 leading-tight drop-shadow-lg"
                style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                Administrator
              </p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </div>
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          PaperProps={{
            sx: {
              width: 256,
              mt: 1,
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              borderRadius: '8px',
            },
          }}>
          <div className="px-4 py-3 bg-slate-50 border-b border-gray-200">
            <p className="text-base text-slate-900">test user</p>
            <p className="text-xs text-slate-600 mt-0.5">Administrator</p>
            <p className="text-xs text-slate-500 mt-1">admin@thrissur.gov.in</p>
          </div>
          <MenuItem onClick={handleClose} sx={{ px: 2, py: 1.25 }}>
            <User className="mr-3 h-4 w-4 text-slate-600" />
            <span className="text-slate-800">View Profile</span>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ px: 2, py: 1.25, color: '#dc2626' }}>
            <LogOut className="mr-3 h-4 w-4" />
            <span>Logout</span>
          </MenuItem>
        </Menu>
      </div>
    </header>
  );
}
