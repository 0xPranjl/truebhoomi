import React, { useState } from "react";
import { databases, storage } from "./Appwrite";
import { ID } from "appwrite";
import { useSearchParams } from "react-router-dom";

const LandForm = () => {
  const [searchParams] = useSearchParams();
  const location = searchParams.get("location") || "your area";
  const estimate = searchParams.get("estimate") || "₹0/sq.ft";
  const pincode = searchParams.get("pincode") || "100000";

  const [area, setArea] = useState("");
  const [timing, setTiming] = useState("");
  const [files, setFiles] = useState([]);
  const [totalEstimate, setTotalEstimate] = useState("--");
  const [loading, setLoading] = useState(false);

  const pricePerSqFt = parseInt(estimate.replace(/[^\d]/g, "")) || 0;

  const handleAreaChange = (e) => {
    const value = e.target.value;
    setArea(value);

    if (!value || pricePerSqFt === 0) {
      setTotalEstimate("--");
      return;
    }

    const low = pricePerSqFt - 100;
    const high = pricePerSqFt + 100;

    const minTotal = low * value;
    const maxTotal = high * value;

    setTotalEstimate(`₹${minTotal.toLocaleString()} – ₹${maxTotal.toLocaleString()}`);
  };

  const handleSubmit = async () => {
    if (!area || !timing) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    try {
      const mediaUrls = [];

      for (const file of files) {
        const fileId = `${Date.now()}_${file.name}`;
        const response = await storage.createFile(
          process.env.REACT_APP_APPWRITE_BUCKET_ID,
          fileId,
          file
        );
        const fileUrl = storage.getFileView(
          process.env.REACT_APP_APPWRITE_BUCKET_ID,
          response.$id
        );
        mediaUrls.push(fileUrl);
      }

      const data = {
        name: "usernamee",  // Replace with actual data
        address: location,
        estimated: estimate,
        landarea: area,
        priority: timing,
        media: mediaUrls.length > 0 ? mediaUrls[0] : "https://example.com/default.jpg",
        pincode: parseInt(pincode),
      };

      await databases.createDocument(
        process.env.REACT_APP_APPWRITE_DB_ID,
        process.env.REACT_APP_COLLECTION_ID,
        ID.unique(),
        data
      );

      alert("Submitted successfully!");
      window.location.href = `/contact?pincode=${pincode}&location=${location}&estimate=${estimate}&area=${area}`;
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="fw-bold">Agents in {location}</h1>
        <p className="text-muted">We’ll connect you with trusted agents for your land</p>
      </div>

      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 shadow rounded-4">
            <h4>📍 Your Location</h4>
            <p>{location}</p>

            <h4 className="mt-4">💰 Estimated Price</h4>
            <p>{estimate}</p>

            <div className="mt-3">
              <label className="form-label">Enter land area (sq.ft) <span className="text-danger">*</span></label>
              <input
                type="number"
                className="form-control"
                placeholder="Eg: 1200"
                value={area}
                onChange={handleAreaChange}
                required
              />
            </div>

            <div className="mt-3">
              <label className="form-label">Expected selling time: <span className="text-danger">*</span></label><br />
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={timing === "Now"}
                  onChange={() => setTiming("Now")}
                  required
                />
                <label className="form-check-label">Immediately</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  checked={timing === "1-2 months"}
                  onChange={() => setTiming("1-2 months")}
                  required
                />
                <label className="form-check-label">In 1–2 months</label>
              </div>
            </div>

            <div className="mt-3">
              <label className="form-label">Upload Photos/Videos (optional)</label>
              <input
                type="file"
                className="form-control"
                multiple
                accept="image/*,video/*"
                required
                onChange={(e) => setFiles(Array.from(e.target.files))}
              />
            </div>

            <div className="mt-4">
              <h5>📦 Total Estimated Price</h5>
              <p className="fw-bold">{totalEstimate}</p>
            </div>

            <button
              className="btn btn-success mt-3 w-100"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Submitting...
                </>
              ) : (
                "Submit & Continue"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandForm;
