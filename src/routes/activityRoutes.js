const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

/**
 * @swagger
 * /activities/access-code/{accessCode}:
 *   get:
 *     summary: Get activity by access code
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: accessCode
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique access code of the activity
 *     responses:
 *       200:
 *         description: The activity data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.get('/access-code/:accessCode', activityController.getActivityByAccessCode);

/**
 * @swagger
 * /activities:
 *   post:
 *     summary: Create a new activity
 *     tags: [Activities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the activity
 *                 example: "React Tutorial"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Start time of the activity
 *                 example: "2024-12-05T10:00:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: End time of the activity
 *                 example: "2024-12-05T12:00:00Z"
 *     responses:
 *       201:
 *         description: Activity created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Bad request
 */
router.post('/', activityController.createActivity);

/**
 * @swagger
 * /activities:
 *   get:
 *     summary: Get all activities
 *     tags: [Activities]
 *     responses:
 *       200:
 *         description: List of all activities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Activity'
 *       500:
 *         description: Server error
 */
router.get('/', activityController.getAllActivities);

/**
 * @swagger
 * /activities/{id}:
 *   get:
 *     summary: Get activity by ID
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the activity
 *     responses:
 *       200:
 *         description: The activity data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.get('/:id', activityController.getActivityById);

/**
 * @swagger
 * /activities/{id}:
 *   put:
 *     summary: Update an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the activity to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Updated description of the activity
 *                 example: "Updated React Tutorial"
 *               startTime:
 *                 type: string
 *                 format: date-time
 *                 description: Updated start time of the activity
 *                 example: "2024-12-06T10:00:00Z"
 *               endTime:
 *                 type: string
 *                 format: date-time
 *                 description: Updated end time of the activity
 *                 example: "2024-12-06T12:00:00Z"
 *     responses:
 *       200:
 *         description: Activity updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Activity'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.put('/:id', activityController.updateActivity);

/**
 * @swagger
 * /activities/{id}:
 *   delete:
 *     summary: Delete an activity
 *     tags: [Activities]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the activity to delete
 *     responses:
 *       200:
 *         description: Activity deleted successfully
 *       404:
 *         description: Activity not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', activityController.deleteActivity);

module.exports = router;
