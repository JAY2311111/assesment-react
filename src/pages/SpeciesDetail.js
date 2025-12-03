import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';

const SpeciesDetail = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [species, setSpecies] = useState(null);

    useEffect(() => {
        const fetchSpecies = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`https://swapi.dev/api/species/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch species');
                }
                const data = await response.json();
                setSpecies(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchSpecies();
    }, [id]);

    return (
        <div style={{maxWidth: 800, margin: '20px auto', padding: '0 16px'}}>
            <Link to="/species" style={{display: 'inline-block', marginBottom: '16px'}}>
                &larr; Back to species
            </Link>

            {loading && (
                <div style={{backgroundColor: '#111827', color: '#e5e7eb', padding: 24, borderRadius: 8}}>
                    <h2>Loading species...</h2>
                </div>
            )}

            {error && !loading && (
                <div style={{backgroundColor: '#fee2e2', padding: 16, borderRadius: 8}}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!loading && !error && species && (
                <div
                    style={{
                        background: 'linear-gradient(135deg,#0f172a,#020617)',
                        color: '#e5e7eb',
                        padding: 24,
                        borderRadius: 12,
                        boxShadow: '0 10px 25px rgba(15,23,42,0.7)'
                    }}
                >
                    <h1 style={{marginTop: 0, marginBottom: 8, fontSize: 32}}>{species.name}</h1>
                    <p style={{marginTop: 0, marginBottom: 16, color: '#9ca3af'}}>Species overview</p>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                            gap: 16
                        }}
                    >
                        <div>
                            <h3>Biology</h3>
                            <p><strong>Classification:</strong> {species.classification}</p>
                            <p><strong>Designation:</strong> {species.designation}</p>
                            <p><strong>Average Height:</strong> {species.average_height}</p>
                            <p><strong>Skin Colors:</strong> {species.skin_colors}</p>
                            <p><strong>Hair Colors:</strong> {species.hair_colors}</p>
                            <p><strong>Eye Colors:</strong> {species.eye_colors}</p>
                        </div>
                        <div>
                            <h3>Lifecycle</h3>
                            <p><strong>Average Lifespan:</strong> {species.average_lifespan}</p>
                            <p><strong>Language:</strong> {species.language}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SpeciesDetail;


