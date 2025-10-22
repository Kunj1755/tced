import { useState } from 'react';
import { Search } from 'lucide-react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

const layers = [
  'Distribution Transformers',
  'HT Lines',
  'LT Lines',
  'Substations',
  'Poles',
  'Meters',
  'Consumer Connections',
];

const attributes = {
  'Distribution Transformers': ['Transformer ID', 'Capacity', 'Voltage', 'Location'],
  'HT Lines': ['Line ID', 'Voltage Level', 'Length', 'Material'],
  'LT Lines': ['Line ID', 'Voltage Level', 'Length', 'Material'],
  Substations: ['Substation ID', 'Capacity', 'Type', 'Location'],
  Poles: ['Pole ID', 'Type', 'Height', 'Material'],
  Meters: ['Meter ID', 'Type', 'Consumer ID', 'Location'],
  'Consumer Connections': ['Consumer ID', 'Name', 'Category', 'Load'],
};

const predefinedValues = {
  'Transformer ID': ['DT-001', 'DT-002', 'DT-003', 'DT-004', 'DT-005'],
  Capacity: ['25 KVA', '63 KVA', '100 KVA', '250 KVA'],
  Voltage: ['11 KV', '33 KV', '132 KV'],
  'Line ID': ['HT-001', 'HT-002', 'LT-001', 'LT-002'],
  'Voltage Level': ['400V', '11KV', '33KV', '132KV'],
  'Substation ID': ['SS-001', 'SS-002', 'SS-003'],
  Type: ['Indoor', 'Outdoor', 'RCC', 'Steel'],
  'Pole ID': ['P-001', 'P-002', 'P-003'],
  'Meter ID': ['M-001', 'M-002', 'M-003'],
  'Consumer ID': ['C-001', 'C-002', 'C-003'],
  Category: ['Domestic', 'Commercial', 'Industrial'],
};

export default function SearchPanel({ onSearchResults }) {
  const [selectedLayer, setSelectedLayer] = useState('');
  const [selectedAttribute, setSelectedAttribute] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [customValue, setCustomValue] = useState('');

  const handleSearch = () => {
    const searchValue = customValue || selectedValue;
    console.log('Searching:', { selectedLayer, selectedAttribute, searchValue });

    // Mock search results
    const mockResults = [
      {
        id: 1,
        name: 'Result 1',
        attribute: selectedAttribute,
        value: searchValue,
        location: 'Zone A',
      },
      {
        id: 2,
        name: 'Result 2',
        attribute: selectedAttribute,
        value: searchValue,
        location: 'Zone B',
      },
      {
        id: 3,
        name: 'Result 3',
        attribute: selectedAttribute,
        value: searchValue,
        location: 'Zone C',
      },
    ];

    if (onSearchResults) {
      onSearchResults(mockResults);
    }
  };

  const handleLayerChange = value => {
    setSelectedLayer(value);
    setSelectedAttribute('');
    setSelectedValue('');
    setCustomValue('');
  };

  const handleAttributeChange = value => {
    setSelectedAttribute(value);
    setSelectedValue('');
    setCustomValue('');
  };

  return (
    <div className="flex flex-col h-full">
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Search for features by layer, attribute, and value
      </p>

      <div className="flex-1 overflow-y-auto space-y-4">
        <FormControl fullWidth size="small"  style={{marginBottom:'25px',marginTop:'10px'}}>
          <InputLabel id="search-layer-label">Layer</InputLabel>
          <Select
            labelId="search-layer-label"
            value={selectedLayer}
            onChange={e => handleLayerChange(e.target.value)}
            label="Layer">
            {layers.map(layer => (
              <MenuItem key={layer} value={layer}>
                {layer}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {selectedLayer && (
          <FormControl fullWidth size="small" style={{marginBottom:'25px'}}>
            <InputLabel id="search-attribute-label">Attribute</InputLabel>
            <Select
              labelId="search-attribute-label"
              value={selectedAttribute}
              onChange={e => handleAttributeChange(e.target.value)}
              label="Attribute">
              {attributes[selectedLayer]?.map(attr => (
                <MenuItem key={attr} value={attr}>
                  {attr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {selectedAttribute && (
          <>
            {predefinedValues[selectedAttribute] && (
              <FormControl fullWidth size="small" style={{marginBottom:'25px'}}>
                <InputLabel id="search-value-label">Value (Select)</InputLabel>
                <Select
                  labelId="search-value-label"
                  value={selectedValue}
                  onChange={e => {
                    setSelectedValue(e.target.value);
                    setCustomValue('');
                  }}
                  label="Value (Select)">
                  {predefinedValues[selectedAttribute]?.map(value => (
                    <MenuItem key={value} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <TextField
              label="Value (Enter Custom)"
              value={customValue}
              onChange={e => {
                setCustomValue(e.target.value);
                setSelectedValue('');
              }}
              placeholder="Or enter custom value"
              fullWidth
              size="small"
              InputLabelProps={{
                shrink: true,
              }}
              style={{marginBottom:'25px'}}
            />
          </>
        )}

        <Button
          onClick={handleSearch}
          disabled={!selectedLayer || !selectedAttribute || (!selectedValue && !customValue)}
          variant="contained"
          fullWidth
          sx={{
            bgcolor: '#475569',
            '&:hover': { bgcolor: '#1e293b' },
            mt: 1,
          }}
          startIcon={<Search className="h-4 w-4" />}>
          Search
        </Button>

        {selectedLayer && selectedAttribute && (selectedValue || customValue) && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-slate-700">
              Searching for <span className="font-semibold">{selectedAttribute}</span> ={' '}
              {customValue || selectedValue} in {selectedLayer}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
