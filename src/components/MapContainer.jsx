import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import { Map, View } from "ol";
import { OSM } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { Draw, Modify, Snap } from "ol/interaction";
import { Polygon } from "ol/geom";
import { Fill, Stroke, Style } from "ol/style";

const MapComponent = () => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [vectorSource, setVectorSource] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Base map
    const rasterLayer = new TileLayer({
      source: new OSM(),
    });

    // Vector layer for polygons
    const source = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: source,
      style: new Style({
        stroke: new Stroke({ color: "yellow", width: 2 }),
        fill: new Fill({ color: "rgba(255, 255, 0, 0.3)" }),
      }),
    });

    // Initialize map
    const olMap = new Map({
      target: mapRef.current,
      layers: [rasterLayer, vectorLayer],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    setMap(olMap);
    setVectorSource(source);

    return () => olMap.setTarget(null);
  }, []);

  // Function to add draw interaction
  const addDraw = () => {
    if (!map || !vectorSource) return;

    const draw = new Draw({
      source: vectorSource,
      type: "Polygon",
    });

    map.addInteraction(draw);
  };

  // Function to enable editing
  const enableEdit = () => {
    if (!map || !vectorSource) return;

    const modify = new Modify({ source: vectorSource });
    map.addInteraction(modify);
  };

  // Function to delete all polygons
  const deletePolygons = () => {
    if (vectorSource) vectorSource.clear();
  };

  return (
    <div className="flex flex-col items-center">
      <div ref={mapRef} className="w-full h-96 border-2 border-yellow"></div>
      <div className="mt-4 space-x-4">
        <button onClick={addDraw} className="px-4 py-2 bg-black text-yellow rounded">Draw Polygon</button>
        <button onClick={enableEdit} className="px-4 py-2 bg-yellow text-black rounded">Edit</button>
        <button onClick={deletePolygons} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  );
};

export default MapComponent;
