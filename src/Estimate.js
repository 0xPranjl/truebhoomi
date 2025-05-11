import React, { useState } from "react";
import "./LandPriceEstimator.css"; // Import the CSS file for styles

const LandPriceEstimator = () => {
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [mapSrc, setMapSrc] = useState("");
  const [priceEstimate, setPriceEstimate] = useState("--");
  const [nearbySales, setNearbySales] = useState([]);
  const [loadingMap, setLoadingMap] = useState(false);
  const [latLon, setLatLon] = useState({ lat: "", lon: "" });

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setAddress(value);

    if (value.length > 3) {
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${value}`)
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.length > 0 ? data : []);
        })
        .catch(() => setSuggestions([]));
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const { lat, lon, display_name } = suggestion;
    setAddress(display_name);
    setPincode("");
    setSuggestions([]);
    updateLocationData(lat, lon, display_name);
  };

  const updateLocationData = (lat, lon) => {
    setLoadingMap(true);
    setLatLon({ lat, lon });
    setMapSrc(`https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`);

    setTimeout(() => {
      setLoadingMap(false);
    }, 1500);

    const nearbySalesData = [
      { distance: "500m", rate: "₹1500/sq.ft" },
      { distance: "1.2km", rate: "₹1350/sq.ft" },
      { distance: "2.5km", rate: "₹1200/sq.ft" },
    ];

    const avg = Math.round((1500 + 1350 + 1200) / 3);
    setPriceEstimate(`₹${avg}/sq.ft (Estimated)`);
    setNearbySales(nearbySalesData);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    const lat = position.coords.latitude.toFixed(6);
    const lon = position.coords.longitude.toFixed(6);

    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
      .then((response) => response.json())
      .then((data) => {
        setAddress(data.display_name);
        updateLocationData(lat, lon);
      })
      .catch(() => {
        alert("Failed to fetch address. Try again.");
      });
  };

  const showError = () => {
    alert("Unable to access location. Please allow location access.");
  };

  const handleFindAgent = () => {
    if (!address || !pincode) {
      alert("Please fill in both Address and Pincode.");
      return;
    }

    const params = new URLSearchParams({
      location: address,
      pincode: pincode,
      estimate: priceEstimate,
      latlon: `${latLon.lat},${latLon.lon}`,
    }).toString();

    window.location.href = `/find?${params}`;
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold" style={{ color: "white" }}>📍 Land Price Estimator</h1>
        <p className="text-muted">Estimate land price based on location or manual entry</p>
      </div>

      <div className="text-center mb-3">
        <button className="btn btn-primary" onClick={getLocation}>
          📍 Detect My Location
        </button>
      </div>

      <div className="mb-3 position-relative">
        <label htmlFor="address" className="form-label">Enter Address Manually:</label>
        <input
          type="text"
          className="form-control"
          value={address}
          onChange={handleAddressChange}
          placeholder="Type address or area..."
          required
        />

        {suggestions.length > 0 && (
          <div className="suggestions-list bg-white border rounded mt-1">
            {suggestions.slice(0, 5).map((suggestion, index) => (
              <div
                key={index}
                className="suggestion-item p-2 cursor-pointer"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.display_name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="pincode" className="form-label">Enter Pincode:</label>
        <input
          type="text"
          className="form-control"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          placeholder="Enter pincode"
          required
        />
      </div>

      {loadingMap ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading map...</p>
        </div>
      ) : (
        mapSrc && (
          <div className="my-4">
            <iframe
              width="100%"
              height="300"
              style={{ border: 0, borderRadius: "10px" }}
              allowFullScreen=""
              loading="lazy"
              src={mapSrc}
            ></iframe>
          </div>
        )
      )}

      <div className="mt-4">
        <h5>💰 Estimated Land Price:</h5>
        <p>{priceEstimate}</p>
      </div>

      <button
        className="btn btn-success mt-3 w-100"
        onClick={handleFindAgent}
        disabled={!address || !pincode}
      >
        List and Find Agent
      </button>
    </div>
  );
};

export default LandPriceEstimator;
