// src/pages/OrderForm.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function OrderForm() {
  const { tailorId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [tailor, setTailor] = useState(location.state?.tailor || null);
  const [loading, setLoading] = useState(!location.state?.tailor);
  const [submitting, setSubmitting] = useState(false);

  const [serviceType, setServiceType] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [measurements, setMeasurements] = useState({
    neck: "",
    bust: "",
    waist: "",
    hip: "",
    length: "",
    sleeve: "",
  });

  useEffect(() => {
    if (!tailor) {
      API.get(`/tailors/${tailorId}`)
        .then((res) => setTailor(res.data))
        .catch(() => alert("Failed to load tailor"))
        .finally(() => setLoading(false));
    }
  }, [tailor, tailorId]);

  const handleChangeMeasurement = (field, value) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!serviceType || !address || !phone) {
      alert("Please fill service type, address and phone");
      return;
    }

    const payload = {
      tailor_id: Number(tailorId),
      measurements: {
        serviceType,
        description,
        address,
        phone,
        notes,
        ...measurements,
      },
    };

    try {
      setSubmitting(true);

      await API.post("/orders", payload);

      alert("Order placed successfully!");

      navigate("/orders");
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page">
        <div className="container">Loading...</div>
      </div>
    );
  }

  if (!tailor) {
    return (
      <div className="page">
        <div className="container">Tailor not found</div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="container">

        <h1 className="pageTitle">Order with {tailor.name}</h1>

        <form onSubmit={handleSubmit}>

          {/* SERVICE */}
          <div className="card">
            <h3>What do you want stitched?</h3>

            <select
              className="input"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="">Select service</option>
              <option value="Blouse stitching">Blouse stitching</option>
              <option value="Dress stitching">Dress stitching</option>
              <option value="Alteration">Alteration</option>
              <option value="Kids wear">Kids wear</option>
            </select>

            <textarea
              className="input"
              placeholder="Describe design..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* ADDRESS */}
          <div className="card">
            <h3>Pickup address & contact</h3>

            <textarea
              className="input"
              placeholder="Pickup address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <input
              className="input"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* MEASUREMENTS */}
          <div className="card">
            <h3>Basic measurements (optional)</h3>

            <div className="grid-2">
              <input className="input" placeholder="Neck"
                value={measurements.neck}
                onChange={(e)=>handleChangeMeasurement("neck",e.target.value)}
              />

              <input className="input" placeholder="Bust"
                value={measurements.bust}
                onChange={(e)=>handleChangeMeasurement("bust",e.target.value)}
              />

              <input className="input" placeholder="Waist"
                value={measurements.waist}
                onChange={(e)=>handleChangeMeasurement("waist",e.target.value)}
              />

              <input className="input" placeholder="Hip"
                value={measurements.hip}
                onChange={(e)=>handleChangeMeasurement("hip",e.target.value)}
              />

              <input className="input" placeholder="Length"
                value={measurements.length}
                onChange={(e)=>handleChangeMeasurement("length",e.target.value)}
              />

              <input className="input" placeholder="Sleeve"
                value={measurements.sleeve}
                onChange={(e)=>handleChangeMeasurement("sleeve",e.target.value)}
              />
            </div>

            <textarea
              className="input"
              placeholder="Extra notes for tailor"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button className="btn primary full" disabled={submitting}>
            {submitting ? "Placing order..." : "Confirm Order"}
          </button>

        </form>

      </div>
    </div>
  );
}