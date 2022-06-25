import { Navigate, Route, Routes } from "react-router-dom";
import ServicesPage from "./ServicesPage/";
import ServicePage from "./ServicePage/";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/services" />} />
      <Route path="/services/" element={<ServicesPage />} />
      <Route path="/services/:id" element={<ServicePage />} />
    </Routes>
  );
}

export default App;
