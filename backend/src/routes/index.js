import express from "express";

import authRoutes from "./auth.js";
import tailorRoutes from "./tailors.js";
import orderRoutes from "./orderRoutes.js";
import chatRoutes from "./chatRoutes.js";
import adminRoutes from "./admin.js";
import notificationRoutes from "./notifications.js";
import favoriteRoutes from "./favorites.js";
import serviceRoutes from "./serviceRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/tailors", tailorRoutes);
router.use("/orders", orderRoutes);
router.use("/chat", chatRoutes);
router.use("/admin", adminRoutes);
router.use("/notifications", notificationRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/services", serviceRoutes);

export default router;
