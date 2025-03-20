import React, { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Draw, Modify } from "ol/interaction";
import { Vector as VectorLayer } from "ol/layer";
import { Vector as VectorSource } from "ol/source";
import { FaDrawPolygon, FaEdit, FaTrash } from "react-icons/fa";

const MapComponent = ({ user }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [vectorSource, setVectorSource] = useState(null);
  const [drawInteraction, setDrawInteraction] = useState(null);
  const [modifyInteraction, setModifyInteraction] = useState(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const source = new VectorSource();
    const vectorLayer = new VectorLayer({ source });

    const mapInstance = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    setMap(mapInstance);
    setVectorSource(source);

    return () => {
      mapInstance.setTarget(null);
    };
  }, []);

  const addInteraction = (type) => {
    if (!map || !vectorSource) return;

    map.removeInteraction(drawInteraction);
    map.removeInteraction(modifyInteraction);

    if (type === "draw") {
      const draw = new Draw({ source: vectorSource, type: "Polygon" });
      map.addInteraction(draw);
      setDrawInteraction(draw);
    } else if (type === "edit") {
      const modify = new Modify({ source: vectorSource });
      map.addInteraction(modify);
      setModifyInteraction(modify);
    }
  };

  const clearPolygons = () => {
    if (vectorSource) vectorSource.clear();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-green-100">
      <h2 className="text-3xl font-bold text-green-700 my-4">{user?.firstName}'s Map</h2>
      <div className="flex gap-3 mb-4">
        <button onClick={() => addInteraction("draw")} className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700">
          <FaDrawPolygon /> Draw
        </button>
        <button onClick={() => addInteraction("edit")} className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700">
          <FaEdit /> Edit
        </button>
        <button onClick={clearPolygons} className="bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-red-700">
          <FaTrash /> Delete
        </button>
      </div>
      <div ref={mapRef} className="w-[90%] h-[500px] bg-white rounded-lg shadow-md"></div>
    </div>
  );
};

export default MapComponent;
