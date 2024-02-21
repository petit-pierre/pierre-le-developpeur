const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  tools: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],

  links: [
    {
      url: { type: String, required: true },
      category: { type: String, required: true },
    },
  ],
  sliders: [
    {
      picture: { type: String, required: true },
      picture_id: { type: String, required: true },
      alt: { type: String, required: true },
    },
  ],
  skills: [
    {
      id: { type: String, required: true },
      name: { type: String, required: true },
    },
  ],
  translation: { type: String, required: true },
});

module.exports = mongoose.model("Projects", projectsSchema);
