import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';

const FilmDetail = () => {
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [film, setFilm] = useState(null);

    useEffect(() => {
        const fetchFilm = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetch(`https://swapi.dev/api/films/${id}/`);
                if (!response.ok) {
                    throw new Error('Failed to fetch film');
                }
                const data = await response.json();
                setFilm(data);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchFilm();
    }, [id]);

    return (
        <div style={{maxWidth: 900, margin: '20px auto', padding: '0 16px'}}>
            <Link to="/films" style={{display: 'inline-block', marginBottom: '16px'}}>
                &larr; Back to films
            </Link>

            {loading && (
                <div style={{backgroundColor: '#111827', color: '#e5e7eb', padding: 24, borderRadius: 8}}>
                    <h2>Loading film...</h2>
                </div>
            )}

            {error && !loading && (
                <div style={{backgroundColor: '#fee2e2', padding: 16, borderRadius: 8}}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!loading && !error && film && (
                <div
                    style={{
                        background: 'linear-gradient(135deg,#0f172a,#020617)',
                        color: '#e5e7eb',
                        padding: 24,
                        borderRadius: 12,
                        boxShadow: '0 10px 25px rgba(15,23,42,0.7)'
                    }}
                >
                    <h1 style={{marginTop: 0, marginBottom: 8, fontSize: 32}}>{film.title}</h1>
                    <p style={{marginTop: 0, marginBottom: 16, color: '#9ca3af'}}>
                        Episode {film.episode_id} • Directed by {film.director} • {film.release_date}
                    </p>
                    <h3>Opening Crawl</h3>
                    <p style={{whiteSpace: 'pre-wrap', lineHeight: 1.5}}>{film.opening_crawl}</p>
                    <div style={{marginTop: 24, display: 'flex', gap: 24, flexWrap: 'wrap'}}>
                        <div>
                            <h3>Production</h3>
                            <p><strong>Producer:</strong> {film.producer}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilmDetail;


