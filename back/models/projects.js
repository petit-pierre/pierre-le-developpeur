const mongoose = require("mongoose");

const projectsSchema = mongoose.Schema({
  title: {
    french: { type: String, required: false },
    english: { type: String, required: false },
  },
  category: { type: String, required: false },
  date: { type: String, required: false },
  tools: [
    {
      id: { type: String, required: false },
      name: { type: String, required: false },
    },
  ],
  description: {
    french: { type: String, required: false },
    english: { type: String, required: false },
  },
  links: [
    {
      title: { type: String, required: false },
      url: { type: String, required: false },
      picture: { type: String, required: false },
      alt: { type: String, required: false },
    },
  ],
  sliders: [
    {
      picture: { type: String, required: false },
      alt: { type: String, required: false },
      content: {
        french: { type: String, required: false },
        english: { type: String, required: false },
      },
    },
  ],
  resum: {
    french: { type: String, required: false },
    english: { type: String, required: false },
  },
  skills: [
    {
      id: { type: String, required: false },
      name: { type: String, required: false },
    },
  ],
});

module.exports = mongoose.model("Projects", projectsSchema);
