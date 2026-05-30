import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppContext } from '../hooks/useAppContext';

const slugify = (name: string): string =>
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const COLOR_SCALE = ['#c5d9f7', '#93b8f0', '#6196e8', '#3b7de8', '#1a56c8'];

const getColorByIndex = (idx: number, total: number): string => {
  const pos = Math.floor((idx / total) * (COLOR_SCALE.length - 1));
  return COLOR_SCALE[pos];
};

const MapaParaiba: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const geoLayerRef = useRef<L.GeoJSON | null>(null);
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);
  const { selectedCity, setSelectedCity } = useAppContext();
  const selectedCityRef = useRef(selectedCity);

  useEffect(() => {
    selectedCityRef.current = selectedCity;
  }, [selectedCity]);

  const getStyle = (featureId: string, baseColor: string, isHovered = false): L.PathOptions => {
    const isSelected = selectedCityRef.current?.id === featureId;
    if (isSelected) {
      return { fillColor: '#1a73e8', fillOpacity: 0.85, color: '#0d47a1', weight: 2.5 };
    }
    if (isHovered) {
      return { fillColor: '#4285f4', fillOpacity: 0.65, color: '#1557b0', weight: 2 };
    }
    return { fillColor: baseColor, fillOpacity: 0.6, color: '#ffffff', weight: 0.8 };
  };

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const PB_BOUNDS = L.latLngBounds(
      L.latLng(-8.35, -38.85),  // SW
      L.latLng(-5.90, -34.75),  // NE
    );

    const map = L.map(containerRef.current, {
      center: [-7.12, -36.72],
      zoom: 8,
      minZoom: 7,  
      maxZoom: 11, 
      maxBounds: PB_BOUNDS,
      maxBoundsViscosity: 1.0,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19,
    }).addTo(map);

    fetch('/PB.json')
      .then((r) => r.json())
      .then((geojson: GeoJSON.FeatureCollection) => {
        const total = geojson.features.length;

        const geoLayer = L.geoJSON(geojson, {
          style: (feature) => {
            const idx = geojson.features.indexOf(feature!);
            const color = getColorByIndex(idx, total);
            const id = slugify(feature?.properties?.NOME ?? '');
            return getStyle(id, color);
          },
          onEachFeature: (feature, layer) => {
            const nome: string = feature.properties?.NOME ?? '';
            const id = slugify(nome);
            const idx = geojson.features.indexOf(feature);
            const baseColor = getColorByIndex(idx, total);

            layer.on('mouseover', (e) => {
              if (selectedCityRef.current?.id !== id) {
                (layer as L.Path).setStyle(getStyle(id, baseColor, true));
              }
              const point = map.latLngToContainerPoint(e.latlng);
              setTooltip({ name: nome, x: point.x, y: point.y });
            });

            layer.on('mousemove', (e) => {
              const point = map.latLngToContainerPoint(e.latlng);
              setTooltip({ name: nome, x: point.x, y: point.y });
            });

            layer.on('mouseout', () => {
              (layer as L.Path).setStyle(getStyle(id, baseColor, false));
              setTooltip(null);
            });

            layer.on('click', (e) => {
              e.originalEvent?.stopPropagation();
              e.originalEvent?.preventDefault();
              
              setSelectedCity({ id, name: nome });
              
              if (document.activeElement && 'blur' in document.activeElement) {
                (document.activeElement as HTMLElement).blur();
              }
              
              containerRef.current?.blur();
              map.dragging.disable();
              setTimeout(() => map.dragging.enable(), 100);
            });
          },
        }).addTo(map);

        geoLayerRef.current = geoLayer;

        // Fit bounds ao estado
        map.fitBounds(geoLayer.getBounds(), { padding: [20, 20] });
      })
      .catch(console.error);

    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!geoLayerRef.current || !mapRef.current) return;
    const map = mapRef.current;
    const geojsonLayer = geoLayerRef.current;
    let idx = 0;
    const total = Object.keys((geojsonLayer as unknown as { _layers: Record<string, unknown> })._layers ?? {}).length;

    geojsonLayer.eachLayer((layer) => {
      const f = (layer as L.GeoJSON & { feature: GeoJSON.Feature }).feature;
      if (f?.properties) {
        const nome: string = f.properties.NOME ?? '';
        const id = slugify(nome);
        const baseColor = getColorByIndex(idx, total);
        (layer as L.Path).setStyle(getStyle(id, baseColor));
      }
      idx++;
    });

    // Zoom na cidade selecionada
    if (selectedCity) {
      geojsonLayer.eachLayer((layer) => {
        const f = (layer as L.GeoJSON & { feature: GeoJSON.Feature }).feature;
        if (f?.properties) {
          const id = slugify(f.properties.NOME ?? '');
          if (id === selectedCity.id) {
            const poly = layer as L.Polygon;
            try { map.fitBounds(poly.getBounds(), { padding: [40, 40], maxZoom: 10 }); }
            catch { /* ignore */ }
          }
        }
      });
    } else {
      // Reset zoom
      if (geojsonLayer.getBounds().isValid()) {
        map.fitBounds(geojsonLayer.getBounds(), { padding: [20, 20] });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCity]);

  return (
    <div className="map-wrapper relative">
      <div ref={containerRef} className="map-container" />

      {tooltip && (
        <div
          className="absolute z-1000 bg-white border border-gray-200 text-gray-900 px-3 py-1.5 rounded-lg text-[13px] font-semibold pointer-events-none whitespace-nowrap shadow-md"
          style={{ left: tooltip.x + 14, top: tooltip.y - 14 }}
        >
          {tooltip.name}
        </div>
      )}

      <div className="absolute bottom-4 left-4 z-10 bg-white border border-gray-200 rounded-xl px-3.5 py-2.5 flex flex-col gap-1.5 shadow-sm">
        <div className="text-[10px] font-bold text-gray-700 uppercase tracking-wider mb-0.5">Municípios</div>
        <div className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-0.5">Clique para informações sobre um município</div>

      </div>
    </div>
  );
};

export default MapaParaiba;
