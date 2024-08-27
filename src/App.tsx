import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from '@/components/core/nav-bar.tsx';
import HomePage from '@/news/pages/HomePage.tsx';
import Settings from '@/news/pages/Settings.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}
