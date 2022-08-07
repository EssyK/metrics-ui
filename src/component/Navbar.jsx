import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar () {
  return (
    <div className="nav-link p-1">
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <NavLink className="navbar-brand nav-link" to="/">
            Metrics Visualization
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/configure-metrics">
                  Configure Metrics
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <nav></nav>
    </div>
  )
}

export default Navbar
