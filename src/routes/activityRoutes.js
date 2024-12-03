const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

router.post('/', activityController.createActivity);
router.get('/', activityController.getAllActivities); // route to get all activities
router.get('/:id', activityController.getActivityById); // route to get activity by ID
router.put('/:id', activityController.updateActivity); // route to update an activity
router.delete('/:id', activityController.deleteActivity); // route to delete an activity

module.exports = router;
