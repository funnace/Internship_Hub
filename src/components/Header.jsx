import React from 'react';

export default function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: '#111111' }}>
            <div className="m-2 container-fluid">
                <a className="navbar-brand" href="/">
                <span style={{ color: 'white', height: '50px', fontSize: '1.4rem' }}>InternshipHub</span>
                </a>
            </div>
        </nav>
    );
}