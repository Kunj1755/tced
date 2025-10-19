import { useState } from 'react';
import { Save, X, MousePointer2 } from 'lucide-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';

const equipmentTypes = [
  { value: 'transformer', label: 'Distribution Transformer' },
  { value: 'pole', label: 'Pole' },
  { value: 'substation', label: 'Substation' },
  { value: 'circuit_breaker', label: 'Circuit Breaker' },
  { value: 'meter', label: 'Meter' },
  { value: 'street_light', label: 'Street Light' },
  { value: 'cable', label: 'Cable' },
  { value: 'isolator', label: 'Isolator' },
];

export default function EditPanel({ selectedFeature, onFeatureSelect }) {
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('');
  const [enableSnapping, setEnableSnapping] = useState(true);
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [attributes, setAttributes] = useState({
    featureId: '',
    name: '',
    type: '',
    capacity: '',
    voltage: '',
    location: '',
    status: '',
    notes: '',
  });

  const handleEquipmentTypeChange = (event) => {
    setSelectedEquipmentType(event.target.value);
  };

  const handleStartSelect = () => {
    if (!selectedEquipmentType) {
      alert('Please select an equipment type first');
      return;
    }
    
    setIsSelectMode(true);
    if (onFeatureSelect) {
      onFeatureSelect(true);
    }
    
    // Simulate feature selection after a delay
    setTimeout(() => {
      handleFeatureSelected({
        id: 'DT-001',
        name: 'Main Transformer',
        type: selectedEquipmentType,
        capacity: '100 KVA',
        voltage: '11 KV',
        location: 'West Zone, Sector A',
        status: 'Active',
        notes: '',
      });
    }, 2000);
  };

  const handleFeatureSelected = (feature) => {
    setAttributes({
      featureId: feature.id || 'DT-001',
      name: feature.name || 'Main Transformer',
      type: feature.type || selectedEquipmentType,
      capacity: feature.capacity || '100 KVA',
      voltage: feature.voltage || '11 KV',
      location: feature.location || 'West Zone, Sector A',
      status: feature.status || 'Active',
      notes: feature.notes || '',
    });
    setIsSelectMode(false);
  };

  const handleSave = () => {
    console.log('Saving edits:', attributes);
    // Save logic here
  };

  const handleCancel = () => {
    setAttributes({
      featureId: '',
      name: '',
      type: '',
      capacity: '',
      voltage: '',
      location: '',
      status: '',
      notes: '',
    });
    setSelectedEquipmentType('');
    setIsSelectMode(false);
  };

  return (
    <div className="flex flex-col h-full">
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Select equipment type, then click on a feature to edit its attributes
      </p>

      {/* Step 1: Select Equipment Type */}
      <FormControl fullWidth size="small" sx={{ mb: 2 }}>
        <InputLabel id="equipment-type-label">Equipment Type</InputLabel>
        <Select
          labelId="equipment-type-label"
          id="equipment-type-select"
          value={selectedEquipmentType}
          label="Equipment Type"
          onChange={handleEquipmentTypeChange}
          disabled={!!attributes.featureId}
        >
          {equipmentTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Snapping Option */}
      {selectedEquipmentType && !attributes.featureId && (
        <FormControlLabel
          control={
            <Checkbox
              checked={enableSnapping}
              onChange={(e) => setEnableSnapping(e.target.checked)}
              size="small"
            />
          }
          label="Enable snapping"
          sx={{ 
            mb: 2,
            '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: '#334155' } 
          }}
        />
      )}

      {!isSelectMode && !attributes.featureId && selectedEquipmentType && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {enableSnapping ? 'Snapping enabled. ' : ''}Click the button below to select a {equipmentTypes.find(t => t.value === selectedEquipmentType)?.label} on the map.
        </Alert>
      )}

      {isSelectMode && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <strong>Selection Mode Active:</strong> Click on a {equipmentTypes.find(t => t.value === selectedEquipmentType)?.label} on the map
        </Alert>
      )}

      <div className="flex-1 overflow-y-auto space-y-2">
        {/* Step 2: Select Feature Button */}
        {!attributes.featureId && selectedEquipmentType && (
          <Button
            onClick={handleStartSelect}
            variant="contained"
            fullWidth
            startIcon={<MousePointer2 className="h-4 w-4" />}
            sx={{
              bgcolor: isSelectMode ? '#38a169' : '#475569',
              '&:hover': { bgcolor: isSelectMode ? '#2f855a' : '#1e293b' },
            }}
          >
            {isSelectMode ? 'Selecting... Click on Map' : 'Select Feature for Editing'}
          </Button>
        )}

        {/* Step 3: Edit Attributes */}
        {attributes.featureId && (
          <>
            <TextField
              label="Feature ID"
              value={attributes.featureId}
              disabled
              fullWidth
              size="small"
            />

            <TextField
              label="Name"
              value={attributes.name}
              onChange={(e) => setAttributes({ ...attributes, name: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Type"
              value={attributes.type}
              disabled
              fullWidth
              size="small"
            />

            <TextField
              label="Capacity"
              value={attributes.capacity}
              onChange={(e) => setAttributes({ ...attributes, capacity: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Voltage"
              value={attributes.voltage}
              onChange={(e) => setAttributes({ ...attributes, voltage: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Location"
              value={attributes.location}
              onChange={(e) => setAttributes({ ...attributes, location: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Status"
              value={attributes.status}
              onChange={(e) => setAttributes({ ...attributes, status: e.target.value })}
              fullWidth
              size="small"
            />

            <TextField
              label="Notes"
              value={attributes.notes}
              onChange={(e) => setAttributes({ ...attributes, notes: e.target.value })}
              fullWidth
              multiline
              rows={3}
              size="small"
            />

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSave}
                variant="contained"
                fullWidth
                sx={{ bgcolor: '#38a169', '&:hover': { bgcolor: '#2f855a' } }}
                startIcon={<Save className="h-4 w-4" />}
              >
                Save Changes
              </Button>
              <Button
                onClick={handleCancel}
                variant="outlined"
                fullWidth
                sx={{ color: '#64748b', borderColor: '#cbd5e1' }}
                startIcon={<X className="h-4 w-4" />}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
