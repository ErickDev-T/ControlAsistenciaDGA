import { Routes, Route } from "react-router-dom";
import HomePage from "../component/HomePage";
import FormStandar from "../component/forms/FormStandar";
import FormSameDay from "../component/forms/FormSameDay";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/FormStandar" element={<FormStandar />} />
      <Route path="/FormSameDay" element={<FormSameDay/>}/>
      <Route path="*" element={<div className="p-8">Página no encontrada</div>} />
    </Routes>
  );
}
