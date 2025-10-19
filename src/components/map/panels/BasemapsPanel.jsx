import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Check } from 'lucide-react';

const basemaps = [
  { id: 'blank', name: 'Blank', description: 'No basemap' },
  { id: 'osm', name: 'OpenStreetMap', description: 'Community-driven map' },
  { id: 'satellite', name: 'Satellite', description: 'Satellite imagery' },
  { id: 'terrain', name: 'Terrain', description: 'Topographic map' },
  { id: 'streets', name: 'Streets', description: 'Detailed street map' },
  { id: 'light', name: 'Light Gray', description: 'Minimal basemap' },
  { id: 'dark', name: 'Dark Gray', description: 'Dark theme basemap' },
];

const basemapColors = {
  blank: '#ffffff',
  osm: '#f4f4f4',
  satellite: '#1a4d2e',
  terrain: '#8b7355',
  streets: '#e8e8e8',
  light: '#f0f0f0',
  dark: '#2d2d2d',
};

export default function BasemapsPanel({ selectedBasemap, onSelectBasemap }) {
  return (
    <div className="flex flex-col h-full">
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Choose a basemap for your map view
      </p>

      <RadioGroup value={selectedBasemap} onChange={(e) => onSelectBasemap(e.target.value)}>
        <div className="flex-1 overflow-y-auto space-y-3">
          {basemaps.map((basemap) => (
            <div
              key={basemap.id}
              className={`relative border-2 rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                selectedBasemap === basemap.id
                  ? 'border-[#38a169] bg-emerald-50/50 shadow-md'
                  : 'border-gray-200 hover:border-slate-300 bg-white hover:shadow-md'
              }`}
              onClick={() => onSelectBasemap(basemap.id)}
            >
              <div className="flex items-start gap-3">
                <FormControlLabel
                  value={basemap.id}
                  control={<Radio size="small" />}
                  label={
                    <div className="flex-1">
                      <div className="text-sm text-slate-900">{basemap.name}</div>
                      <p className="text-xs text-slate-600 mt-1">{basemap.description}</p>
                    </div>
                  }
                  sx={{ flex: 1, margin: 0, alignItems: 'flex-start' }}
                />
                {selectedBasemap === basemap.id && (
                  <Check className="h-5 w-5 text-[#38a169] flex-shrink-0 mt-0.5" />
                )}
              </div>

              {/* Preview thumbnail */}
              <div className="mt-3 h-20 rounded border border-gray-200 overflow-hidden shadow-sm">
                <div
                  className="w-full h-full transition-all duration-200"
                  style={{
                    backgroundColor: basemapColors[basemap.id],
                    backgroundImage: basemap.id === 'satellite' 
                      ? 'linear-gradient(45deg, #1a4d2e 25%, #2d5a3a 25%, #2d5a3a 50%, #1a4d2e 50%, #1a4d2e 75%, #2d5a3a 75%, #2d5a3a)'
                      : basemap.id === 'terrain'
                      ? 'linear-gradient(180deg, #a0826d 0%, #8b7355 50%, #6b5d4f 100%)'
                      : basemap.id === 'dark'
                      ? 'linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)'
                      : 'none',
                    backgroundSize: basemap.id === 'satellite' ? '20px 20px' : 'cover',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
