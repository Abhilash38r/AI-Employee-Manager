import React, { useState } from 'react';
import api from '../api/axios';

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchAIInsights = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/ai/recommend');
      setRecommendations(res.data.recommendations);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch AI recommendations');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-container">
      <h2>AI Recommendations & Insights</h2>
      <p>Click the button below to generate AI insights for all employees regarding promotions, training, and performance feedback.</p>
      <button onClick={fetchAIInsights} className="btn btn-primary" disabled={loading}>
        {loading ? 'Generating Insights...' : 'Generate AI Insights'}
      </button>

      {error && <div className="error-msg" style={{marginTop: '20px'}}>{error}</div>}

      {recommendations && (
        <div className="ai-results">
          <h3>AI Output:</h3>
          <pre>{recommendations}</pre>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
