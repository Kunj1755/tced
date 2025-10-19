import { useState } from 'react';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from 'lucide-react';

const layerLegends = {
  '1': { color: '#f59e0b', symbol: '⬤' },
  '2': { color: '#dc2626', symbol: '━' },
  '3': { color: '#3b82f6', symbol: '━' },
  '4': { color: '#8b5cf6', symbol: '■' },
  '5': { color: '#10b981', symbol: '▢' },
  '24': { color: '#6b7280', symbol: '━' },
  '25': { color: '#9ca3af', symbol: '━' },
  '26': { color: '#d1d5db', symbol: '■' },
  '27': { color: '#06b6d4', symbol: '~' },
};

export default function LayersPanel({ layers, onLayerToggle, onOpacityChange }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLayers = layers.filter(layer =>
    layer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Toggle layers and adjust their opacity
      </p>

      {/* Search */}
      <TextField
        placeholder="Search layers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search className="h-4 w-4 text-slate-400" />
            </InputAdornment>
          ),
        }}
      />

      {/* Layers List - Compact */}
      <div className="flex-1 overflow-y-auto space-y-1.5">
        {filteredLayers.map((layer) => (
          <div key={layer.id} className="border border-gray-200 rounded-lg bg-white hover:border-gray-300 transition-all">
            {/* Layer Row */}
            <div className="p-2">
              {/* Layer Name and Toggle */}
              <div className="flex items-center justify-between mb-1">
                <FormControlLabel
                  control={
                    <Switch
                      checked={layer.visible}
                      onChange={() => onLayerToggle(layer.id)}
                      size="small"
                    />
                  }
                  label={layer.name}
                  sx={{
                    flex: 1,
                    margin: 0,
                    '& .MuiFormControlLabel-label': {
                      fontSize: '0.875rem',
                      color: '#334155',
                      flex: 1,
                    },
                  }}
                />
                
                {/* Legend Symbol */}
                {layerLegends[layer.id] && (
                  <span className="text-base ml-2" style={{ color: layerLegends[layer.id].color }}>
                    {layerLegends[layer.id].symbol}
                  </span>
                )}
              </div>

              {/* Opacity Slider - Compact, only when visible */}
              {layer.visible && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-slate-500 whitespace-nowrap">Opacity:</span>
                  <Slider
                    value={layer.opacity}
                    onChange={(e, value) => onOpacityChange(layer.id, value)}
                    min={0}
                    max={100}
                    step={5}
                    size="small"
                    sx={{ 
                      flex: 1,
                      color: '#38a169',
                      height: 4,
                      '& .MuiSlider-thumb': {
                        width: 12,
                        height: 12,
                      },
                    }}
                  />
                  <span className="text-xs text-slate-900 font-medium w-8 text-right">{layer.opacity}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
