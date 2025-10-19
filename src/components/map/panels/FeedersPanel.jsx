import { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from 'lucide-react';

const feeders = [
  { id: 'all', name: 'All Feeders', capacity: 'N/A', voltage: 'All', location: 'All Areas' },
  { id: 'f1', name: 'Agartala Main Feeder 1', capacity: '100 MVA', voltage: '11 KV', location: 'West Zone' },
  { id: 'f2', name: 'Agartala Main Feeder 2', capacity: '100 MVA', voltage: '11 KV', location: 'East Zone' },
  { id: 'f3', name: 'Udaipur Feeder A', capacity: '63 MVA', voltage: '11 KV', location: 'South Zone' },
  { id: 'f4', name: 'Udaipur Feeder B', capacity: '63 MVA', voltage: '11 KV', location: 'South Zone' },
  { id: 'f5', name: 'Dharmanagar Feeder 1', capacity: '50 MVA', voltage: '33 KV', location: 'North Zone' },
  { id: 'f6', name: 'Dharmanagar Feeder 2', capacity: '50 MVA', voltage: '33 KV', location: 'North Zone' },
  { id: 'f7', name: 'Kailashahar Feeder', capacity: '40 MVA', voltage: '11 KV', location: 'North Zone' },
  { id: 'f8', name: 'Ambassa Feeder', capacity: '25 MVA', voltage: '11 KV', location: 'Central Zone' },
  { id: 'f9', name: 'Belonia Feeder', capacity: '40 MVA', voltage: '11 KV', location: 'South Zone' },
  { id: 'f10', name: 'Sonamura Feeder', capacity: '50 MVA', voltage: '11 KV', location: 'South Zone' },
  { id: 'f11', name: 'Sabroom Feeder', capacity: '40 MVA', voltage: '11 KV', location: 'South Zone' },
  { id: 'f12', name: 'Khowai Feeder', capacity: '63 MVA', voltage: '11 KV', location: 'Central Zone' },
  { id: 'f13', name: 'Teliamura Feeder', capacity: '40 MVA', voltage: '11 KV', location: 'Central Zone' },
  { id: 'f14', name: 'Mohanpur Feeder', capacity: '63 MVA', voltage: '11 KV', location: 'West Zone' },
  { id: 'f15', name: 'Jirania Feeder', capacity: '100 MVA', voltage: '33 KV', location: 'West Zone' },
  { id: 'f16', name: 'Bishalgarh Feeder', capacity: '63 MVA', voltage: '11 KV', location: 'West Zone' },
  { id: 'f17', name: 'Boxanagar Feeder', capacity: '50 MVA', voltage: '11 KV', location: 'South Zone' },
  { id: 'f18', name: 'Manu Feeder', capacity: '40 MVA', voltage: '11 KV', location: 'North Zone' },
];

export default function FeedersPanel({ selectedFeeders = [], onSelectFeeders, bookmarkedFeeder, onBookmarkFeeder }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleBookmark = (feederId) => {
    // Don't allow bookmarking "All Feeders"
    if (feederId === 'all') return;
    
    if (bookmarkedFeeder === feederId) {
      onBookmarkFeeder(null);
    } else {
      onBookmarkFeeder(feederId);
    }
  };

  const handleFeederToggle = (feederId) => {
    if (feederId === 'all') {
      // Toggle all feeders
      if (selectedFeeders.length === feeders.length) {
        onSelectFeeders([]);
      } else {
        onSelectFeeders(feeders.map(f => f.id));
      }
    } else {
      // Toggle individual feeder
      if (selectedFeeders.includes(feederId)) {
        onSelectFeeders(selectedFeeders.filter(id => id !== feederId));
      } else {
        onSelectFeeders([...selectedFeeders, feederId]);
      }
    }
  };

  const handleViewOnMap = (feederId) => {
    console.log('Centering map on feeder:', feederId);
    // This will recenter the map to the feeder geometry
  };

  const handleBookmarkedFeederClick = () => {
    if (bookmarkedFeeder) {
      handleViewOnMap(bookmarkedFeeder);
      // Ensure it's selected
      if (!selectedFeeders.includes(bookmarkedFeeder)) {
        onSelectFeeders([...selectedFeeders, bookmarkedFeeder]);
      }
    }
  };

  const filteredFeeders = feeders.filter(feeder =>
    feeder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const allSelected = selectedFeeders.length === feeders.length;

  return (
    <div className="flex flex-col h-full">
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Select feeders to highlight their service areas on the map
      </p>

      {/* Search */}
      <TextField
        placeholder="Search feeders..."
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

      {/* Select All */}
      <FormControlLabel
        control={
          <Checkbox
            checked={allSelected}
            indeterminate={selectedFeeders.length > 0 && selectedFeeders.length < feeders.length}
            onChange={() => handleFeederToggle('all')}
            size="small"
          />
        }
        label="Select All Feeders"
        sx={{ 
          mb: 2,
          '& .MuiFormControlLabel-label': { fontSize: '0.875rem', fontWeight: 500, color: '#334155' } 
        }}
      />

      {/* Bookmarked Feeder - Clickable */}
      {bookmarkedFeeder && (
        <div 
          onClick={handleBookmarkedFeederClick}
          className="mb-2 p-2 bg-amber-50 border border-amber-200 rounded-lg shadow-sm cursor-pointer hover:bg-amber-100 hover:border-amber-300 transition-all"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-amber-700 mb-0.5">📌 Bookmarked</p>
              <p className="text-sm text-slate-900 truncate">{feeders.find(f => f.id === bookmarkedFeeder)?.name}</p>
            </div>
            <MapPin className="h-4 w-4 text-amber-600 ml-2 flex-shrink-0" />
          </div>
        </div>
      )}

      {/* Feeder List - Compact */}
      <div className="flex-1 overflow-y-auto space-y-1.5">
        {filteredFeeders.map((feeder) => (
          <div 
            key={feeder.id} 
            className={`p-2 border rounded-lg transition-all ${
              selectedFeeders.includes(feeder.id) 
                ? 'border-green-500 bg-green-50 shadow-sm' 
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
            }`}
          >
            <div className="flex items-start gap-2">
              {/* Checkbox */}
              <Checkbox
                checked={selectedFeeders.includes(feeder.id)}
                onChange={() => handleFeederToggle(feeder.id)}
                size="small"
                sx={{ p: 0.5 }}
              />

              {/* Feeder Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-1">
                  <h3 className="text-sm text-slate-900 leading-tight">{feeder.name}</h3>
                  {/* Bookmark - Only for individual feeders */}
                  {feeder.id !== 'all' && (
                    <IconButton
                      onClick={(e) => {
                        e.preventDefault();
                        handleBookmark(feeder.id);
                      }}
                      size="small"
                      sx={{
                        p: 0.5,
                        color: bookmarkedFeeder === feeder.id ? '#f59e0b' : '#94a3b8',
                        '&:hover': {
                          color: '#f59e0b',
                        },
                      }}
                      aria-label={`Bookmark ${feeder.name}`}
                    >
                      <Star className={`h-3.5 w-3.5 ${bookmarkedFeeder === feeder.id ? 'fill-current' : ''}`} />
                    </IconButton>
                  )}
                </div>

                {/* Attributes - Compact */}
                {feeder.id !== 'all' && (
                  <div className="grid grid-cols-3 gap-x-2 mt-1 text-xs">
                    <div>
                      <span className="text-slate-500">Cap:</span>
                      <span className="text-slate-900 ml-1">{feeder.capacity}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">V:</span>
                      <span className="text-slate-900 ml-1">{feeder.voltage}</span>
                    </div>
                    <div className="col-span-1 truncate">
                      <span className="text-slate-500">Loc:</span>
                      <span className="text-slate-900 ml-1">{feeder.location}</span>
                    </div>
                  </div>
                )}

                {/* View on Map Button - Only for individual feeders */}
                {feeder.id !== 'all' && (
                  <Button
                    onClick={() => handleViewOnMap(feeder.id)}
                    variant="text"
                    size="small"
                    fullWidth
                    sx={{
                      mt: 0.5,
                      color: '#38a169',
                      minHeight: 0,
                      py: 0.25,
                      '&:hover': {
                        bgcolor: 'rgba(56, 161, 105, 0.04)',
                      },
                      textTransform: 'none',
                      fontSize: '0.75rem',
                    }}
                  >
                    View on Map
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
