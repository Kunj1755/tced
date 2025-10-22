import { useState } from 'react';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const layerLegends = {
  '1': [
    { color: '#f59e0b', symbol: '⬤', label: 'Active' },
    { color: '#dc2626', symbol: '⬤', label: 'Inactive' }
  ],
  '2': [
    { color: '#dc2626', symbol: '━', label: '11 KV' },
    { color: '#9f1239', symbol: '━', label: '33 KV' }
  ],
  '3': [
    { color: '#3b82f6', symbol: '━', label: '400V' },
    { color: '#1d4ed8', symbol: '━', label: '230V' }
  ],
  '4': [
    { color: '#8b5cf6', symbol: '■', label: 'Primary' },
    { color: '#6d28d9', symbol: '■', label: 'Secondary' }
  ],
  '5': [
    { color: '#10b981', symbol: '▢', label: 'RCC' },
    { color: '#059669', symbol: '▢', label: 'Steel' }
  ],
  '24': [{ color: '#6b7280', symbol: '━', label: 'Road' }],
  '25': [{ color: '#9ca3af', symbol: '━', label: 'Railway' }],
  '26': [{ color: '#d1d5db', symbol: '■', label: 'Building' }],
  '27': [{ color: '#06b6d4', symbol: '~', label: 'Water Body' }],
};

export default function LayersPanel({ layers, onLayerToggle, onOpacityChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedLegends, setExpandedLegends] = useState({});

  const toggleLegend = (layerId) => {
    setExpandedLegends(prev => ({
      ...prev,
      [layerId]: !prev[layerId]
    }));
  };

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
        {filteredLayers.map((layer) => {
          const hasLegend = layerLegends[layer.id];
          const isLegendExpanded = expandedLegends[layer.id];
          
          return (
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
                  
                  {/* Legend Toggle Button */}
                  {hasLegend && (
                    <IconButton
                      onClick={() => toggleLegend(layer.id)}
                      size="small"
                      sx={{
                        p: 0.5,
                        color: '#64748b',
                        '&:hover': {
                          color: '#1e293b',
                        },
                      }}
                      aria-label={isLegendExpanded ? 'Collapse legend' : 'Expand legend'}
                    >
                      {isLegendExpanded ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </IconButton>
                  )}
                </div>

                {/* Legend Items - Collapsible */}
                {hasLegend && (
                  <Collapse in={isLegendExpanded} timeout="auto" unmountOnExit>
                    <div className="flex flex-wrap gap-2 mb-2 p-2 bg-slate-50/50 rounded border border-slate-100">
                      {layerLegends[layer.id].map((legend, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs">
                          <span className="text-base" style={{ color: legend.color }}>
                            {legend.symbol}
                          </span>
                          <span className="text-slate-600">{legend.label}</span>
                        </div>
                      ))}
                    </div>
                  </Collapse>
                )}

                {/* Opacity Slider - Compact, only when visible */}
                {layer.visible && (
                  <div className="flex items-center gap-2 mt-2">
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
          );
        })}
      </div>
    </div>
  );
}
