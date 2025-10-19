import { useState } from 'react';
import { Printer, FileText, Image } from 'lucide-react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const paperSizes = ['A4', 'A3', 'Letter', 'Legal'];
const formats = [
  { id: 'pdf', name: 'PDF', icon: FileText },
  { id: 'png', name: 'PNG', icon: Image },
  { id: 'jpg', name: 'JPG', icon: Image },
];

export default function PrintPanel() {
  const [title, setTitle] = useState('');
  const [paperSize, setPaperSize] = useState('A4');
  const [format, setFormat] = useState('pdf');
  const [includeLegend, setIncludeLegend] = useState(true);
  const [includeScale, setIncludeScale] = useState(true);
  const [includeNorth, setIncludeNorth] = useState(true);

  const handlePrint = () => {
    console.log('Printing:', {
      title,
      paperSize,
      format,
      includeLegend,
      includeScale,
      includeNorth,
    });
  };

  return (
    <div className="flex flex-col h-full">
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Configure print settings and generate map output
      </p>

      <div className="flex-1 overflow-y-auto space-y-3">
        <TextField
          label="Map Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter map title"
          required
          fullWidth
          size="small"
          error={!title}
          helperText={!title ? 'Title is required' : ''}
        />

        <FormControl fullWidth size="small">
          <InputLabel id="paper-size-label">Paper Size</InputLabel>
          <Select
            labelId="paper-size-label"
            value={paperSize}
            onChange={(e) => setPaperSize(e.target.value)}
            label="Paper Size"
          >
            {paperSizes.map((size) => (
              <MenuItem key={size} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="format-label">Output Format</InputLabel>
          <Select
            labelId="format-label"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            label="Output Format"
          >
            {formats.map((fmt) => {
              const Icon = fmt.icon;
              return (
                <MenuItem key={fmt.id} value={fmt.id}>
                  <div className="flex items-center space-x-2">
                    <Icon className="h-4 w-4 text-slate-600" />
                    <span>{fmt.name}</span>
                  </div>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <div className="pt-2 border-t border-gray-200">
          <h4 className="text-sm text-slate-900 mb-2">Map Elements</h4>
          <div className="space-y-1">
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeLegend}
                  onChange={(e) => setIncludeLegend(e.target.checked)}
                  size="small"
                />
              }
              label="Include Legend"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: '#334155' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeScale}
                  onChange={(e) => setIncludeScale(e.target.checked)}
                  size="small"
                />
              }
              label="Include Scale Bar"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: '#334155' } }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={includeNorth}
                  onChange={(e) => setIncludeNorth(e.target.checked)}
                  size="small"
                />
              }
              label="Include North Arrow"
              sx={{ '& .MuiFormControlLabel-label': { fontSize: '0.875rem', color: '#334155' } }}
            />
          </div>
        </div>

        <Button
          onClick={handlePrint}
          disabled={!title.trim()}
          variant="contained"
          fullWidth
          sx={{ 
            bgcolor: '#475569', 
            '&:hover': { bgcolor: '#1e293b' },
            mt: 2,
          }}
          startIcon={<Printer className="h-4 w-4" />}
        >
          Generate Map
        </Button>
      </div>
    </div>
  );
}
