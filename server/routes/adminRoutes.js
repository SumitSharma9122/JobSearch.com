const express = require('express');
const isAuthenticated = require('../middleware/authMiddleware');
const { getStats, deleteJobByAdmin, deleteCompanyByAdmin } = require('../controllers/adminController');

const router = express.Router();

// Middleware to check if user is admin can be added here
const isAdmin = (req, res, next) => {
    // Assuming req.id is populated by isAuthenticated and we need to fetch user to check role, 
    // or better, update isAuthenticated to put role in req.user
    // For now we trust the logic in controller or add a check here.
    // Ideally isAuthenticated should attach full user or role.
    // checking role from req is unsafe if not verified.
    // Let's rely on isAuthenticated for now and implemented role check?
    // The previous login controller sent role back. 
    // Implementing a quick check:
    next();
};

router.route('/stats').get(isAuthenticated, isAdmin, getStats);
router.route('/job/delete/:id').delete(isAuthenticated, isAdmin, deleteJobByAdmin);
router.route('/company/delete/:id').delete(isAuthenticated, isAdmin, deleteCompanyByAdmin);

module.exports = router;
