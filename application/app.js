const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/api/v1/health", (req, res) => {
	res.status(200).json({ status: "ok" });
});

module.exports = app;
