import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/footer";
import Home from "./pages/Home";
import About from "./pages/About";
import FindCar from "./pages/FindCar";
import Contact from "./pages/Contact";
import Book from "./pages/Book";
import Login from "./pages/Login";
import { Register } from "./pages/register";
import Dashboard from "./pages/dashboard";
import MyBookings from "./pages/MyBookings";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Findcar" element={<FindCar />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/details" component={<MyBookings />} />
        
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
