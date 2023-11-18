import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Dashboard setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
    </Routes>
  );
}

export default App;
