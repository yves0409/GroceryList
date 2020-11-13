const express = require("express");
const router = express.Router();

//Item model
const Item = require("../../models/Item");

// @Route GET api/items
// @Desc  get all items
// @acces public
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

// @Route POST api/items
// @Desc  post an item
// @acces public
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

// @Route DELETE api/items/:id
// @Desc  delete an item
// @acces public
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ succes: true })))
    .catch((err) => res.status(404).json({ succes: false }));
});

module.exports = router;
