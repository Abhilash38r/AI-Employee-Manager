import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [searchDept, setSearchDept] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async (dept = '') => {
    try {
      const url = dept ? `/employees/search?department=${dept}` : '/employees';
      const res = await api.get(url);
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/login');
      }
      console.error(err);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchEmployees(searchDept);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.delete(`/employees/${id}`);
        setEmployees(employees.filter(emp => emp._id !== id));
      } catch (err) {
        console.error(err);
        alert('Failed to delete employee');
      }
    }
  };

  const handleUpdateScore = async (id, currentScore) => {
    const newScore = prompt('Enter new performance score (0-100):', currentScore);
    if (newScore !== null && newScore !== '' && !isNaN(newScore)) {
      try {
        const res = await api.put(`/employees/${id}`, { performanceScore: Number(newScore) });
        setEmployees(employees.map(emp => emp._id === id ? res.data : emp));
      } catch (err) {
        console.error(err);
        alert('Failed to update score');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="dashboard-container">
      <h2>Employee List</h2>
      
      {/* Search & Filter Section */}
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-form">
          <input 
            type="text" 
            placeholder="Search by Department..." 
            value={searchDept}
            onChange={(e) => setSearchDept(e.target.value)}
          />
          <button type="submit" className="btn btn-secondary">Search</button>
          {searchDept && <button type="button" className="btn" onClick={() => { setSearchDept(''); fetchEmployees(''); }}>Clear</button>}
        </form>
      </div>

      <div className="employee-list">
        {employees.length === 0 ? (
          <p>No employees found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Skills</th>
                <th>Score</th>
                <th>Experience (yrs)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp._id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.department}</td>
                  <td>{emp.skills.join(', ')}</td>
                  <td>{emp.performanceScore}</td>
                  <td>{emp.experience}</td>
                  <td>
                    <button onClick={() => handleUpdateScore(emp._id, emp.performanceScore)} className="btn btn-small">Update Score</button>
                    <button onClick={() => handleDelete(emp._id)} className="btn btn-small btn-danger" style={{marginLeft: '5px'}}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
