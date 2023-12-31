import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    
    function handleLogout(){
        localStorage.removeItem('token');
        navigate("/login");    
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className={`nav-link ${(location.pathname==='/')?"active":""}`} aria-current="page" to="/">Home</Link>
                        <Link className={`nav-link ${(location.pathname === '/about') ? "active" : ""}`} to="/about">About</Link>
                    </div>
                </div>
                {!localStorage.getItem('token')?<form className="form-inline">
                    <Link className="btn btn-outline-light mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-outline-light mx-1" to="/signup" role="button">Signup</Link>
                </form>:<form className="form-inline">
                        <button className="btn btn-outline-light mx-1" onClick={handleLogout} role="button">Logout</button>
                    </form>}
            </div>
        </nav>
    )
}

export default Navbar;
