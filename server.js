const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const workshopRoutes = require("./src/routes/workshop.routes");
const categoryRoutes = require("./src/routes/category.routes");
const mailTemplateRoutes = require("./src/routes/mailTemplate.routes");
const commissionRoutes = require("./src/routes/commission.routes");
const locationRoutes = require("./src/routes/location.routes");
const indexRoutes = require("./src/routes/index.routes");
const customerRoutes = require ("./src/routes/customer.routes");
const roundRoutes = require("./src/routes/round.routes");
const workshopRoundRoutes = require("./src/routes/workshopRound.routes")     
const languageRoutes = require("./src/routes/language.routes");
const teacherWorkshopQualificationRoutes = require("./src/routes/teacherWorkshopQualification.routes");
const enrollmentRoutes = require("./src/routes/enrollment.routes");
const dashboardRoutes = require("./src/routes/dashboard.routes");
const inviteRoutes = require("./src/routes/invite.routes");

const emailRoutes = require("./src/mail/mail.routes");

const userRoutes = require ("./src/routes/user.routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use(cookieParser());

// Configure CORS
const corsOptions = {
    origin: 'https://skool-2.studententuin.nl', // replace with your client app's url
    credentials: true
};
app.use(cors(corsOptions));

// All routes
app.use(customerRoutes);
app.use(workshopRoutes);
app.use(locationRoutes);
app.use(mailTemplateRoutes);
app.use(categoryRoutes);
app.use(commissionRoutes);
app.use(userRoutes);
app.use(roundRoutes);
app.use(workshopRoundRoutes);
app.use(languageRoutes);
app.use(enrollmentRoutes);
app.use(teacherWorkshopQualificationRoutes);
app.use(inviteRoutes);
app.use(dashboardRoutes);
app.use(emailRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Catch-all handler to serve the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
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