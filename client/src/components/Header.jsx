import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Header.css';

const Header = ({ onSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (onSearch) onSearch(term);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header-metal">
      <div className="logo">
        <Link to="/">⚡ RiffVault</Link>
      </div>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Buscar bandas o canciones..." 
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="user-menu">
        {user ? (
          <>
            <span className="welcome">Hola, {user.name}</span>
            {user.role === 'admin' && <Link to="/admin" className="btn-admin">Admin Panel</Link>}
            <button onClick={handleLogout} className="btn-logout">Salir</button>
          </>
        ) : (
          <div className="auth-links">
            <Link to="/login" className="btn-auth">Login</Link>
            <Link to="/register" className="btn-auth">Registro</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
