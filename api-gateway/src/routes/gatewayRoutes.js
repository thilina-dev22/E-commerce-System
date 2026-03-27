const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const proxies = require('../config/proxies');
const router = express.Router();

router.use('/users', createProxyMiddleware(proxies.users));
router.use('/products', createProxyMiddleware(proxies.products));
router.use('/orders', createProxyMiddleware(proxies.orders));
router.use('/cart', createProxyMiddleware(proxies.cart));

module.exports = router;
