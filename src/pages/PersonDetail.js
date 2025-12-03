import React, {useEffect, useState} from 'react';
import {useParams, Link} from 'react-router-dom';

const PersonDetail = () => {
    const {id} = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [person, setPerson] = useState(null);

    const fetchPerson = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`https://swapi.dev/api/people/${id}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch person');
            }
            const data = await response.json();
            setPerson(data);
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPerson();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div style={{margin: '10px'}}>
            <Link to="/people" style={{display: 'inline-block', marginBottom: '16px'}}>
                &larr; Back to people
            </Link>

            {loading && (
                <div style={{backgroundColor: '#eee', padding: '16px', borderRadius: '4px'}}>
                    <h2>Loading person...</h2>
                </div>
            )}

            {error && !loading && (
                <div style={{backgroundColor: '#ffdddd', padding: '16px', borderRadius: '4px'}}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!loading && !error && person && (
                <div
                    style={{
                        backgroundColor: '#f8f8f8',
                        padding: '16px',
                        borderRadius: '4px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}
                >
                    <h1 style={{marginTop: 0}}>{person.name}</h1>
                    <p><strong>Height:</strong> {person.height}</p>
                    <p><strong>Mass:</strong> {person.mass}</p>
                    <p><strong>Hair Color:</strong> {person.hair_color}</p>
                    <p><strong>Skin Color:</strong> {person.skin_color}</p>
                    <p><strong>Eye Color:</strong> {person.eye_color}</p>
                    <p><strong>Birth Year:</strong> {person.birth_year}</p>
                    <p><strong>Gender:</strong> {person.gender}</p>
                </div>
            )}
        </div>
    );
};

export default PersonDetail;
