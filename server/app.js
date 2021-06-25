require('dotenv').config();
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

// express app
const app = express();
const port = process.env.PORT || 3000;

// connecting to db
const db_url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.xlgrw.mongodb.net/complaints?retryWrites=true&w=majority`;
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected to DB');
}).catch((err) => {
    console.error(err);
});

// schema and model
const complaintSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: String,
    location: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Complaint = mongoose.model("Complaint", complaintSchema);

// routes
app.use(express.static(path.join(__dirname, '../public')));
app.get("/", (req, res) => {
    res.status(200).send('/index.html');
});
app.get("/register", (req, res) => {
    res.status(200).send('/register.html');
});
app.get("/escalate", (req, res) => {
    res.status(200).send('/escalate.html');
});
// 404 Page
app.get('*', (req, res) => {
    res.status(404).send('Page not found :(');
});

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}/`);
});