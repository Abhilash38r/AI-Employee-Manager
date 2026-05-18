const Employee = require('../models/Employee');

// @desc    Get all employees or search by department
// @route   GET /api/employees & GET /api/employees/search?department=Development
// @access  Private
const getEmployees = async (req, res) => {
  try {
    const { department } = req.query;
    let query = {};
    
    if (department) {
      query.department = { $regex: new RegExp(department, "i") };
    }
    
    const employees = await Employee.find(query).sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new employee
// @route   POST /api/employees
// @access  Private
const addEmployee = async (req, res) => {
  try {
    const { name, email, department, skills, performanceScore, experience } = req.body;
    
    if (!name || !email || !department || !skills || performanceScore === undefined || experience === undefined) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    // Check for duplicate email
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
      return res.status(400).json({ message: 'Employee with this email already exists' });
    }
    
    const employee = await Employee.create({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience
    });
    
    res.status(201).json(employee);
  } catch (error) {
    if(error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update employee (e.g. performance score)
// @route   PUT /api/employees/:id
// @access  Private
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete employee
// @route   DELETE /api/employees/:id
// @access  Private
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    
    await employee.deleteOne();
    res.status(200).json({ id: req.params.id, message: 'Employee removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee
};
