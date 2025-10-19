import { useState } from 'react';
import { Download, FileJson, FileSpreadsheet, Map, Database } from 'lucide-react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';

const layers = [
  'Distribution Transformers',
  'HT Lines',
  'LT Lines',
  'Substations',
  'Poles',
  'Meters',
  'Consumer Connections',
];

const exportFormats = [
  { id: 'geojson', name: 'GeoJSON', icon: FileJson, extension: '.geojson' },
  { id: 'csv', name: 'CSV', icon: FileSpreadsheet, extension: '.csv' },
  { id: 'shp', name: 'Shapefile', icon: Map, extension: '.zip' },
  { id: 'kml', name: 'KML', icon: Database, extension: '.kml' },
];

export default function ExportPanel() {
  const [selectedLayers, setSelectedLayers] = useState([]);
  const [exportFormat, setExportFormat] = useState('geojson');

  const handleLayerToggle = (layer) => {
    setSelectedLayers((prev) =>
      prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]
    );
  };

  const handleExport = () => {
    console.log('Exporting:', { selectedLayers, exportFormat });
  };

  return (
    <div className="flex flex-col h-full">
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Select layers and format to export data
      </p>

      <div className="flex-1 overflow-y-auto space-y-3">
        <h4 className="text-sm text-slate-900">Select Layers</h4>
        <FormGroup>
          {layers.map((layer) => (
            <FormControlLabel
              key={layer}
              control={
                <Checkbox
                  checked={selectedLayers.includes(layer)}
                  onChange={() => handleLayerToggle(layer)}
                  size="small"
                />
              }
              label={layer}
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: '#334155' } }}
            />
          ))}
        </FormGroup>
      </div>

      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="export-format-label">Export Format</InputLabel>
        <Select
          labelId="export-format-label"
          value={exportFormat}
          onChange={(e) => setExportFormat(e.target.value)}
          label="Export Format"
        >
          {exportFormats.map((format) => {
            const Icon = format.icon;
            return (
              <MenuItem key={format.id} value={format.id}>
                <div className="flex items-center space-x-2">
                  <Icon className="h-4 w-4 text-slate-600" />
                  <span>{format.name}</span>
                  <span className="text-xs text-slate-500">({format.extension})</span>
                </div>
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <Button
        onClick={handleExport}
        disabled={selectedLayers.length === 0}
        variant="contained"
        fullWidth
        sx={{ bgcolor: '#475569', '&:hover': { bgcolor: '#1e293b' } }}
        startIcon={<Download className="h-4 w-4" />}
      >
        Export Data
      </Button>

      {selectedLayers.length > 0 && (
        <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg mt-3">
          <p className="text-xs text-slate-700">
            Exporting {selectedLayers.length} layer{selectedLayers.length !== 1 ? 's' : ''} as{' '}
            {exportFormats.find((f) => f.id === exportFormat)?.name}
          </p>
        </div>
      )}
    </div>
  );
}
