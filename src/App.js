import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Project from './pages/project/Project';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import { useAuthContext } from './Hooks/useAuthContext';
import { useEffect } from 'react';

const PrivateRoute = (Component) => {
  const { user } = useAuthContext();
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate('/login')
  }, [navigate, user])

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
    </div>
  );
}

export default App
