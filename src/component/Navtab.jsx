import React from 'react';
import { Link, useLocation } from 'react-router-dom';  // Import Link and useLocation

const Navtab = () => {
    const location = useLocation(); // Hook to get current location

    return (
        <ul className="nav nav-tabs justify-content-center container nav-justified">
            <li className="nav-item">
                <Link
                    to="/"
                    className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                    aria-current={location.pathname === '/' ? 'page' : undefined}
                >
                    Overview
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/intensity"
                    className={`nav-link ${location.pathname === '/intensity' ? 'active' : ''}`}
                >
                    Intensity
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/topicdistribution"
                    className={`nav-link ${location.pathname === '/topicdistribution' ? 'active' : ''}`}
                >
                    Topic Distribution
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/trendsoveryears"
                    className={`nav-link ${location.pathname === '/trendsoveryears' ? 'active' : ''}`}
                >
                    Trends Over Years
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/heatmap"
                    className={`nav-link ${location.pathname === '/heatmap' ? 'active' : ''}`}
                >
                    Heatmap
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/bubblechart"
                    className={`nav-link ${location.pathname === '/bubblechart' ? 'active' : ''}`}
                >
                    Bubble Chart
                </Link>
            </li>
        </ul>
    );
};

export default Navtab;