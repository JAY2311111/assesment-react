import {NavLink} from "react-router-dom";

function Menu(){
    const linkStyle = {
        color: '#e5e7eb',
        textDecoration: 'none',
        padding: '8px 12px',
        borderRadius: '999px',
        fontSize: '0.95rem'
    };

    return <header style={{
        background: 'linear-gradient(90deg,#020617,#111827,#020617)',
        padding: '12px 24px',
        marginBottom: '16px',
        boxShadow: '0 10px 25px rgba(15,23,42,0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    }}>
        <div style={{color: '#e5e7eb', fontWeight: 600, fontSize: '1.1rem'}}>
            Star Wars Explorer
        </div>
        <nav style={{display: 'flex', gap: '8px', flexWrap: 'wrap'}}>
            <NavLink exact to="/" style={linkStyle}>
                Home
            </NavLink>
            <NavLink to="/people" style={linkStyle}>
                People
            </NavLink>
            <NavLink to="/planets" style={linkStyle}>
                Planets
            </NavLink>
            <NavLink to="/films" style={linkStyle}>
                Films
            </NavLink>
            <NavLink to="/species" style={linkStyle}>
                Species
            </NavLink>
            <NavLink to="/vehicles" style={linkStyle}>
                Vehicles
            </NavLink>
            <NavLink to="/starships" style={linkStyle}>
                Starships
            </NavLink>
        </nav>
    </header>
}

export default Menu;