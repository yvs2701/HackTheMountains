require('dotenv').config();
const path = require('path');
const express = require('express');
const Complaint = require('./db');

// express app
const app = express();
const port = process.env.PORT || 3000;

// routes
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.status(200).send('/index.html');
});
app.get("/register", (req, res) => {
    res.status(200).send('/register.html');
});
app.get("/escalate", (req, res) => {
    res.status(200).send('/escalate.html');
});
// post requests
app.post("/register", (req, res) => {
    console.log(req.body);
    try {
        const complaint = new Complaint({
            email: req.body.email,
            title: req.nody.title,
            description: req.body.description,
            location: req.body.location
        });
        complaint.save();
        res.redirect("/escalate");
    } catch (err) {
        console.error(err);
    }
});
// 404 Page
app.get('*', (req, res) => {
    res.status(404).send('Page not found :(');
});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/`);
});