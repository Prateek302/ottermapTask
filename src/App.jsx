import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormComponent from "./components/FormComponent";
import MapComponent from "./components/MapComponent";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormComponent setUser={setUser} />} />
        <Route path="/map" element={<MapComponent user={user} />} />
      </Routes>
    </Router>
  );
};

export default App;
