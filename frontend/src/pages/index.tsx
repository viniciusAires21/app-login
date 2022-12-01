import { Forms } from "./forms";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./home";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/:id" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
