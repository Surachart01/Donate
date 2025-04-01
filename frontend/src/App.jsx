import { BrowserRouter, Route, Routes } from "react-router-dom";
import Admin from "./pages/Admin";
import Form from "./pages/Form";
import NavBar from "./components/NavBar";
import Screen from "./pages/Screen";
import "../src/App.css";
import Login from "./pages/Login";
import History from "./pages/History";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Big screen */}
        <Route path="/" element={<Screen />} />
        {/* Admin Page   */}
        <Route path="/admin" element={<Admin />} />
        {/* From Order */}
        <Route path="/order" element={<Form />} />

        <Route path="/login" element={<Login />} />

        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
