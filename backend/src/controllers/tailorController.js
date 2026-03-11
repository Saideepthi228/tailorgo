// src/controllers/tailorController.js

import db from "../utils/db.js";

/*
GET ONLINE TAILORS (OPTIONAL SERVICE FILTER + DISTANCE)
*/
export async function getTailors(req, res) {

  try {

    const { lat, lng, service } = req.query;

    let params = [];
    let serviceFilter = "";

    if (service && service !== "All") {
      serviceFilter = "AND s.name = ?";
      params.push(service);
    }

    let distanceQuery = "";
    if (lat && lng) {
      distanceQuery = `
      (6371 * ACOS(
        COS(RADIANS(?)) *
        COS(RADIANS(t.latitude)) *
        COS(RADIANS(t.longitude) - RADIANS(?)) +
        SIN(RADIANS(?)) *
        SIN(RADIANS(t.latitude))
      )) AS distance,`;
      params.unshift(lat, lng, lat);
    }

    const query = `
      SELECT DISTINCT
        t.id,
        t.name,
        t.bio,
        t.rating,
        t.location,
        t.img_url,
        ${distanceQuery}
        s.name AS service_name,
        s.price
      FROM tailors t
      LEFT JOIN services s ON t.id = s.tailor_id
      WHERE t.approved = 1
      AND t.is_online = 1
      ${serviceFilter}
      ORDER BY distance ASC
    `;

    const [rows] = await db.query(query, params);

    res.json(rows);

  } catch (err) {

    console.error("getTailors error:", err);

    res.status(500).json({
      error: "Failed to load tailors"
    });

  }

}


/*
GET SINGLE TAILOR
*/
export async function getTailorById(req, res) {

  try {

    const { id } = req.params;

    const [rows] = await db.query(
      `SELECT * FROM tailors WHERE id=?`,
      [id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: "Tailor not found" });
    }

    res.json(rows[0]);

  } catch (err) {

    console.error("getTailorById error:", err);

    res.status(500).json({
      error: "Failed to load tailor"
    });

  }

}