import Topbar from "./components/topbar/Topbar";
import Home from './pages/home/Home';
import Single from './pages/single/single';
import Write from './pages/write/Write';
import Settings from './pages/settings/Settings';
import Login from './pages/login/Login';
import Register from "./pages/register/Register";
import { useContext } from 'react';
import { Context } from './context/Context';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const {user} = useContext(Context);

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route  path="/" element={<Home />} />
        <Route path="/register" element={user ? <Home /> : <Register />} />
        <Route path="/login" element={user ? <Home /> : <Login />} />
        <Route path="/post/:id" element={<Single/>}/>
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element= {user ? <Settings /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
