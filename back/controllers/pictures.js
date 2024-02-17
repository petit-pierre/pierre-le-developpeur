const { error } = require("console");
const Picture = require("../models/pictures");
const fs = require("fs");

exports.createPicture = (req, res, next) => {
  //const message = error.field;
  const sliderPicture = JSON.parse(req.body.sliderPicture);
  delete sliderPicture._id;
  delete sliderPicture._userId;
  const picture = new Picture({
    ...sliderPicture,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  picture
    .save()
    .then(() => {
      res.status(201).json({ message: "Objet enregistré !" });
    })
    .catch((error) => {
      //console.log(message);
      res.status(400).json({ error });
    });
};
/*
exports.create = async (req, res) => {
	const host = req.get('host');
	const title = req.body.title;
	const categoryId = req.body.category;
	const userId = req.auth.userId;
	const imageUrl = `${req.protocol}://${host}/images/${req.file.filename}`;
	try{
		const work = await Works.create({
			title,
			imageUrl,
			categoryId,
			userId
		})
		return res.status(201).json(work)
	}catch (err) {
		return res.status(500).json({ error: new Error('Something went wrong') })
	}
}*/
