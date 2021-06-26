const express = require('express');
const router = express.Router();
require('./db');

router.get("/", (req, res) => {
    res.status(200).send('/index.html');
});
router.get("/register", (req, res) => {
    res.status(200).send('/register.html');
});
router.get("/escalate", (req, res) => {
    res.status(200).send('/escalate.html');
});
// post requests
router.post("/register", (req, res) => {
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
router.get('*', (req, res) => {
    res.status(404).send('Page not found :(');
});