import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';

const VehicleDetail = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vehicle, setVehicle] = useState(null);

    useEffect(() => {
        const fetchVehicle = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`https://swapi.dev/api/vehicles/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch vehicle');
                }
                const data = await response.json();
                setVehicle(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchVehicle();
    }, [id]);

    return (
        <div style={{maxWidth: 900, margin: '20px auto', padding: '0 16px'}}>
            <Link to="/vehicles" style={{display: 'inline-block', marginBottom: '16px'}}>
                &larr; Back to vehicles
            </Link>

            {loading && (
                <div style={{backgroundColor: '#111827', color: '#e5e7eb', padding: 24, borderRadius: 8}}>
                    <h2>Loading vehicle...</h2>
                </div>
            )}

            {error && !loading && (
                <div style={{backgroundColor: '#fee2e2', padding: 16, borderRadius: 8}}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!loading && !error && vehicle && (
                <div
                    style={{
                        background: 'linear-gradient(135deg,#0f172a,#020617)',
                        color: '#e5e7eb',
                        padding: 24,
                        borderRadius: 12,
                        boxShadow: '0 10px 25px rgba(15,23,42,0.7)'
                    }}
                >
                    <h1 style={{marginTop: 0, marginBottom: 8, fontSize: 32}}>{vehicle.name}</h1>
                    <p style={{marginTop: 0, marginBottom: 16, color: '#9ca3af'}}>Model: {vehicle.model}</p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: 16
                        }}
                    >
                        <div>
                            <h3>Specs</h3>
                            <p><strong>Manufacturer:</strong> {vehicle.manufacturer}</p>
                            <p><strong>Cost:</strong> {vehicle.cost_in_credits} credits</p>
                            <p><strong>Length:</strong> {vehicle.length}</p>
                            <p><strong>Max Speed:</strong> {vehicle.max_atmosphering_speed}</p>
                        </div>
                        <div>
                            <h3>Crew & Capacity</h3>
                            <p><strong>Crew:</strong> {vehicle.crew}</p>
                            <p><strong>Passengers:</strong> {vehicle.passengers}</p>
                            <p><strong>Cargo Capacity:</strong> {vehicle.cargo_capacity}</p>
                            <p><strong>Consumables:</strong> {vehicle.consumables}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VehicleDetail;


