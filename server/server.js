const express = require("express");
const path = require("path");
const logger = require("./src/util/logger");

const workshopRoutes = require("./src/routes/workshop.routes");

const app = express();
const PORT = 5000;

app.use(express.json());

const clientDirectory = path.join(__dirname, "../client");

// All routes
app.use(workshopRoutes);

// Route error handler
app.use((req, res, next) => {
    next({
        status: 404,
        message: 'Route not found',
        data: {}
    })
})

// Express error handler
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        status: error.status || 500,
        message: error.message || 'Internal Server Error',
        data: {}
    })
})

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});

// Export the app object for test cases
module.exports = app