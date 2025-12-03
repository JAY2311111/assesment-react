import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';

const People = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const [people, setPeople] = useState([]);

    const [search, setSearch] = useState("");

    const itemsPerPage = 10;

    const fetchPeople = async () => {
        try {
            setLoading(true);
            setError(null);

            const params = new URLSearchParams();
            params.append('page', page);
            if (search.trim() !== "") {
                params.append('search', search.trim());
            }

            const response = await fetch(`https://swapi.dev/api/people/?${params.toString()}`);
            if (!response.ok) {
                throw new Error('Failed to fetch people');
            }
            const data = await response.json();

            const count = data.count || 0;
            const results = data.results || [];

            setPeople(results);
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
        fetchPeople();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, search]);

    const handlePrev = () => {
        setPage((prev) => (prev > 1 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setPage((prev) => (prev < totalPages ? prev + 1 : prev));
    };

    const handleSearchChange = (e) => {
        setPage(1);
        setSearch(e.target.value);
    };

    return (
        <div style={{margin: '10px'}}>
            <h1>People</h1>

            <div style={{marginBottom: '16px'}}>
                <input
                    type="text"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search people (e.g. r2, luke, vader)"
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
                            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                            gap: '12px'
                        }}
                    >
                        {people.map((person) => (
                            <Link
                                key={person.id || person.url}
                                to={`/people/${person.id || (person.url ? person.url.split('/').filter(Boolean).slice(-1)[0] : '')}`}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }}
                            >
                                <div
                                    style={{
                                        backgroundColor: '#f8f8f8',
                                        padding: '12px',
                                        borderRadius: '4px',
                                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <h2 style={{marginTop: 0}}>{person.name}</h2>
                                    {person.gender && <p>Gender: {person.gender}</p>}
                                    {person.birth_year && <p>Birth Year: {person.birth_year}</p>}
                                </div>
                            </Link>
                        ))}
                        {!people.length && (
                            <p>No people found for this page/search.</p>
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

export default People;