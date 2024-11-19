import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cartRoutes from "./routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      // "http://localhost:5173", para pruebas locales
      // "http://localhost:3000",
      "https://wallbit-challenge-vert.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
