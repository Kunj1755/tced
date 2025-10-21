import { X } from 'lucide-react';
import IconButton from '@mui/material/IconButton';

export default function SlidingPanel({ isOpen, title, onClose, children }) {
  return (
    <div
      className={`absolute top-0 bottom-0 left-16 bg-white shadow-2xl z-40 overflow-hidden border-r border-gray-200 transition-all duration-300 ease-out ${
        isOpen ? 'w-80' : 'w-0'
      }`}
      style={{ willChange: 'width' }}>
      <div className="h-full w-80 flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-slate-50 flex-shrink-0">
          <h2 className="text-slate-900">{title}</h2>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: '#64748b',
              '&:hover': {
                color: '#0f172a',
                bgcolor: '#e2e8f0',
              },
            }}
            aria-label="Close panel">
            <X className="h-4 w-4" />
          </IconButton>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-white">{children}</div>
      </div>
    </div>
  );
}
