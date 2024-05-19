import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const GroupList = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Fetch all groups initially
    useEffect(() => {
        const fetchGroups = async () => {
            setLoading(true);
            try {
                const boyGroupRes = await axios.get('/api/boy-groups');
                const girlGroupRes = await axios.get('/api/girl-groups');
                const boyGroups = boyGroupRes.data.boyGroups || [];
                const girlGroups = girlGroupRes.data.girlGroups || [];
                setGroups([...boyGroups, ...girlGroups]);
                setLoading(false);
            } catch (error) {
                // console.error('Error fetching groups:', error);
                setError('Error fetching groups');
                setLoading(false);
            }
        };
        fetchGroups();
    }, []);

    // Handle search form submission
    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form behavior
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/api/groups/${searchTerm}`);
            const fetchedGroups = response.data.allGroups || [];

            if (fetchedGroups.length === 0) {
                setError('Sorry! No groups found 😢. Our Team is hard at work adding new groups everyday!');
            }

            setGroups(fetchedGroups);
            setLoading(false);
        } catch (err) {
            console.error('Error searching groups:', err);
            if (err.response && err.response.status === 404) {
                setError('Sorry! No groups found 😢. Our Team is hard at work adding new groups everyday!');
            } else {
                setError(`Error searching groups: ${err.message}`);
            }
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Group List</h2>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search by group name"
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
                    {error.includes('No groups found') && (
                        <>
                            <br />
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
                    {groups.map((group) => (
                        <li key={group.group_name}>
                            <p>
                                <strong>Group Name: </strong>
                                <Link to={`/groups/${group.group_name}`}>{group.group_name}</Link>
                            </p>
                            <p>Short: {group.short || 'N/A'}</p>
                            <p>Korean Name: {group.korean_name || 'N/A'}</p>
                            <p>Debut: {group.debut || 'N/A'}</p>
                            <p>Company: {group.company || 'N/A'}</p>
                            <p>Members: {group.members || 'N/A'}</p>
                            <p>Original Members: {group.original_memb || 'N/A'}</p>
                            <p>Fanclub Name: {group.fanclub_name || 'N/A'}</p>
                            <p>Active: {group.active || 'N/A'}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default GroupList;

