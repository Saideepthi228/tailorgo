import db from "../utils/db.js";

// Haversine formula to calculate distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // in KM
}

// ------------------------------
// GET ALL TAILORS (with distance & service filter)
// ------------------------------
export async function getTailors(req, res) {
  try {
    const { q, userLat, userLng } = req.query;

    // Load tailors + services
    const [tailors] = await db.query(
      `SELECT t.*, s.name AS service_name, s.price
       FROM tailors t
       LEFT JOIN services s ON s.tailor_id = t.id`
    );

    let filtered = tailors;

    // Filter by service name (search)
    if (q) {
      filtered = filtered.filter((t) =>
        t.service_name?.toLowerCase().includes(q.toLowerCase())
      );
    }

    // Add distance if user location is given
    if (userLat && userLng) {
      filtered = filtered.map((t) => {
        const dist = calculateDistance(
          Number(userLat),
          Number(userLng),
          Number(t.latitude || 0),
          Number(t.longitude || 0)
        );
        return { ...t, distance: dist.toFixed(2) };
      });

      // sort nearest first
      filtered.sort((a, b) => a.distance - b.distance);
    }

    res.json(filtered);
  } catch (err) {
    console.error("getTailors error:", err);
    res.status(500).json({ error: "Failed to load tailors" });
  }
}
