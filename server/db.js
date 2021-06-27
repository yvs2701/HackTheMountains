const mongoose = require('mongoose');
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
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    votes: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Complaint = mongoose.model("Complaint", complaintSchema);
module.exports = Complaint;