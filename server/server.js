const express = require("express");
const path = require("path");
const cors = require("cors");
const logger = require("./src/util/logger");

const workshopRoutes = require("./src/routes/workshop.routes");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors()); // Add this line for CORS

const clientDirectory = path.join(__dirname, "../client");

// Example workshop data
let workshopData = {
    name: "Sample Workshop",
    category: { ghettoDrums: true, Looping: false, CSGO: false },
    details: "Workshop f/;kdghriguhriuighrtuh",
    materials: "Workshop Materials"
};

// Define routes
app.get("/api/workshop", (req, res) => {
    res.json(workshopData);
});

app.put("/api/workshop", (req, res) => {
    workshopData = req.body;
    res.json({ success: true, data: workshopData });
});

// All routes
app.use(workshopRoutes);

app.get("/api", (req, res) => {
    res.json({ name: "xD" });
});

// Route error handler
app.use((req, res, next) => {
    next({
        status: 404,
        message: 'Route not found',
        data: {}
    });
});

// Express error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
        data: {}
    });
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});

// Export the app object for test cases
module.exports = app;
