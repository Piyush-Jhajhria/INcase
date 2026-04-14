
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import CaseStudies from './pages/CaseStudies';
import UserDashboard from './pages/UserDashboard';
import EmergencyInfoDisplay from './pages/EmergencyInfoDisplay';
import EmergencyInfoViewer from './pages/EmergencyInfoViewer';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn-more" element={<CaseStudies />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/emergency/:id" element={<EmergencyInfoDisplay />} />
          <Route path="/emergency-view/:id" element={<EmergencyInfoViewer />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;