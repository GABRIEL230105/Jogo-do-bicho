import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Register } from "../pages/Register";
import { Login } from "../pages/Login"; // cuidado com maiúscula/minúscula
import { Home } from "../pages/Home";
import { PrivateRoute } from "./privateRoutes";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* rotas protegidas */}
        
        <Route path="/home" element={<Home />} />
        
      </Routes>
    </Router>
  );
};