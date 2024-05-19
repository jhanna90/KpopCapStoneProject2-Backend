import React, { useState } from 'react';
import axios from 'axios';

const IdolAdd = () => {
    // State variables for form inputs
    const [stageName, setStageName] = useState('');
    const [fullName, setFullName] = useState('');
    const [koreanName, setKoreanName] = useState('');
    const [kStageName, setKStageName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [groupName, setGroupName] = useState('');
    const [country, setCountry] = useState('');
    const [birthplace, setBirthplace] = useState('');
    const [otherGroup, setOtherGroup] = useState('');
    const [gender, setGender] = useState('');

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const newIdol = {
            stage_name: stageName,
            full_name: fullName,
            korean_name: koreanName,
            k_stage_name: kStageName,
            date_of_birth: dateOfBirth,
            group_name: groupName,
            country,
            birthplace,
            other_group: otherGroup,
            gender,
        };

        try {
            // Send a POST request to the backend to add the idol
            const response = await axios.post('/api/idols', newIdol);

            // Check if the response status is 201 (Created)
            if (response.status === 201) {
                // Redirect to the idol list page after adding
                window.location.href = '/idols';
            } else {
                console.error('Unexpected response:', response);
                alert('Failed to add idol. Unexpected response.');
            }
        } catch (error) {
            console.error('Error adding idol:', error.response?.data || error.message);
            alert('Failed to add idol. Please try again.');
        }
    };

    // // Render the form to add an idol
    // return (
    //     <div>
    //         <h2>Add a New Idol</h2>
    //         <form onSubmit={handleSubmit}>
    //             <div>
    //                 <label htmlFor='stageName'>Stage Name:</label>
    //                 <input
    //                     type="text"
    //                     value={stageName}
    //                     onChange={(e) => setStageName(e.target.value)}
    //                     required
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor='fullName'>Full Name:</label>
    //                 <input
    //                     type="text"
    //                     value={fullName}
    //                     onChange={(e) => setFullName(e.target.value)}
    //                     required
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor='koreanName'>Korean Name:</label>
    //                 <input
    //                     type="text"
    //                     value={koreanName}
    //                     onChange={(e) => setKoreanName(e.target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor='kStageName'>Korean Stage Name:</label>
    //                 <input
    //                     type="text"
    //                     value={kStageName}
    //                     onChange={(e) => setKStageName(e.target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor='dateOfBirth'>Date of Birth:</label>
    //                 <input
    //                     type="date"
    //                     value={dateOfBirth}
    //                     onChange={(e) => setDateOfBirth(e.target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor='groupName'>Group Name:</label>
    //                 <input
    //                     type="text"
    //                     value={groupName}
    //                     onChange={(e) => setGroupName(e.target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor='country'>Country:</label>
    //                 <input
    //                     type="text"
    //                     value={country}
    //                     onChange={(e) => setCountry(e.target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor='birthplace'>Birthplace:</label>
    //                 <input
    //                     type="text"
    //                     value={birthplace}
    //                     onChange={(e) => setBirthplace(e.target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor='otherGroup'>Other Group:</label>
    //                 <input
    //                     type="text"
    //                     value={otherGroup}
    //                     onChange={(e) => setOtherGroup(e.target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 <label htmlFor='gender'>Gender:</label>
    //                 <input
    //                     type="text"
    //                     value={gender}
    //                     onChange={(e) => setGender(e.target.value)}
    //                 />
    //             </div>
    //             <button type="submit">Add Idol</button>
    //         </form>
    //     </div>
    // );

    // Render the form to add an idol
    return (
        <div>
            <h2>Add a New Idol</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="stageName">Stage Name:</label>
                    <input
                        id="stageName"
                        type="text"
                        value={stageName}
                        onChange={(e) => setStageName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        id="fullName"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="koreanName">Korean Name:</label>
                    <input
                        id="koreanName"
                        type="text"
                        value={koreanName}
                        onChange={(e) => setKoreanName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="kStageName">Korean Stage Name:</label>
                    <input
                        id="kStageName"
                        type="text"
                        value={kStageName}
                        onChange={(e) => setKStageName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
                    <input
                        id="dateOfBirth"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="groupName">Group Name:</label>
                    <input
                        id="groupName"
                        type="text"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        id="country"
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="birthplace">Birthplace:</label>
                    <input
                        id="birthplace"
                        type="text"
                        value={birthplace}
                        onChange={(e) => setBirthplace(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="otherGroup">Other Group:</label>
                    <input
                        id="otherGroup"
                        type="text"
                        value={otherGroup}
                        onChange={(e) => setOtherGroup(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="gender">Gender:</label>
                    <input
                        id="gender"
                        type="text"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    />
                </div>
                <button type="submit">Add Idol</button>
            </form>
        </div>
    );
};

export default IdolAdd;

