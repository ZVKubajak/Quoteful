import express from "express";
import cors from "cors";
import path from "path";
import router from "./routes";

// Variables //
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React build
app.use(express.static(path.join(process.cwd(), "../client/dist")));

// API routes
app.use(router);

// Catch-all route for React app
app.get("*", (_req, res) => {
  res.sendFile(path.join(process.cwd(), "../client/dist/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}.`);
});
