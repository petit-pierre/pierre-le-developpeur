const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const translationsSchema = mongoose.Schema({
  english: {
    projects: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        resum: { type: String, required: true },
        sliders: [
          {
            id: { type: String, required: true },
            content: { type: String, required: true },
          },
        ],
      },
    ],
    skills: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    slider: [
      {
        id: { type: String, required: true },
        content: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    contact: {
      placeholder_mail: { type: String, required: true },
      placeholder_content: { type: String, required: true },
      content: { type: String, required: true },
      button: { type: String, required: true },
      error_mail: { type: String, required: true },
      error_content: { type: String, required: true },
      succes: { type: String, required: true },
    },
    recommendation: { type: String, required: true },
  },
  french: {
    projects: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        resum: { type: String, required: true },
        sliders: [
          {
            id: { type: String, required: true },
            content: { type: String, required: true },
          },
        ],
      },
    ],
    skills: [
      {
        id: { type: String, required: true },
        title: { type: String, required: true },
      },
    ],
    slider: [
      {
        id: { type: String, required: true },
        content: { type: String, required: true },
        alt: { type: String, required: true },
      },
    ],
    contact: {
      placeholder_mail: { type: String, required: true },
      placeholder_content: { type: String, required: true },
      content: { type: String, required: true },
      button: { type: String, required: true },
      error_mail: { type: String, required: true },
      error_content: { type: String, required: true },
      succes: { type: String, required: true },
    },
    recommendation: { type: String, required: true },
  },
});

translationsSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Translations", translationsSchema);
