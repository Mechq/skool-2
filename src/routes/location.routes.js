const express = require("express");
const router = express.Router();
const locationController = require("../controller/location.controller");

function validateLocation(req, res, next) {
    const {name, street, houseNumber, postalCode, city} = req.body;

    if (!name || typeof name !== 'string') {
        return res.status(400).json({error: "Name is required and must be a string."});
    }

    if (!street || typeof street !== 'string') {
        return res.status(400).json({error: "Street is required and must be a string."});
    }

    if (!houseNumber || typeof houseNumber !== 'number') {
        return res.status(400).json({error: "House number is required and must be an integer."});
    }

    if (!postalCode || typeof postalCode !== 'string') {
        return res.status(400).json({error: "Postal code is required and must be a string."});
    }

    if (!city || typeof city !== 'string') {
        return res.status(400).json({error: "City is required and must be a string."});
    }
    next();
}

router.post('/api/location', validateLocation, locationController.createLocation);
router.get('/api/location', locationController.getAllLocations);
router.get('/api/location/:id', locationController.getLocationById);

module.exports = router;