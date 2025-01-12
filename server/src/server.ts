import express from "express";
import cors from "cors";

// Variables //
const app = express();
const PORT = 3001;

// Middleware //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
