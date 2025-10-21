import { useState } from 'react';
import MapHeader from './map/MapHeader';
import MapSidebar from './map/MapSidebar';
import SlidingPanel from './map/SlidingPanel';
import MapArea from './map/MapArea';
import SearchResultsTable from './map/SearchResultsTable';
import FeedersPanel from './map/panels/FeedersPanel';
import LayersPanel from './map/panels/LayersPanel';
import BasemapsPanel from './map/panels/BasemapsPanel';
import SearchPanel from './map/panels/SearchPanel';
import EditPanel from './map/panels/EditPanel';
import DrawPanel from './map/panels/DrawPanel';
import ExportPanel from './map/panels/ExportPanel';
import PrintPanel from './map/panels/PrintPanel';

export default function MapPage({ onLogout }) {
  const [activeTool, setActiveTool] = useState(null);
  const [selectedFeeders, setSelectedFeeders] = useState([]);
  const [bookmarkedFeeder, setBookmarkedFeeder] = useState(null);
  const [selectedBasemap, setSelectedBasemap] = useState('osm');
  const [activeDrawTool, setActiveDrawTool] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [layers, setLayers] = useState([
    { id: '1', name: 'Distribution Transformers', visible: true, opacity: 100 },
    { id: '2', name: 'HT Lines', visible: true, opacity: 100 },
    { id: '3', name: 'LT Lines', visible: false, opacity: 100 },
    { id: '4', name: 'Substations', visible: true, opacity: 100 },
    { id: '5', name: 'Service Areas', visible: true, opacity: 80 },
    { id: '6', name: 'Poles', visible: false, opacity: 100 },
    { id: '7', name: 'Meters', visible: false, opacity: 100 },
    { id: '8', name: 'Consumer Connections', visible: false, opacity: 100 },
    { id: '9', name: 'Street Lights', visible: false, opacity: 100 },
    { id: '10', name: 'Cable Routes', visible: false, opacity: 100 },
    { id: '11', name: 'Underground Cables', visible: false, opacity: 100 },
    { id: '12', name: 'Overhead Lines', visible: true, opacity: 100 },
    { id: '13', name: 'Circuit Breakers', visible: false, opacity: 100 },
    { id: '14', name: 'Isolators', visible: false, opacity: 100 },
    { id: '15', name: 'Fuse Cut-Outs', visible: false, opacity: 100 },
    { id: '16', name: 'Lightning Arresters', visible: false, opacity: 100 },
    { id: '17', name: 'Capacitor Banks', visible: false, opacity: 100 },
    { id: '18', name: 'Voltage Regulators', visible: false, opacity: 100 },
    { id: '19', name: 'Switching Stations', visible: false, opacity: 100 },
    { id: '20', name: 'Ring Main Units', visible: false, opacity: 100 },
    { id: '21', name: 'Kiosks', visible: false, opacity: 100 },
    { id: '22', name: 'Manholes', visible: false, opacity: 100 },
    { id: '23', name: 'Duct Banks', visible: false, opacity: 100 },
    { id: '24', name: 'Boundary Lines', visible: true, opacity: 60 },
    { id: '25', name: 'Roads', visible: true, opacity: 100 },
    { id: '26', name: 'Buildings', visible: true, opacity: 70 },
    { id: '27', name: 'Water Bodies', visible: true, opacity: 100 },
    { id: '28', name: 'Vegetation', visible: false, opacity: 50 },
  ]);

  const handleToolClick = tool => {
    setActiveTool(activeTool === tool ? null : tool);
  };

  const handleClosePanel = () => {
    setActiveTool(null);
  };

  const handleLayerToggle = layerId => {
    setLayers(
      layers.map(layer => (layer.id === layerId ? { ...layer, visible: !layer.visible } : layer))
    );
  };

  const handleLayerOpacityChange = (layerId, opacity) => {
    setLayers(layers.map(layer => (layer.id === layerId ? { ...layer, opacity } : layer)));
  };

  const renderPanelContent = () => {
    switch (activeTool) {
      case 'feeders':
        return (
          <FeedersPanel
            selectedFeeders={selectedFeeders}
            onSelectFeeders={setSelectedFeeders}
            bookmarkedFeeder={bookmarkedFeeder}
            onBookmarkFeeder={setBookmarkedFeeder}
          />
        );
      case 'layers':
        return (
          <LayersPanel
            layers={layers}
            onLayerToggle={handleLayerToggle}
            onOpacityChange={handleLayerOpacityChange}
          />
        );
      case 'basemaps':
        return (
          <BasemapsPanel selectedBasemap={selectedBasemap} onSelectBasemap={setSelectedBasemap} />
        );
      case 'search':
        return <SearchPanel onSearchResults={setSearchResults} />;
      case 'edit':
        return <EditPanel />;
      case 'draw':
        return <DrawPanel activeDrawTool={activeDrawTool} onDrawToolChange={setActiveDrawTool} />;
      case 'export':
        return <ExportPanel />;
      case 'print':
        return <PrintPanel />;
      default:
        return null;
    }
  };

  const getPanelTitle = () => {
    switch (activeTool) {
      case 'feeders':
        return 'Feeders';
      case 'layers':
        return 'Layers';
      case 'basemaps':
        return 'Basemaps';
      case 'search':
        return 'Search';
      case 'edit':
        return 'Edit';
      case 'draw':
        return 'Draw';
      case 'export':
        return 'Export';
      case 'print':
        return 'Print';
      default:
        return '';
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-slate-50">
      <MapHeader onLogout={onLogout} />

      <div className="flex-1 flex overflow-hidden relative">
        <MapSidebar activeTool={activeTool} onToolClick={handleToolClick} />

        <SlidingPanel
          isOpen={activeTool !== null}
          title={getPanelTitle()}
          onClose={handleClosePanel}>
          {renderPanelContent()}
        </SlidingPanel>

        <MapArea
          selectedFeeders={selectedFeeders}
          selectedBasemap={selectedBasemap}
          layers={layers}
        />

        <SearchResultsTable
          results={searchResults}
          onClose={() => setSearchResults(null)}
          onLocate={feature => console.log('Locating feature:', feature)}
        />
      </div>
    </div>
  );
}
