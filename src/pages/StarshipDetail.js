import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';

const StarshipDetail = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [starship, setStarship] = useState(null);

    useEffect(() => {
        const fetchStarship = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`https://swapi.dev/api/starships/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch starship');
                }
                const data = await response.json();
                setStarship(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchStarship();
    }, [id]);

    return (
        <div style={{maxWidth: 900, margin: '20px auto', padding: '0 16px'}}>
            <Link to="/starships" style={{display: 'inline-block', marginBottom: '16px'}}>
                &larr; Back to starships
            </Link>

            {loading && (
                <div style={{backgroundColor: '#111827', color: '#e5e7eb', padding: 24, borderRadius: 8}}>
                    <h2>Loading starship...</h2>
                </div>
            )}

            {error && !loading && (
                <div style={{backgroundColor: '#fee2e2', padding: 16, borderRadius: 8}}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!loading && !error && starship && (
                <div
                    style={{
                        background: 'linear-gradient(135deg,#0f172a,#020617)',
                        color: '#e5e7eb',
                        padding: 24,
                        borderRadius: 12,
                        boxShadow: '0 10px 25px rgba(15,23,42,0.7)'
                    }}
                >
                    <h1 style={{marginTop: 0, marginBottom: 8, fontSize: 32}}>{starship.name}</h1>
                    <p style={{marginTop: 0, marginBottom: 16, color: '#9ca3af'}}>Model: {starship.model}</p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: 16
                        }}
                    >
                        <div>
                            <h3>Specs</h3>
                            <p><strong>Manufacturer:</strong> {starship.manufacturer}</p>
                            <p><strong>Cost:</strong> {starship.cost_in_credits} credits</p>
                            <p><strong>Length:</strong> {starship.length}</p>
                            <p><strong>Max Speed:</strong> {starship.max_atmosphering_speed}</p>
                            <p><strong>Hyperdrive Rating:</strong> {starship.hyperdrive_rating}</p>
                            <p><strong>MGLT:</strong> {starship.MGLT}</p>
                        </div>
                        <div>
                            <h3>Crew & Capacity</h3>
                            <p><strong>Crew:</strong> {starship.crew}</p>
                            <p><strong>Passengers:</strong> {starship.passengers}</p>
                            <p><strong>Cargo Capacity:</strong> {starship.cargo_capacity}</p>
                            <p><strong>Consumables:</strong> {starship.consumables}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StarshipDetail;


