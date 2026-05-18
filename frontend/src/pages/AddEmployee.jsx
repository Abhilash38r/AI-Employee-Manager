import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    skills: '',
    performanceScore: '',
    experience: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = {
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()),
        performanceScore: Number(formData.performanceScore),
        experience: Number(formData.experience)
      };
      await api.post('/employees', payload);
      setSuccess('Employee added successfully!');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add employee');
    }
  };

  return (
    <div className="form-container">
      <h2>Employee Registration Form</h2>
      {error && <div className="error-msg">{error}</div>}
      {success && <div className="success-msg">{success}</div>}
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-group">
          <label>Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Skills (comma separated)</label>
          <input type="text" name="skills" placeholder="e.g. React, Node, MongoDB" value={formData.skills} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Performance Score (0-100)</label>
          <input type="number" name="performanceScore" min="0" max="100" value={formData.performanceScore} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Years of Experience</label>
          <input type="number" name="experience" min="0" value={formData.experience} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
