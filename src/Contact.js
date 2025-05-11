import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { databases } from "./Appwrite";
import { Query } from "appwrite";
import "./contact.css";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const pincode = searchParams.get("pincode");
  const location = searchParams.get("location") || "Unknown Location";
  const estimate = searchParams.get("estimate") || "₹0/sq.ft";
  const area = searchParams.get("area") || "--";
  const [loading, setLoading] = useState(true);
  const [agentNumber, setAgentNumber] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAgentsByPincode(pincode);
    }, 3000); // Reduced to 3 seconds for faster response

    return () => clearTimeout(timer);
  }, [pincode]);

  const fetchAgentsByPincode = async (pincode) => {
    try {
      const response = await databases.listDocuments(
        process.env.REACT_APP_APPWRITE_DB_ID,
        "681e03b500105822c496",
        [Query.equal("pincode_served", parseInt(pincode))]
      );

      if (response.documents.length > 0) {
        // Find agent with minimum offer count
        const sortedAgents = response.documents.sort((a, b) => a.offercount - b.offercount);
        const selectedAgent = sortedAgents[0];

        // Increment offer count
        await databases.updateDocument(
          process.env.REACT_APP_APPWRITE_DB_ID,
          "681e03b500105822c496",
          selectedAgent.$id,
          { offercount: selectedAgent.offercount + 1 }
        );

        setAgentNumber(selectedAgent.phone);
      } else {
        alert("No agents found for this pincode.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
      alert("Failed to contact agent. Try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (agentNumber) {
      const whatsappUrl = `https://wa.me/${agentNumber}?text=${encodeURIComponent(
        `Hi, I found You using Truebhoomi and I am interested in selling my land in ${location} with an estimated price of ${estimate} per sq.ft and total area of ${area} sq.ft. Please contact me for further details.`
      )}`;

      window.location.href = whatsappUrl;
    }
  }, [agentNumber, location, estimate, area]);

  return (
    <div className="contact-container">
      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Contacting agent for pincode {pincode}...</p>
        </div>
      ) : (
        <div className="whatsapp-container">
          <p>Redirecting to WhatsApp...</p>
        </div>
      )}
    </div>
  );
};

export default Contact;
