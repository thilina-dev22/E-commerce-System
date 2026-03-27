const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');

/**
 * @swagger
 * /cart:
 *   get:
 *     summary: Returns the list of all items
 *     responses:
 *       200:
 *         description: The list
 */
router.get('/', controller.getAll);

/**
 * @swagger
 * /cart/payment:
 *   post:
 *     summary: Create new / Process action
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Success
 *       201:
 *         description: Created
 */
router.post('/payment', controller.create);

module.exports = router;
