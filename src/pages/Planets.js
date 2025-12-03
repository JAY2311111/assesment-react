import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const Planets = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [planets, setPlanets] = useState([]);
    const [search, setSearch] = useState("");

    const itemsPerPage = 10;

    const fetchPlanets = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append('page', page);
            if (search.trim() !== "") {
                params.append('search', search.trim());
            }

            const response = await fetch(`https://swapi.dev/api/planets/?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch planets');
            }
            const data = await response.json();

            const count = data.count || 0;
            const results = data.results || [];

            setPlanets(results);
            setTotalItems(count);
            setTotalPages(count ? Math.ceil(count / itemsPerPage) : 1);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlanets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search]);

    const handlePrev = () => setPage(prev => prev > 1 ? prev - 1 : prev);
    const handleNext = () => setPage(prev => prev < totalPages ? prev + 1 : prev);
    const handleSearchChange = (e) => {
        setPage(1);
        setSearch(e.target.value);
    };

    return (
        <div style={{margin: '10px'}}>
            <h1>Planets</h1>

            <div style={{marginBottom: '16px'}}>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search planets"
                    style={{padding: '8px', width: '250px', marginRight: '8px'}}
                />
            </div>

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
                <>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                            gap: '12px'
                        }}
                    >
                        {planets.map((planet) => {
                            const idFromUrl = planet.url
                                ? planet.url.split('/').filter(Boolean).slice(-1)[0]
                                : '';
                            return (
                                <Link
                                    key={planet.name}
                                    to={`/planets/${idFromUrl}`}
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
                                        <h2 style={{marginTop: 0}}>{planet.name}</h2>
                                        <p><strong>Climate:</strong> {planet.climate}</p>
                                        <p><strong>Terrain:</strong> {planet.terrain}</p>
                                        <p><strong>Population:</strong> {planet.population}</p>
                                    </div>
                                </Link>
                            );
                        })}
                        {!planets.length && (
                            <p>No planets found for this page/search.</p>
                        )}
                    </div>

                    <div
                        style={{
                            marginTop: '16px',
                            padding: '12px',
                            backgroundColor: '#f0f0f0',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap'
                        }}
                    >
                        <div>
                            <button onClick={handlePrev} disabled={page === 1}>
                                Previous
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={page >= totalPages}
                                style={{marginLeft: '8px'}}
                            >
                                Next
                            </button>
                        </div>
                        <div>
                            <span>Page {page} of {totalPages}</span>
                            <span style={{marginLeft: '12px'}}>Total Items: {totalItems}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Planets;


