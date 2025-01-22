import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes";

// Variables //
const app = express();
const PORT = 3001;

// Middleware //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
