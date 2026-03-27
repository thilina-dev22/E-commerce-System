const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Returns the list of all items
 *     responses:
 *       200:
 *         description: The list
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create new / Process action
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Success
 *       201:
 *         description: Created
 */
router.post('/', controller.create);

module.exports = router;
