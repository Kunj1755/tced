import { useState } from 'react';
import { Circle, Square, Minus, MousePointer2, Save, Trash2 } from 'lucide-react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';

const drawTools = [
  { id: 'select', icon: MousePointer2, label: 'Select' },
  { id: 'point', icon: Circle, label: 'Point' },
  { id: 'line', icon: Minus, label: 'Line' },
  { id: 'polygon', icon: Square, label: 'Polygon' },
];

export default function DrawPanel({ activeDrawTool, onDrawToolChange }) {
  const [drawnFeatures, setDrawnFeatures] = useState([]);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [comment, setComment] = useState('');

  const handleToolClick = toolId => {
    onDrawToolChange(toolId);
    setSelectedFeature(null);
    setComment('');
  };

  const handleSaveDrawing = () => {
    if (!comment.trim()) {
      alert('Please enter a comment before saving');
      return;
    }

    const newFeature = {
      id: Date.now(),
      type: activeDrawTool,
      comment: comment,
      creator: 'test user',
      createdAt: new Date().toISOString(),
    };

    setDrawnFeatures([...drawnFeatures, newFeature]);
    setComment('');
    onDrawToolChange(null);
    console.log('Saving drawing to GeoServer:', newFeature);
  };

  const handleSelectFeature = feature => {
    setSelectedFeature(feature);
    setComment(feature.comment);
    onDrawToolChange('select');
  };

  const handleDeleteFeature = () => {
    if (selectedFeature) {
      setDrawnFeatures(drawnFeatures.filter(f => f.id !== selectedFeature.id));
      setSelectedFeature(null);
      setComment('');
      console.log('Deleting redlining from GeoServer:', selectedFeature.id);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete all drawings?')) {
      setDrawnFeatures([]);
      setSelectedFeature(null);
      setComment('');
      onDrawToolChange(null);
      console.log('Clearing all redlining from GeoServer');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Draw shapes and annotations on the map
      </p>

      {/* Drawing Tools - Compact Row */}
      <div className="flex items-center gap-1.5 mb-3">
        {drawTools.map(tool => {
          const Icon = tool.icon;
          const isActive = activeDrawTool === tool.id;

          return (
            <div key={tool.id} className="flex flex-col items-center flex-1">
              <IconButton
                onClick={() => handleToolClick(tool.id)}
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: '8px',
                  backgroundColor: isActive ? '#38a169' : 'transparent',
                  color: isActive ? 'white' : '#64748b',
                  border: isActive ? '2px solid rgba(56, 161, 105, 0.4)' : '1px solid #e2e8f0',
                  '&:hover': {
                    backgroundColor: isActive ? '#2f855a' : '#f1f5f9',
                    color: isActive ? 'white' : '#1e293b',
                  },
                }}
                aria-label={tool.label}>
                <Icon className="h-5 w-5" />
              </IconButton>
              <span className="text-xs text-slate-600 mt-0.5">{tool.label}</span>
            </div>
          );
        })}
      </div>

      {/* Clear All Button */}
      {drawnFeatures.length > 0 && !selectedFeature && (
        <Button
          onClick={handleClearAll}
          variant="outlined"
          fullWidth
          size="small"
          color="error"
          startIcon={<Trash2 className="h-4 w-4" />}
          sx={{ mb: 2 }}>
          Clear All Drawings
        </Button>
      )}

      <Divider sx={{ my: 1 }} />

      {/* Comment and Save Section */}
      {activeDrawTool && activeDrawTool !== 'select' && (
        <div className="space-y-2 mb-2">
          <Alert severity="info" sx={{ py: 0.5 }}>
            Draw on map, add comment, then save
          </Alert>

          <TextField
            label="Comment"
            value={comment}
            InputLabelProps={{
              // ← ADDED
              shrink: true, // ← ADDED
            }}
            onChange={e => setComment(e.target.value)}
            placeholder="Add a comment for this drawing"
            fullWidth
            multiline
            rows={2}
            size="small"
            required
          />

          <Button
            onClick={handleSaveDrawing}
            variant="contained"
            fullWidth
            size="small"
            disabled={!comment.trim()}
            sx={{ bgcolor: '#38a169', '&:hover': { bgcolor: '#2f855a' } }}
            startIcon={<Save className="h-4 w-4" />}>
            Save to GeoServer
          </Button>
        </div>
      )}

      {/* Selected Feature Info */}
      {selectedFeature && (
        <div className="space-y-2 mb-2">
          <Alert severity="success" sx={{ py: 0.5 }}>
            Redlining selected
          </Alert>

          <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Type:</span>
              <span className="text-slate-900 capitalize">{selectedFeature.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Created by:</span>
              <span className="text-slate-900">{selectedFeature.creator}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Created:</span>
              <span className="text-slate-900">
                {new Date(selectedFeature.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <TextField
            label="Comment"
            value={comment}
            disabled
            fullWidth
            multiline
            rows={2}
            size="small"
          />

          <Button
            onClick={handleDeleteFeature}
            variant="outlined"
            fullWidth
            size="small"
            color="error"
            startIcon={<Trash2 className="h-4 w-4" />}>
            Delete Redlining
          </Button>
        </div>
      )}

      {/* Saved Drawings List */}
      {drawnFeatures.length > 0 && (
        <div className="flex-1 overflow-y-auto">
          <h4 className="text-sm text-slate-900 mb-2">Saved Drawings ({drawnFeatures.length})</h4>
          <div className="space-y-1.5">
            {drawnFeatures.map(feature => (
              <div
                key={feature.id}
                onClick={() => handleSelectFeature(feature)}
                className="p-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-slate-300 hover:shadow-sm transition-all">
                <div className="flex justify-between items-start text-xs">
                  <span className="text-slate-900 capitalize font-medium">{feature.type}</span>
                  <span className="text-slate-500">
                    {new Date(feature.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{feature.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
