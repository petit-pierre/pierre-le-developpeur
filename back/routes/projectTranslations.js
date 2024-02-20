const express = require("express");
const projectTranslationsCtrl = require("../controllers/projectTranslations");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, projectTranslationsCtrl.createProjectTranslation);

//router.get("/:id", projectTranslationsCtrl.getProjectTranslation);

//router.put("/:id", auth, projectTranslationCtrl.putProjectTranslation);

//router.delete("/:id", auth, projectTranslationsCtrl.deleteProjectTranslation);

//router.get("/", projectTranslationCtrl.getProjectTranslation);

module.exports = router;
