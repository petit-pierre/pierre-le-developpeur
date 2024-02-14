const projects = require("../models/projects");
const Projects = require("../models/projects");

exports.createProject = (req, res, next) => {
  const project = new Projects({
    ...req.body,
  });
  project
    .save()
    .then(() => res.status(201).json({ message: "projet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getProject = (req, res, next) => {
  Projects.findOne({ _id: req.params.id })
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(404).json({ error }));
};

exports.putProject = (req, res, next) => {
  Projects.updateOne({ _id: req.params.id }, { ...req.body })
    .then(() => res.status(200).json({ message: "projet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteProject = (req, res, next) => {
  Projects.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "projet supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getProjects = (req, res, next) => {
  Projects.find()
    .then((projects) => res.status(200).json(projects))
    .catch((error) => res.status(400).json({ error }));
};
