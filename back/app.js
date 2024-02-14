const express = require("express");
const mongoose = require("mongoose");
const Projects = require("./models/projects");
const app = express();

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

app.post("/api/projects", (req, res, next) => {
  const project = new Projects({
    ...req.body,
  });
  project
    .save()
    .then(() => res.status(201).json({ message: "projet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/projects/:id", (req, res, next) => {
  Projects.findOne({ _id: req.params.id })
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(404).json({ error }));
});

app.put("/api/projects/:id", (req, res, next) => {
  Projects.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: "projet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.delete("/api/projects/:id", (req, res, next) => {
  Projects.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "projet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/projects", (req, res, next) => {
  Projects.find()
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
