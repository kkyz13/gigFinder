const express = require("express");
// const connectDB = require("./src/db/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
