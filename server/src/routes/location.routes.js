const express = require("express");
const router = express.Router();
const logger = require("../util/logger");
const locationController = require("../controller/location.controller");

function validateLocation(req, res, next) {
    const { name, street, housenumber, postalcode, city } = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({ error: "Name is required and must be a string." });
    }

    if (!street || typeof street !== 'string') {
        return res.status(400).json({ error: "Street is required and must be a string." });
    }

    if (!housenumber || typeof housenumber !== 'number') {
        return res.status(400).json({ error: "Housenumber is required and must be an integer." });
    }

    if (!postalcode || typeof postalcode !== 'string') {
        return res.status(400).json({ error: "Postalcode is required and must be a string." });
    }

    if (!city || typeof city !== 'string') {
        return res.status(400).json({ error: "City is required and must be a string." });
    }

    next();
}

router.post('/api/location', validateLocation, locationController.createLocation);
router.get('/api/location', locationController.getAllLocations);

module.exports = router;
