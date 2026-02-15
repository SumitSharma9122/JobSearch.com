const express = require('express');
const isAuthenticated = require('../middleware/authMiddleware');
const { applyJob, getAppliedJobs, getApplicants, updateStatus } = require('../controllers/applicationController');

const router = express.Router();

router.route('/apply/:id').get(isAuthenticated, applyJob);
router.route('/get').get(isAuthenticated, getAppliedJobs);
router.route('/:id/applicants').get(isAuthenticated, getApplicants);
router.route('/status/:id/update').post(isAuthenticated, updateStatus);

module.exports = router;
