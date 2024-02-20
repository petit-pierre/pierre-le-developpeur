const express = require("express");
const mongoose = require("mongoose");
const projectsRoutes = require("./routes/projects");
const projectTranslationsRoutes = require("./routes/projectTranslations");
const userRoutes = require("./routes/user");
const pictureRoutes = require("./routes/pictures");
const app = express();
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://aubree-pierre:jqdsm67hcdfsjmiU7@cluster0.6mhsrgi.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/projects", projectsRoutes);
app.use("/api/projectTranslations", projectTranslationsRoutes);
app.use("/api/user", userRoutes);
app.use("/api/pictures", pictureRoutes);
//app.post("/api/pictures", upload.single("sliderPicture"), (req, res) => {});
module.exports = app;
