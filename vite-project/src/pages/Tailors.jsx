// src/pages/Tailors.jsx

import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { Search, Star } from "lucide-react";

export default function Tailors() {

  const [tailors,setTailors] = useState([]);
  const [search,setSearch] = useState("");
  const [category,setCategory] = useState("All");

  const navigate = useNavigate();

  const sampleImages = [
    "/images/tailor1.jpg",
    "/images/tailor2.jpg",
    "/images/tailor3.jpg",
    "/images/tailor4.jpg"
  ];


  /*
  LOAD TAILORS
  */
  const loadTailors = async () => {

    try {

      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(async (pos)=>{

          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const res = await API.get(
            `/tailors?lat=${lat}&lng=${lng}&service=${category}`
          );

          setTailors(res.data || []);

        });

      } else {

        const res = await API.get(`/tailors?service=${category}`);
        setTailors(res.data || []);

      }

    } catch (err) {

      console.error("Error loading tailors:", err);

    }

  };

  useEffect(()=>{
    loadTailors();
  },[category]);


  /*
  SEARCH
  */
  const filteredTailors = tailors.filter((t)=>
    `${t.name} ${t.bio}`
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );


  return (

    <div className="page">

      {/* SEARCH */}

      <div className="search-box">

        <Search className="search-icon" size={20}/>

        <input
          className="search-input"
          placeholder="Search tailors..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </div>

      <div style={{height:10}}/>


      {/* CATEGORY FILTER */}

      <div className="flex gap-3 overflow-x-auto pb-2 filter-row">

        {[
          "All",
          "Blouse Stitching",
          "Kurta Stitching",
          "Men Shirt Stitching",
          "Pant Alteration"
        ].map((cat)=>(
          <button
            key={cat}
            onClick={()=>setCategory(cat)}
            className="px-4 py-2 rounded-full bg-[#080f1a] border border-[#1f2a3d]"
          >
            {cat}
          </button>
        ))}

      </div>


      {/* EMPTY */}

      {filteredTailors.length === 0 && (

        <div className="card">

          <p className="muted">
            No tailors found.
          </p>

        </div>

      )}


      {/* LIST */}

      {filteredTailors.map((t,index)=>(
        <div
          key={t.id || index}
          className="tailor-card"
          onClick={()=>navigate(`/tailor/${t.id}`)}
        >

          <div className="tailor-img-box">
            <img
              src={sampleImages[index % sampleImages.length]}
              className="tailor-img"
              alt="tailor"
            />
          </div>


          <div className="tailor-card-body">

            <h2>{t.name}</h2>

            <p className="bio">
              {t.bio || "Professional stitching services"}
            </p>

            <div className="tailor-info-row">

              <Star size={16} color="#ffcc00"/>

              <span>{t.rating || "4.5"}</span>

              <span className="dot">•</span>

              <span>{t.location || "Nearby"}</span>

            </div>

            {t.service_name && (
              <p className="muted small" style={{marginTop:4}}>
                Service: {t.service_name}
              </p>
            )}

            {t.distance && (
              <p className="muted small">
                {Number(t.distance).toFixed(2)} km away
              </p>
            )}

            <button className="btn primary small mt-2">
              View & Order
            </button>

          </div>

        </div>
      ))}

    </div>

  );

}