const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/api/orders');

router.get('/cart', ordersCtrl.cart);

router.get('/history', ordersCtrl.history);

router.post('/cart/Items/:id', ordersCtrl.addToCart);

router.post('/cart/checkout', ordersCtrl.checkout);

router.put('/cart/qty', ordersCtrl.setItemQtyInCart);

module.exports = router;