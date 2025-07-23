import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';


function App() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Background Image Layer */}
      <div
        style={{
          backgroundImage: `url(./sea.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(2px)',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          zIndex: -1,
        }}
      />

      {/* Foreground Routing Layer */}
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
