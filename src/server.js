const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
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