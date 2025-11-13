import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <div className="flex min-h-svh flex-col items-center justify-center">
            <h1>Welcome to PDF Manager</h1>
          </div>
        }
      />
    </Routes>
  );
}

export default App;
