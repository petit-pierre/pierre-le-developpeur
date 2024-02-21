const express = require("express");
const translationsCtrl = require("../controllers/translations");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, translationsCtrl.createTranslation);

//router.get("/:id", projectTranslationsCtrl.getProjectTranslation);

//router.put("/:id", auth, projectTranslationCtrl.putProjectTranslation);

router.delete("/:id", auth, translationsCtrl.deleteTranslation);

router.get("/", translationsCtrl.getTranslations);

module.exports = router;
