
import { Route, Routes } from "react-router-dom";
import "./App.css";
// import AppRouter from "./router/AppRouter";
import { LoginPage } from "./pages/LoginPage";
import Home from "./pages/Home";
import PDFViewer from "./pages/PDFViewer.tsx";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<LoginPage />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<div>404 Not Found</div>} />
      <Route path="/pdf-viewer" element={<PDFViewer/>} />
    </Routes>
  )
}

export default App;
