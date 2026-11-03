require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Quest Consultancy Backend is running successfully!"
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Backend API is working"
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Quest Consultancy server running on http://localhost:${PORT}`);
});
