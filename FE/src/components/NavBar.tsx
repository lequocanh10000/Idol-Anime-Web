import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.tsx';

export function NavBar() {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="nav">
      <div className="nav__brand" onClick={() => navigate('/anime')} role="button" tabIndex={0}>
        Idol Anime
      </div>
      <nav className="nav__links">
        <NavLink to="/anime">Anime</NavLink>
        <NavLink to="/characters">Nhân vật</NavLink>
        {isAdmin && <NavLink to="/users">Người dùng</NavLink>}
      </nav>
      <span className="pill">{isAdmin ? 'ADMIN' : 'USER'}</span>
      <button
        className="btn btn--ghost"
        onClick={() => {
          logout();
          navigate('/login');
        }}
      >
        Đăng xuất
      </button>
    </header>
  );
}
