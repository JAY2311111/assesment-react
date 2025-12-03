import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';

const PlanetDetail = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [planet, setPlanet] = useState(null);

    useEffect(() => {
        const fetchPlanet = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`https://swapi.dev/api/planets/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch planet');
                }
                const data = await response.json();
                setPlanet(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPlanet();
    }, [id]);

    return (
        <div style={{maxWidth: 800, margin: '20px auto', padding: '0 16px'}}>
            <Link to="/planets" style={{display: 'inline-block', marginBottom: '16px'}}>
                &larr; Back to planets
            </Link>

            {loading && (
                <div style={{backgroundColor: '#111827', color: '#e5e7eb', padding: 24, borderRadius: 8}}>
                    <h2>Loading planet...</h2>
                </div>
            )}

            {error && !loading && (
                <div style={{backgroundColor: '#fee2e2', padding: 16, borderRadius: 8}}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!loading && !error && planet && (
                <div
                    style={{
                        background: 'linear-gradient(135deg,#0f172a,#020617)',
                        color: '#e5e7eb',
                        padding: 24,
                        borderRadius: 12,
                        boxShadow: '0 10px 25px rgba(15,23,42,0.7)'
                    }}
                >
                    <h1 style={{marginTop: 0, marginBottom: 8, fontSize: 32}}>{planet.name}</h1>
                    <p style={{marginTop: 0, marginBottom: 16, color: '#9ca3af'}}>Planet overview</p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                            gap: 16
                        }}
                    >
                        <div>
                            <h3>Environment</h3>
                            <p><strong>Climate:</strong> {planet.climate}</p>
                            <p><strong>Terrain:</strong> {planet.terrain}</p>
                            <p><strong>Surface Water:</strong> {planet.surface_water}</p>
                        </div>
                        <div>
                            <h3>Population</h3>
                            <p><strong>Population:</strong> {planet.population}</p>
                            <p><strong>Gravity:</strong> {planet.gravity}</p>
                        </div>
                        <div>
                            <h3>Orbital</h3>
                            <p><strong>Rotation Period:</strong> {planet.rotation_period}</p>
                            <p><strong>Orbital Period:</strong> {planet.orbital_period}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlanetDetail;


