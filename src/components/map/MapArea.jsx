import { useState, useEffect, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Home,
  Maximize,
  Info,
  Ruler,
  Crosshair,
  SquareDashedMousePointer,
} from 'lucide-react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import { fromLonLat } from 'ol/proj';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Circle, Fill, Stroke, Text } from 'ol/style';
import 'ol/ol.css';

export default function MapArea({ selectedFeeders = [], selectedBasemap, layers }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const [mouseCoords, setMouseCoords] = useState({ lat: 10.5276, lng: 76.2144 });
  const [zoomLevel, setZoomLevel] = useState(12);

  // Initialize OpenLayers Map
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Create base layer - OpenStreetMap
    const osmLayer = new TileLayer({
      source: new OSM(),
      visible: true,
    });
    osmLayer.set('name', 'osm');

    // Create satellite layer
    const satelliteLayer = new TileLayer({
      source: new XYZ({
        url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
        maxZoom: 19,
      }),
      visible: false,
    });
    satelliteLayer.set('name', 'satellite');

    // Create terrain layer
    const terrainLayer = new TileLayer({
      source: new XYZ({
        url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png',
        maxZoom: 17,
      }),
      visible: false,
    });
    terrainLayer.set('name', 'terrain');

    // Create blank layer
    const blankLayer = new TileLayer({
      source: new XYZ({
        url: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
      }),
      visible: false,
    });
    blankLayer.set('name', 'blank');

    // Create vector layer for feeder overlay
    const feederSource = new VectorSource();
    const feederLayer = new VectorLayer({
      source: feederSource,
      style: new Style({
        image: new Circle({
          radius: 8,
          fill: new Fill({ color: '#38a169' }),
          stroke: new Stroke({ color: '#0e5a3f', width: 2 }),
        }),
      }),
    });

    // Initialize map - Center on Thrissur, Kerala, India
    const map = new Map({
      target: mapRef.current,
      layers: [osmLayer, satelliteLayer, terrainLayer, blankLayer, feederLayer],
      view: new View({
        center: fromLonLat([76.2144, 10.5276]), // Thrissur coordinates
        zoom: 12,
      }),
    });

    mapInstanceRef.current = map;

    // Update zoom level on map zoom
    map.getView().on('change:resolution', () => {
      const zoom = map.getView().getZoom();
      setZoomLevel(Math.round(zoom));
    });

    // Update coordinates on mouse move
    map.on('pointermove', event => {
      const coords = map.getEventCoordinate(event.originalEvent);
      const [lng, lat] = toLonLat(coords);
      setMouseCoords({ lat, lng });
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  // Handle basemap switching
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    map.getLayers().forEach(layer => {
      if (layer instanceof TileLayer) {
        const layerName = layer.get('name');
        if (layerName === selectedBasemap) {
          layer.setVisible(true);
        } else if (['osm', 'satellite', 'terrain', 'blank'].includes(layerName)) {
          layer.setVisible(false);
        }
      }
    });
  }, [selectedBasemap]);

  // Handle feeder selection
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    const map = mapInstanceRef.current;
    const feederLayer = map
      .getLayers()
      .getArray()
      .find(layer => layer instanceof VectorLayer);

    if (feederLayer && feederLayer.getSource()) {
      const source = feederLayer.getSource();
      source.clear();

      if (selectedFeeders.length > 0) {
        // Add markers for each selected feeder
        const features = selectedFeeders.map((feederId, index) => {
          const feederCoords = fromLonLat([
            76.2144 + index * 0.02 + (Math.random() - 0.5) * 0.01,
            10.5276 + index * 0.02 + (Math.random() - 0.5) * 0.01,
          ]);

          const feature = new Feature({
            geometry: new Point(feederCoords),
            name: feederId,
          });

          feature.setStyle(
            new Style({
              image: new Circle({
                radius: 10,
                fill: new Fill({ color: '#38a169' }),
                stroke: new Stroke({ color: '#0e5a3f', width: 3 }),
              }),
              text: new Text({
                text: `F${index + 1}`,
                offsetY: -20,
                fill: new Fill({ color: '#0e5a3f' }),
                stroke: new Stroke({ color: '#ffffff', width: 3 }),
              }),
            })
          );

          return feature;
        });

        source.addFeatures(features);

        // Animate to first feeder location
        if (features.length > 0) {
          const firstFeederCoords = features[0].getGeometry().getCoordinates();
          map.getView().animate({
            center: firstFeederCoords,
            zoom: 13,
            duration: 1000,
          });
        }
      }
    }
  }, [selectedFeeders]);

  const handleZoomIn = () => {
    if (!mapInstanceRef.current) return;
    const view = mapInstanceRef.current.getView();
    view.animate({
      zoom: view.getZoom() + 1,
      duration: 250,
    });
  };

  const handleZoomOut = () => {
    if (!mapInstanceRef.current) return;
    const view = mapInstanceRef.current.getView();
    view.animate({
      zoom: view.getZoom() - 1,
      duration: 250,
    });
  };

  const handleHome = () => {
    if (!mapInstanceRef.current) return;
    const view = mapInstanceRef.current.getView();
    view.animate({
      center: fromLonLat([76.2144, 10.5276]),
      zoom: 12,
      duration: 500,
    });
  };

  const handleFullScreen = () => {
    try {
      // Check if fullscreen API is available and allowed
      if (!document.fullscreenEnabled) {
        console.log('Fullscreen is not available in this environment');
        return;
      }

      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
          console.log('Fullscreen request failed:', err.message);
        });
      } else {
        document.exitFullscreen().catch(err => {
          console.log('Exit fullscreen failed:', err.message);
        });
      }
    } catch (error) {
      console.log('Fullscreen not supported:', error.message);
    }
  };

  const MapControlButton = ({ icon: Icon, label, onClick, title }) => (
    <Tooltip title={label} placement="left" arrow>
      <IconButton
        onClick={onClick}
        aria-label={label}
        sx={{
          width: 40,
          height: 40,
          borderRadius: 0,
          bgcolor: 'white',
          color: '#475569',
          '&:hover': {
            bgcolor: '#475569',
            color: 'white',
          },
          transition: 'all 0.2s',
        }}>
        <Icon className="h-5 w-5" />
      </IconButton>
    </Tooltip>
  );

  return (
    <div className="flex-1 relative bg-slate-100 overflow-hidden">
      {/* OpenLayers Map Container */}
      <div
        ref={mapRef}
        className="absolute inset-0 w-full h-full"
        style={{ background: '#f8fafc' }}
      />

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          <MapControlButton icon={ZoomIn} label="Zoom In" title="Zoom In" onClick={handleZoomIn} />

          <div className="border-t border-gray-200" />

          <MapControlButton
            icon={ZoomOut}
            label="Zoom Out"
            title="Zoom Out"
            onClick={handleZoomOut}
          />
        </div>

        <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
          <MapControlButton
            icon={SquareDashedMousePointer}
            label="Select Area Zoom"
            title="Select Area Zoom"
            onClick={() => {}}
          />

          <div className="border-t border-gray-200" />

          <MapControlButton icon={Info} label="Info" title="Info" onClick={() => {}} />

          <div className="border-t border-gray-200" />

          <MapControlButton icon={Home} label="Home" title="Home" onClick={handleHome} />

          <div className="border-t border-gray-200" />

          <MapControlButton icon={Ruler} label="Measure" title="Measure" onClick={() => {}} />

          <div className="border-t border-gray-200" />

          <MapControlButton
            icon={Maximize}
            label="Full Screen"
            title="Full Screen"
            onClick={handleFullScreen}
          />

          <div className="border-t border-gray-200" />

          <MapControlButton
            icon={Crosshair}
            label="Geolocation"
            title="Geolocation"
            onClick={() => {}}
          />
        </div>
      </div>

      {/* Bottom Info Bar - Clean overlay on map */}
      <div className="absolute bottom-4 left-4 flex flex-col sm:flex-row gap-3 z-10 pointer-events-none">
        {/* Scale */}
        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <span>Scale:</span>
            <span className="font-mono font-medium text-gray-900">
              1:{Math.round(Math.pow(2, 18 - zoomLevel) * 1000)}
            </span>
          </div>
        </div>

        {/* Scale Bar */}
        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded shadow-lg border border-gray-200">
          <div className="flex items-center gap-2">
            <div className="h-0.5 bg-gray-900 w-20" />
            <span className="text-xs font-mono font-medium text-gray-900">
              {Math.round(100 / Math.pow(2, zoomLevel - 12))} km
            </span>
          </div>
        </div>

        {/* Coordinates */}
        <div className="bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 text-xs text-gray-700">
            <span>Coordinates:</span>
            <span className="font-mono font-medium text-gray-900">
              {mouseCoords.lat.toFixed(6)}°N, {mouseCoords.lng.toFixed(6)}°E
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function toLonLat(coords) {
  const [x, y] = coords;
  const lon = (x / 20037508.34) * 180;
  let lat = (y / 20037508.34) * 180;
  lat = (180 / Math.PI) * (2 * Math.atan(Math.exp((lat * Math.PI) / 180)) - Math.PI / 2);
  return [lon, lat];
}
