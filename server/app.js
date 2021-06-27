require('dotenv').config();
const path = require('path');
const express = require('express');
const Complaint = require('./db');

// express app
const app = express();
const port = process.env.PORT || 3000;

// ROUTES
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.get("/", (req, res) => {
    res.status(200).render('index');
});
app.get("/register", (req, res) => {
    res.status(200).render('register');
});
// post requests (from register)
app.post("/register", (req, res) => {
    try {
        const complaint = new Complaint({
            email: req.body.email.trim(),
            title: req.body.title.trim(),
            description: req.body.description.trim(),
            location: req.body.location.trim(),
            category: req.body.category
        });
        complaint.save();
        res.redirect(`/escalate`);
    } catch (err) {
        console.error(err);
    }
});
app.get("/escalate", (req, res) => {
    res.status(200).render('escalate');
});
app.get("/escalateMoney", async (req, res) => {
    await Complaint.find({ "category": "money" }, '_id title description location votes').exec((err, result) => {
        if (err)
            console.error(err);
        else {
            res.status(200).render('escalateComplaints', { complaints: result });
        }
    });
});
app.get("/escalateBeds", async (req, res) => {
    await Complaint.find({ "category": "beds" }, '_id title description location votes').exec((err, result) => {
        if (err)
            console.error(err);
        else {
            res.status(200).render('escalateComplaints', { complaints: result });
        }
    });
});
app.get("/escalateVaccine", async (req, res) => {
    await Complaint.find({ "category": "vaccine" }, '_id title description location votes').exec((err, result) => {
        if (err)
            console.error(err);
        else {
            res.status(200).render('escalateComplaints', { complaints: result });
        }
    });
});
app.get("/escalateCylinder", async (req, res) => {
    await Complaint.find({ "category": "oxygen" }, '_id title description location votes').exec((err, result) => {
        if (err)
            console.error(err);
        else {
            res.status(200).render('escalateComplaints', { complaints: result });
        }
    });
});
// fetch data (from search)
app.get("/escalate/search", async (req, res) => {
    await Complaint.find({ $or: [{ "email": req.query['search'] }, { "title": req.query['search'] }, { "location": req.query['search'] }] }, '_id title description location votes').exec((err, result) => {
        if (err)
            console.error(err);
        else {
            res.status(200).render('escalateComplaints', { complaints: result });
        }
    });
});
// 404 Page
app.get('*', (req, res) => {
    res.status(404).send('404...Page not found :(');
});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/`);
});