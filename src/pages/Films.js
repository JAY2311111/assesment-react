import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Films = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [films, setFilms] = useState([]);

    const fetchFilms = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch('https://swapi.dev/api/films/');
            if (!response.ok) {
                throw new Error('Failed to fetch films');
            }
            const data = await response.json();
            setFilms(data.results || []);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFilms();
    }, []);

    return (
        <div style={{margin: '10px'}}>
            <h1>Films</h1>

            {loading && (
                <div style={{backgroundColor: '#eee', padding: '16px', borderRadius: '4px'}}>
                    <h2>Loading...</h2>
                </div>
            )}

            {error && !loading && (
                <div style={{backgroundColor: '#ffdddd', padding: '16px', borderRadius: '4px', marginBottom: '16px'}}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!loading && !error && (
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                        gap: '12px'
                    }}
                >
                    {films.map((film) => {
                        // swapi.dev film URLs look like /api/films/1/
                        const idFromUrl = film.url
                            ? film.url.split('/').filter(Boolean).slice(-1)[0]
                            : film.episode_id;
                        return (
                            <Link
                                key={film.episode_id}
                                to={`/films/${idFromUrl}`}
                                style={{textDecoration: 'none', color: 'inherit'}}
                            >
                                <div
                                    style={{
                                        backgroundColor: '#020617',
                                        color: '#e5e7eb',
                                        padding: '16px',
                                        borderRadius: '8px',
                                        boxShadow: '0 8px 20px rgba(15,23,42,0.6)',
                                        border: '1px solid #1f2937'
                                    }}
                                >
                                    <h2 style={{marginTop: 0}}>{film.title}</h2>
                                    <p><strong>Episode:</strong> {film.episode_id}</p>
                                    <p><strong>Director:</strong> {film.director}</p>
                                    <p><strong>Release Date:</strong> {film.release_date}</p>
                                </div>
                            </Link>
                        );
                    })}
                    {!films.length && (
                        <p>No films found.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Films;


