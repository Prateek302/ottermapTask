import { useEffect, useRef } from "react";
import { useUser } from "../context/Context";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import { Tile as TileLayer } from "ol/layer";
import { OSM } from "ol/source";
import { Draw, Modify, Snap } from "ol/interaction";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());

  useEffect(() => {
    if (!user.firstName) {
      navigate("/");
      return;
    }

    const vectorLayer = new VectorLayer({
      source: vectorSourceRef.current,
      style: new Style({
        stroke: new Stroke({ color: "yellow", width: 2 }),
        fill: new Fill({ color: "rgba(255, 215, 0, 0.3)" }),
      }),
    });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
      ],
      view: new View({ center: [0, 0], zoom: 2 }),
    });

    const draw = new Draw({ source: vectorSourceRef.current, type: "Polygon" });
    const modify = new Modify({ source: vectorSourceRef.current });
    const snap = new Snap({ source: vectorSourceRef.current });

    map.addInteraction(draw);
    map.addInteraction(modify);
    map.addInteraction(snap);

    return () => map.setTarget(null);
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <header className="text-2xl font-bold py-4 w-full text-center bg-yellow-500 text-black">
        {user.firstName}'s Map
      </header>
      <div ref={mapRef} className="w-full h-[500px]"></div>
    </div>
  );
};

export default MapPage;
