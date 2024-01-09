require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const lettreRoutes=require("./routes/lettreRoute")
const passwordResetRoutes = require("./routes/passwordReset");
const cvRoutes =require("./routes/cvRoute")

// database connection
connection();

// middlewares
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/lettre",lettreRoutes);
app.use("/api/resume",cvRoutes);



const port = process.env.PORT || 3001;
app.listen(port, console.log(`Listening on port ${port}...`));
