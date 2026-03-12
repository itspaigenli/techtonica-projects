import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import sightingsRouter from "./routes/sightings.js";
import individualsRouter from "./routes/individuals.js";
import speciesRouter from "./routes/species.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/sightings", sightingsRouter);
app.use("/individuals", individualsRouter);
app.use("/species", speciesRouter);

/* only start server if not running tests */
export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 3000;


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
