import './App.css'
import { Outlet, useLocation } from 'react-router-dom'
import { NavBar } from './components/NavBar.tsx'

function App() {
  const location = useLocation();
  const hideNav = location.pathname === '/login';

  return (
    <div className="layout">
      {!hideNav && <NavBar />}
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}

export default App
