const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

const clientDirectory = path.join(__dirname, "../client");


app.get("/api", (req, res) => {
    res.json({
        "workshops": [
            {
                name: 'workshop1',
                description: 'description bla bla bla bla bla'
            },
            {
                name: 'workshop2',
                description: 'description bla bla bla bla bla'
            },
            {
                name: 'workshop3',
                description: 'description bla bla bla bla bla'
            }
        ]
    });
});

app.get("/api/workshops", (req, res) => {
    const workshops = [{
        name: 'workshop1',
        description: 'description bla bla bla bla bla'
    },
    {
        name: 'workshop2',
        description: 'description bla bla bla bla bla'
    },
    {
        name: 'workshop3',
        description: 'description bla bla bla bla bla'
    }]

    res.json(workshops);
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}/`);
});