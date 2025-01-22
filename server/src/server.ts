import express from "express";
import cors from "cors";
import router from "./routes";

// Variables //
const app = express();
const PORT = 3001;

// Middleware //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
