import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom"; // Removed Router import
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import HomePage from "./pages/home";
import EditPage from "./pages/edit";

// Lazy-loaded component
const MyComponent = lazy(() => import("./components/LazyComponent"));

function App() {
  return (
    <div className="App">
      <h1>Meme Generator</h1>

      {/* Lazy-loaded component */}
      <Suspense fallback={<div>Loading Component...</div>}>
        <MyComponent />
      </Suspense>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditPage />} />
      </Routes>
    </div>
  );
}

export default App;
