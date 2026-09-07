// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import WhatsAppButton from '../src/Pages/WhatsappButton';
import Home from './Pages/Home';
import About from './Pages/About';
import Services from './Pages/Service';
import Projects from './Pages/Projects';
import Subsidy from './Pages/Subsidy';
import Gallery from './Pages/Gallery';
import Contact from './Pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/subsidy" element={<Subsidy />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;