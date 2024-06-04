const express = require("express");

const workshopRoutes = require("./src/routes/workshop.routes");
const categoryRoutes = require("./src/routes/category.routes");
const mailTemplateRoutes = require("./src/routes/mailTemplate.routes");
const commissionRoutes = require("./src/routes/commission.routes");
const locationRoutes = require("./src/routes/location.routes");
const indexRoutes = require("./src/routes/index.routes");
const customerRoutes = require ("./src/routes/customer.routes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// All routes
app.use(customerRoutes);
app.use(workshopRoutes);
app.use(locationRoutes)
app.use(mailTemplateRoutes)
app.use(categoryRoutes);
app.use(commissionRoutes);


app.use(express.static('./client/build'))
app.use(indexRoutes)

// Route error handler
app.use((req, res, next) => {
    next({
        status: 404,
        message: 'Route not found',
        data: {}
    })
})

// Express error handler
app.use((error, req, res) => {
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