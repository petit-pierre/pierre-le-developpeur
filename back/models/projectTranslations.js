const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const projectTranslationsSchema = mongoose.Schema({
  englishProject: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      resum: { type: String, required: true },
      slider: [
        {
          content: { type: String, required: true },
        },
      ],
    },
  ],

  frenchProject: [
    {
      title: { type: String, required: true },
      description: { type: String, required: true },
      resum: { type: String, required: true },
      slider: [
        {
          content: { type: String, required: true },
        },
      ],
    },
  ],
});

projectTranslationsSchema.plugin(uniqueValidator);

module.exports = mongoose.model(
  "ProjectTranslations",
  projectTranslationsSchema
);
