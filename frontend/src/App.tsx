
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import AppRouter from "./router/AppRouter";
import { LoginPage } from "./pages/LoginPage";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App;
