const express = require("express");
const projectsCtrl = require("../controllers/projects");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const router = express.Router();

router.post("/", auth, multer, projectsCtrl.createProject);

router.get("/:id", projectsCtrl.getProject);

router.put("/:id", auth, multer, projectsCtrl.putProject);

router.delete("/:id", auth, projectsCtrl.deleteProject);

router.get("/", projectsCtrl.getProjects);

module.exports = router;
