const Item = require('../../models/Item');

function index(req, res) {
  try {
    Item.find({})
      .sort('name')
      .populate('category').exec()
      .then(items => res.status(200).json(items));
  } catch(err) {
    res.status(400).json({ msg: err.message });
  }
}

function show(req, res) {
  try {
    Item.findOne({ _id: req.params.id })
      .then(item => res.status(200).json(item));
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}

module.exports = {
  index,
  show
}