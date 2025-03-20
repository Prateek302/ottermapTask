import React from "react";
import { useFormContext } from "../context/FormContext";
import MapComponent from "../components/MapComponent";

const MapPage = () => {
  const { formData } = useFormContext();

  return (
    <div className="min-h-screen bg-secondary text-primary flex flex-col items-center">
      <h1 className="text-2xl font-bold py-4">{formData.firstName || "User"}</h1>
      <MapComponent />
    </div>
  );
};

export default MapPage;
