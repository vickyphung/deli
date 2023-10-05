const Order = require('../../models/Order');

function cart(req, res) {
  try {
    Order.getCart(req.user._id)
      .then(cart => res.status(200).json(cart))
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}

function addToCart(req, res) {
  try {
    Order.getCart(req.user._id)
      .then(cart => cart.addItemToCart(req.params.id)
        .then(result => res.status(200).json(cart))
      )
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}

function setItemQtyInCart(req, res) {
  try {
    Order.getCart(req.user._id)
      .then(cart => {
        cart.setItemQty(req.body.itemId, req.body.newQty);
        res.status(200).json(cart);
      });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}

function checkout (req, res) {
  try {
    Order.getCart(req.user._id);
    cart.isPaid = true;
    cart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
}

function history (req, res) {
  try {
    Order
      .find({ user: req.user._id, isPaid: true })
      .sort(`-updatedAt`).exec()
      .then(orders => res.status(200).json(orders))
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
}

module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  history
}