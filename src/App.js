import './App.css'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { useAuthContext } from './Hooks/useAuthContext';
import { useEffect } from 'react';
import OnlineUsers from './components/onlineUsers/onlineUsers';

const PrivateRoute = (Component) => {
  const { user } = useAuthContext();
  const navigate = useNavigate()
  const location = useLocation()


  useEffect(() => {
    const publicRoutes = ['/login', '/signup']
    if (!user && publicRoutes.includes(location.pathname)) {
      navigate('/login')
    }
  }, [location, navigate, user])

  return Component
}

function App() {
  const { user } = useAuthContext();
  return (
    <div className="App">
      {user && <Sidebar />}
      <div className='container'>
        <Navbar />
        <Routes>
          <Route path='/' element={PrivateRoute(<Dashboard />)} />
          <Route path='/create' element={PrivateRoute(<Create />)} />
          <Route path='/project/:id' element={PrivateRoute(<Project />)} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
      {user && <OnlineUsers />}
    </div>
  );
}

export default App
