import React from "react";
import { Outlet, Link } from "react-router-dom";

const Index = () => {
    const logout= () => {
        localStorage.clear('')
            window.location.href='/'
    }
    if (localStorage.getItem('token') != null) {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="#">Navbar</Link>
                        <button className="navbar-toggler" type="button" data-bs-togle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" /> 
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                            <Link className="nav-link active" to="/admin/home">Home</Link>
                                <Link className="nav-link" to="/admin/user">User</Link>
                            </div>
                        </div>
                        <span className="d-flex">
                            <button onClick={logout} className="btn btn-primary" href="/logout">Logout</button>
                        </span>
                    </div>
                </nav>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>

        );
    }

}

export default Index;