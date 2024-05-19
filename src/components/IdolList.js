import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for hyperlinking

const IdolList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [idols, setIdols] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchIdols = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/idols');
                setIdols(response.data.idols);
                setLoading(false);
            } catch (error) {
                setError('Error fetching idols');
                setLoading(false);
            }
        };
        fetchIdols();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form behavior
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/idols/${searchTerm}`);
            const fetchedIdols = response.data.idols || [];

            if (fetchedIdols.length === 0) {
                setError('Sorry! No idols found 😢. Would you like to add one?'); // Custom message
            }

            setIdols(fetchedIdols);
            setLoading(false);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError('Sorry! No idols found 😢. Would you like to add one?'); // Custom 404 message
            } else {
                setError(`Error searching idols: ${err.message}`); // General error message
            }
            setLoading(false);
        }
    };

    const handleAddIdol = () => {
        navigate('/idols/add'); // Redirects to Add Idol page
    };

    return (
        <div>
            <h2>Idol List</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by idol name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>
                    <br />
                    {error}
                    {error.includes('No idols found') && (
                        <>
                            <br />
                            <button onClick={handleAddIdol}>Add Idol</button>
                            <br />
                            <img
                                src="https://pa1.aminoapps.com/7247/fb487526b9707cca74179e1ede5c1ad880b02246r1-480-270_hq.gif"
                                alt="Sorry GIF"
                            />
                        </>
                    )}
                </div>
            ) : (
                <ul>
                    {idols.map((idol) => (
                        <li key={idol.id}>
                            <p>
                                <strong>Stage Name: </strong>
                                <Link to={`/idols/${idol.stage_name}`}>{idol.stage_name}</Link> {/* Hyperlink */}
                            </p>
                            <p>Full Name: {idol.full_name}</p>
                            <p>Korean Name: {idol.korean_name}</p>
                            <p>Korean Stage Name: {idol.k_stage_name}</p>
                            <p>Date of Birth: {idol.date_of_birth}</p>
                            <p>
                                Group Name: {idol.group_name ? (
                                    <Link to={`/groups/${idol.group_name}`}>{idol.group_name}</Link>
                                ) : (
                                    'N/A' // If there's no group name, display "N/A"
                                )}
                            </p>
                            <p>Country: {idol.country}</p>
                            <p>Birthplace: {idol.birthplace}</p>
                            <p>Other Group: {idol.other_group}</p>
                            <p>Gender: {idol.gender}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default IdolList;


