const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const translationsSchema = mongoose.Schema({
  english: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    resum: { type: String, required: true },
    slider: [
      {
        content: { type: String, required: true },
      },
    ],
  },
  french: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    resum: { type: String, required: true },
    slider: [
      {
        content: { type: String, required: true },
      },
    ],
  },
});

translationsSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Translations", translationsSchema);
