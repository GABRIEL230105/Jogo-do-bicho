import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Register } from "../pages/Register"
import { Login } from "../pages/login"

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}