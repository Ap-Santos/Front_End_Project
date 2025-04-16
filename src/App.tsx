import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProducstPage from "./pages/ProductsPage"
import UsersPage from "./pages/UsersPage"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProducstPage/>} />
        <Route path="/usuarios" element={<UsersPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;