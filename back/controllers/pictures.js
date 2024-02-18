const Picture = require("../models/pictures");
const fs = require("fs");

exports.createPicture = async (req, res, next) => {
  //const sliderPicture = JSON.parse(req.body.content);
  //delete sliderPicture._id;
  //delete sliderPicture._userId;
  const sliderPicture = req.body.imageUrl;
  const picture = new Picture({
    //...sliderPicture,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  picture
    .save()
    .then(() => {
      res.status(201).json(picture);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
