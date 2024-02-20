const ProjectTranslations = require("../models/projectTranslations");

exports.createProjectTranslation = (req, res, next) => {
  const projectTranslation = new ProjectTranslations({
    ...req.body,
  });
  projectTranslation
    .save()
    .then(() => res.status(201).json(projectTranslation))
    .catch((error) => res.status(400).json({ error }));
};

/*exports.getProjectTranslation = (req, res, next) => {
  ProjectTranslation.findOne({ _id: req.params.id })
    .then((projectTranslation) => res.status(200).json(projectTranslation))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteProjectTranslation = (req, res, next) => {
  ProjectTranslation.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "translation supprimé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getProjectsTranslations = (req, res, next) => {
  ProjectTranslation.find()
    .then((projectsTranslations) => res.status(200).json(projectsTranslations))
    .catch((error) => res.status(400).json({ error }));
};*/
