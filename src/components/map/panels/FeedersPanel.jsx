import { useState } from 'react';
import { Star, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Collapse from '@mui/material/Collapse';
import { Search } from 'lucide-react';

const feeders = [
  {
    id: 'all',
    name: 'All Feeders',
    isAllOption: true,
  },
  {
    id: 'f1',
    name: 'MISSION QUARTERS',
    substationName: '33 KV SUB STATION',
    dtcCount: 39,
    consumerCount: 8000,
    htLineLength: 71,
    ltLineLength: 94,
    serviceLineLength: 49,
  },
  {
    id: 'f2',
    name: 'VELIYANNUR',
    substationName: '33 KV SUB STATION',
    dtcCount: 38,
    consumerCount: 7000,
    htLineLength: 70,
    ltLineLength: 93,
    serviceLineLength: 48,
  },
  {
    id: 'f3',
    name: 'KOORKANCHERY',
    substationName: '33KV SUBSTATION',
    dtcCount: 24,
    consumerCount: 2000,
    htLineLength: 56,
    ltLineLength: 79,
    serviceLineLength: 34,
  },
  {
    id: 'f4',
    name: 'PARAVATTANI',
    substationName: '33KV SUBSTATION',
    dtcCount: 23,
    consumerCount: 1000,
    htLineLength: 55,
    ltLineLength: 78,
    serviceLineLength: 33,
  },
  {
    id: 'f5',
    name: 'ARANATTUKARA',
    substationName: '110 KV SUB STATION',
    dtcCount: 25,
    consumerCount: 3000,
    htLineLength: 57,
    ltLineLength: 80,
    serviceLineLength: 35,
  },
  {
    id: 'f6',
    name: 'JUBILEE MEDICAL COLLEGE',
    substationName: '110 KV SUB STATION',
    dtcCount: 27,
    consumerCount: 5000,
    htLineLength: 59,
    ltLineLength: 82,
    serviceLineLength: 37,
  },
  {
    id: 'f7',
    name: 'VIVEKODHAYAM',
    substationName: '110KV SUB STATION',
    dtcCount: 28,
    consumerCount: 6000,
    htLineLength: 60,
    ltLineLength: 83,
    serviceLineLength: 38,
  },
  {
    id: 'f8',
    name: 'BINI',
    substationName: '110 KV SUB STATION',
    dtcCount: 30,
    consumerCount: 8000,
    htLineLength: 62,
    ltLineLength: 85,
    serviceLineLength: 40,
  },
  {
    id: 'f9',
    name: 'POONKUNNAM',
    substationName: '110 KV SUB STATION',
    dtcCount: 29,
    consumerCount: 7000,
    htLineLength: 61,
    ltLineLength: 84,
    serviceLineLength: 39,
  },
  {
    id: 'f10',
    name: 'KERALAVARMA',
    substationName: 'UNKN',
    dtcCount: 31,
    consumerCount: 9000,
    htLineLength: 63,
    ltLineLength: 86,
    serviceLineLength: 41,
  },
  {
    id: 'f11',
    name: 'M O ROAD',
    substationName: '110 KV SUB STATION',
    dtcCount: 32,
    consumerCount: 1000,
    htLineLength: 64,
    ltLineLength: 87,
    serviceLineLength: 42,
  },
  {
    id: 'f12',
    name: 'KOTTAPURAM',
    substationName: '110 KV SUB STATION',
    dtcCount: 33,
    consumerCount: 2000,
    htLineLength: 65,
    ltLineLength: 88,
    serviceLineLength: 43,
  },
  {
    id: 'f13',
    name: 'CHEMBUKAVU',
    substationName: '110 KV SUB STATION',
    dtcCount: 34,
    consumerCount: 3000,
    htLineLength: 66,
    ltLineLength: 89,
    serviceLineLength: 44,
  },
  {
    id: 'f14',
    name: 'SHORNUR ROAD',
    substationName: '110 KV SUB STATION',
    dtcCount: 35,
    consumerCount: 4000,
    htLineLength: 67,
    ltLineLength: 90,
    serviceLineLength: 45,
  },
  {
    id: 'f15',
    name: 'DIS HOSPITAL',
    substationName: '110 KV  SUB STATION',
    dtcCount: 37,
    consumerCount: 6000,
    htLineLength: 69,
    ltLineLength: 92,
    serviceLineLength: 47,
  },
  {
    id: 'f16',
    name: 'EAST FORT',
    substationName: '110 KV SUB STATION',
    dtcCount: 36,
    consumerCount: 5000,
    htLineLength: 68,
    ltLineLength: 91,
    serviceLineLength: 46,
  },
  {
    id: 'f17',
    name: 'VANJIKKULAM',
    substationName: '110 KV SUB STATION',
    dtcCount: 26,
    consumerCount: 4000,
    htLineLength: 58,
    ltLineLength: 81,
    serviceLineLength: 36,
  },
];

export default function FeedersPanel({
  selectedFeeders = [],
  onSelectFeeders,
  bookmarkedFeeder,
  onBookmarkFeeder,
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFeeders, setExpandedFeeders] = useState({});

  const toggleExpanded = feederId => {
    setExpandedFeeders(prev => ({
      ...prev,
      [feederId]: !prev[feederId],
    }));
  };

  const handleBookmark = feederId => {
    // Don't allow bookmarking "All Feeders"
    if (feederId === 'all') return;

    if (bookmarkedFeeder === feederId) {
      onBookmarkFeeder(null);
    } else {
      onBookmarkFeeder(feederId);
    }
  };

  const handleFeederToggle = feederId => {
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

  const handleViewOnMap = feederId => {
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

  return (
    <div className="flex flex-col h-full">
      <p className="text-sm text-slate-600 mb-3 leading-relaxed">
        Select feeders to highlight their service areas on the map
      </p>

      {/* Search */}
      <TextField
        placeholder="Search feeders..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        size="small"
        fullWidth
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search className="h-4 w-4 text-slate-400" />
            </InputAdornment>
          ),
        }}
      />

      {/* Bookmarked Feeder - Clickable */}
      {bookmarkedFeeder && (
        <div
          onClick={handleBookmarkedFeederClick}
          className="mb-2 p-2 bg-amber-50 border border-amber-200 rounded-lg shadow-sm cursor-pointer hover:bg-amber-100 hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs text-amber-700 mb-0.5">📌 Bookmarked</p>
              <p className="text-sm text-slate-900 truncate">
                {feeders.find(f => f.id === bookmarkedFeeder)?.name}
              </p>
            </div>
            <MapPin className="h-4 w-4 text-amber-600 ml-2 flex-shrink-0" />
          </div>
        </div>
      )}

      {/* Feeder List - Compact with Accordion */}
      <div className="flex-1 overflow-y-auto space-y-1.5">
        {filteredFeeders.map(feeder => {
          const isExpanded = expandedFeeders[feeder.id];
          const isAllOption = feeder.isAllOption;

          return (
            <div
              key={feeder.id}
              className={`border rounded-lg transition-all ${
                selectedFeeders.includes(feeder.id)
                  ? 'border-green-500 bg-green-50 shadow-sm'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
              }`}>
              {/* Main Feeder Row */}
              <div className="p-2">
                <div className="flex items-center gap-2">
                  {/* Checkbox and Name on same line */}
                  <Checkbox
                    checked={selectedFeeders.includes(feeder.id)}
                    onChange={() => handleFeederToggle(feeder.id)}
                    size="small"
                    sx={{ p: 0.5 }}
                  />
                  <h3 className="text-sm text-slate-900 leading-tight flex-1">{feeder.name}</h3>

                  {/* Action Buttons */}
                  {!isAllOption && (
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      {/* Bookmark */}
                      <IconButton
                        onClick={e => {
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
                        aria-label={`Bookmark ${feeder.name}`}>
                        <Star
                          className={`h-3.5 w-3.5 ${bookmarkedFeeder === feeder.id ? 'fill-current' : ''}`}
                        />
                      </IconButton>

                      {/* Expand/Collapse Button */}
                      <IconButton
                        onClick={() => toggleExpanded(feeder.id)}
                        size="small"
                        sx={{
                          p: 0.5,
                          color: '#64748b',
                          '&:hover': {
                            color: '#1e293b',
                          },
                        }}
                        aria-label={isExpanded ? 'Collapse details' : 'Expand details'}>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </IconButton>
                    </div>
                  )}
                </div>

                {/* Expandable Details */}
                {!isAllOption && (
                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <div className="border-t border-slate-200/50 mt-3 pt-3">
                      <div className="space-y-2 text-sm bg-slate-50/60 p-3 rounded">
                        {/* Each row: label (left) and value (right) on same line */}
                        <div className="flex items-center justify-between">
                          <div className="text-[10px] text-slate-500">Substation:</div>
                          <div className="text-sm text-slate-900 font-medium truncate ml-4 text-right">
                            {feeder.substationName}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-[10px] text-slate-500">DTC Count:</div>
                          <div className="text-sm text-slate-900 font-medium text-right">
                            {feeder.dtcCount}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-[10px] text-slate-500">Consumers:</div>
                          <div className="text-sm text-slate-900 font-medium text-right">
                            {feeder.consumerCount.toLocaleString()}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-[10px] text-slate-500">HT Line:</div>
                          <div className="text-sm text-slate-900 font-medium text-right">
                            {feeder.htLineLength} km
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-[10px] text-slate-500">LT Line:</div>
                          <div className="text-sm text-slate-900 font-medium text-right">
                            {feeder.ltLineLength} km
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-[10px] text-slate-500">Service Line:</div>
                          <div className="text-sm text-slate-900 font-medium text-right">
                            {feeder.serviceLineLength} km
                          </div>
                        </div>
                      </div>
                    </div>
                  </Collapse>
                )}

                {/* View on Map Button - At bottom */}
                {!isAllOption && (
                  <Button
                    onClick={() => handleViewOnMap(feeder.id)}
                    variant="text"
                    size="small"
                    fullWidth
                    sx={{
                      mt: 1.5,
                      color: '#38a169',
                      minHeight: 0,
                      py: 0.5,
                      bgcolor: 'rgba(56, 161, 105, 0.08)',
                      '&:hover': {
                        bgcolor: 'rgba(56, 161, 105, 0.16)',
                      },
                      textTransform: 'none',
                      fontSize: '0.75rem',
                    }}>
                    View on Map
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
