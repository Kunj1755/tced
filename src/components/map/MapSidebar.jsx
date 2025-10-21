import { Zap, Layers, Map, Search, Edit, PenTool, Download, Printer } from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

const tools = [
  { id: 'feeders', icon: Zap, label: 'Feeders' },
  { id: 'layers', icon: Layers, label: 'Layers' },
  { id: 'basemaps', icon: Map, label: 'Basemaps' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'edit', icon: Edit, label: 'Edit' },
  { id: 'draw', icon: PenTool, label: 'Draw' },
  { id: 'export', icon: Download, label: 'Export' },
  { id: 'print', icon: Printer, label: 'Print' },
];

export default function MapSidebar({ activeTool, onToolClick }) {
  return (
    <div className="bg-[#1e293b] text-slate-200 w-16 flex flex-col shadow-xl border-r border-slate-700">
      <div className="flex flex-col items-center py-4 space-y-3">
        {tools.map(tool => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;

          return (
            <Tooltip key={tool.id} title={tool.label} placement="right" arrow>
              <IconButton
                onClick={() => onToolClick(tool.id)}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '8px',
                  backgroundColor: isActive ? '#38a169' : 'transparent',
                  color: isActive ? 'white' : '#cbd5e1',
                  boxShadow: isActive ? '0 4px 6px -1px rgba(56, 161, 105, 0.3)' : 'none',
                  border: isActive ? '2px solid #38a169' : '2px solid transparent',
                  '&:hover': {
                    backgroundColor: isActive ? '#38a169' : '#475569',
                    color: 'white',
                    border: isActive ? '2px solid #38a169' : '2px solid #475569',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
                aria-label={tool.label}>
                <Icon className="h-5 w-5" />
              </IconButton>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
