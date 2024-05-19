import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Use to get route parameters

const IdolProfile = () => {
    const { name } = useParams(); // Get stage name from the route
    const [idol, setIdol] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchIdol = async () => {
            try {
                const response = await axios.get(`/api/idols/${name}`);
                if (response.data.idols.length === 0) {
                    setError('Idol not found');
                } else {
                    setIdol(response.data.idols[0]); // Assume only one result
                }
            } catch (err) {
                setError(`Error fetching idol profile: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchIdol();
    }, [name]); // Dependency on the route parameter

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!idol) {
        return <div>Idol profile not available</div>; // Fallback message
    }

    return (
        <div>
            <h2>{idol.stage_name}'s Profile</h2>
            <p>Full Name: {idol.full_name}</p>
            <p>Korean Name: {idol.korean_name}</p>
            <p>Korean Stage Name: {idol.k_stage_name}</p>
            <p>Date of Birth: {idol.date_of_birth}</p>
            <p>Group Name: {idol.group_name ? (
                <Link to={`/groups/${idol.group_name}`}>{idol.group_name}</Link>
            ) : (
                'N/A' // If there's no group name, display "N/A"
            )}</p>
            <p>Country: {idol.country}</p>
            <p>Birthplace: {idol.birthplace}</p>
            <p>Other Group: {idol.other_group}</p>
            <p>Gender: {idol.gender}</p>
        </div>
    );
};

export default IdolProfile;
