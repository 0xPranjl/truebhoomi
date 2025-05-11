import React, { useState } from 'react';
import { Client, Databases, ID, Query } from 'appwrite';

const Agent = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        pincode_served: ''
    });

    const client = new Client();
    const databases = new Databases(client);

    // Initialize Appwrite client
    client
        .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT)
        .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, phone, pincode_served } = formData;

        // Validation: Check phone number length
        if (phone.length !== 10) {
            alert('Phone number must be exactly 10 digits.');
            return;
        }
        e.preventDefault();


        // Validation: Check phone number length
        if (phone.length !== 10) {
            alert('Phone number must be exactly 10 digits.');
            return;
        }

        try {
            // Check if phone number already exists
            const existingDocuments = await databases.listDocuments(
                process.env.REACT_APP_APPWRITE_DB_ID,
                '681e03b500105822c496',
                [Query.equal('phone', phone)]
            );

            if (existingDocuments.total > 0) {
                alert('Phone number already registered.');
                return;
            }

            // Create new document
            await databases.createDocument(
                process.env.REACT_APP_APPWRITE_DB_ID,
                '681e03b500105822c496',
                ID.unique(),
                {
                    name,
                    phone,
                    pincode_served: parseInt(pincode_served),
                    offercount:0
                }
            );

                        // Save name and phone to localStorage
            localStorage.setItem('agentName', name);
            localStorage.setItem('agentPhone', phone);

            // Redirect to AgentPlan page
            window.location.href = '/agentplan';

            alert('Registration successful!');
            setFormData({ name: '', phone: '', pincode_served: '' });
            
        } catch (error) {
            console.error('Error saving data:', error);
            alert('Failed to register. Please try again.');
        }
    };

    return (
        <div className="container mt-5">
            <h1  style={{color:"white"}}>Agent Registration</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label" style={{color:"white"}}>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label"  style={{color:"white"}}>Phone</label>
                    <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        maxLength="10"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="pincode_served" className="form-label"  style={{color:"white"}}>Pincode Served</label>
                    <input
                        type="number"
                        className="form-control"
                        id="pincode_served"
                        name="pincode_served"
                        value={formData.pincode_served}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default Agent;
