import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className={`navbar fixed-top navbar-expand-lg navbar-${this.props.mode} bg-${this.props.mode} shadow`}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/general">The Byte Times</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item"><Link className="nav-link" to="/general">Home</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/entertainment">Entertainment</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/business">Business</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/health">Health</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/science">Science</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/sports">Sports</Link></li>
                <li className="nav-item"><Link className="nav-link" to="/technology">Technology</Link></li>
              </ul>

              <div className="form-check form-switch">
                <input
                  className={`form-check-input text-${this.props.mode === 'light' ? 'dark' : 'light'}`}
                  onClick={this.props.toggleMode}
                  type="checkbox"
                  role="switch"
                  id="switchCheckDefault"
                />
                <label
                  className={`form-check-label text-${this.props.mode === 'light' ? 'dark' : 'light'}`}
                  htmlFor="switchCheckDefault"
                >
                  Dark Mode
                </label>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
