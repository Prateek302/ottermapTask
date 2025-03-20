import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "../src/context/Context";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";

const App = () => {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/map" element={<MapPage />} />
                </Routes>
            </Router>
        </UserProvider>
    );
};

export default App;
