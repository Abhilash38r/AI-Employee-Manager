const express = require('express');
const router = express.Router();
const {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
} = require('../controllers/employeeController');
const { protect } = require('../middleware/authMiddleware');

// Get all employees and search employee are handled by the same controller
router.route('/')
  .get(protect, getEmployees)
  .post(protect, addEmployee);

// Optional explicit search route (though / can handle it via query params)
router.get('/search', protect, getEmployees);

router.route('/:id')
  .put(protect, updateEmployee)
  .delete(protect, deleteEmployee);

module.exports = router;
