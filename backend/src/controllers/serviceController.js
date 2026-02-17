import db from "../utils/db.js";

// Get all services of a tailor
export const getServicesByTailor = async (req, res) => {
  try {
    const { tailorId } = req.params;
    const [rows] = await db.query(
      "SELECT * FROM services WHERE tailor_id = ? AND is_active = 1",
      [tailorId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
