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
        .catch((err) => {
          console.error(err);
          alert("Failed to load tailor");
        })
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
      // Backend will store this JSON in `measurements` column
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
      console.error(err);
      alert("Failed to place order");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="page dark-page">
        <div className="container">Loading order form...</div>
      </div>
    );
  }

  if (!tailor) {
    return (
      <div className="page dark-page">
        <div className="container">Tailor not found.</div>
      </div>
    );
  }

  return (
    <div className="page dark-page">
      <div className="container">
        <h1 className="page-title">Order with {tailor.name}</h1>

        <form className="form" onSubmit={handleSubmit}>
          <div className="section">
            <h3>What do you want to stitch?</h3>
            <select
              className="input"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              <option value="">Select service</option>
              <option value="Blouse stitching">Blouse stitching</option>
              <option value="Dress stitching">Dress stitching</option>
              <option value="Lehenga / Ghagra">Lehenga / Ghagra</option>
              <option value="Alteration / Repair">Alteration / Repair</option>
              <option value="Kids wear">Kids wear</option>
              <option value="Other custom work">Other custom work</option>
            </select>

            <textarea
              className="input"
              placeholder="Explain design, fabric, special requests..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="section">
            <h3>Pickup address & contact</h3>
            <textarea
              className="input"
              placeholder="Full pickup address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
            />
            <input
              className="input"
              placeholder="Phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="section">
            <h3>Basic measurements (optional)</h3>
            <div className="grid-2">
              <input
                className="input"
                placeholder="Neck"
                value={measurements.neck}
                onChange={(e) => handleChangeMeasurement("neck", e.target.value)}
              />
              <input
                className="input"
                placeholder="Bust"
                value={measurements.bust}
                onChange={(e) => handleChangeMeasurement("bust", e.target.value)}
              />
              <input
                className="input"
                placeholder="Waist"
                value={measurements.waist}
                onChange={(e) => handleChangeMeasurement("waist", e.target.value)}
              />
              <input
                className="input"
                placeholder="Hip"
                value={measurements.hip}
                onChange={(e) => handleChangeMeasurement("hip", e.target.value)}
              />
              <input
                className="input"
                placeholder="Length"
                value={measurements.length}
                onChange={(e) => handleChangeMeasurement("length", e.target.value)}
              />
              <input
                className="input"
                placeholder="Sleeve"
                value={measurements.sleeve}
                onChange={(e) => handleChangeMeasurement("sleeve", e.target.value)}
              />
            </div>
            <textarea
              className="input"
              placeholder="Any extra notes for the tailor..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button className="btn primary full" type="submit" disabled={submitting}>
            {submitting ? "Placing order..." : "Confirm order"}
          </button>
        </form>
      </div>
      <div style={{ height: 80 }} />
    </div>
  );
}
