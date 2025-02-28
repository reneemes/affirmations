import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Welcome from './welcome/welcome';
import Footer from './footer/Footer';
import Affirmations from './affirmations/Affirmations';

export default function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/affirmations" element={<Affirmations />} />
      </Routes>
      <Footer />
    </Router>
  );
}
