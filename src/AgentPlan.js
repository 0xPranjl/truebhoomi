import React from 'react';
import './AgentPlan.css'; // Import the custom CSS file

const AgentPlan = () => {
    const plans = [
        {
            title: 'Beginner',
            price: 500,
            leads: 5,
            maxPrice: '30 lakhs'
        },
        {
            title: 'Intermediate',
            price: 1000,
            leads: 10,
            maxPrice: 'Unlimited'
        },
        {
            title: 'Advanced',
            price: 2000,
            leads: 30,
            maxPrice: 'Unlimited'
        }
    ];

    return (
        <div className="agent-plan-container">
            <h1 className="agent-plan-title">Select Your Agent Plan</h1>
            <div className="agent-plan-grid">
                {plans.map((plan, index) => (
                    <div key={index} className="plan-card">
                        <h2 className="plan-title">{plan.title} Plan</h2>
                        <div className="plan-details">
                            <p>Leads per month: <span className="font-bold">{plan.leads}</span></p>
                            <p>Max Price: <span className="font-bold">{plan.maxPrice}</span></p>
                        </div>
                        <p className="plan-price">₹{plan.price}/month</p>
                        <button className="select-plan-btn">Select Plan</button>
                        <div className="best-value">Best Value</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AgentPlan;
