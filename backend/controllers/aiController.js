const axios = require('axios');
const Employee = require('../models/Employee');

// @desc    Get AI recommendations for employees
// @route   POST /api/ai/recommend
// @access  Private
const getAIRecommendations = async (req, res) => {
  try {
    // Get all employees to analyze
    const employees = await Employee.find();
    
    if (!employees || employees.length === 0) {
      return res.status(400).json({ message: 'No employees found to analyze' });
    }

    const employeeDataStr = employees.map(emp => 
      `Name: ${emp.name}, Dept: ${emp.department}, Skills: ${emp.skills.join(', ')}, Score: ${emp.performanceScore}/100, Exp: ${emp.experience} yrs`
    ).join('; ');

    const prompt = `As an HR AI assistant, analyze the following employees and provide:
1. Promotion Recommendations (who deserves a promotion based on high score and experience)
2. Employee Ranking (rank them based on performance)
3. Training Suggestions (who needs improvement or new skills)
4. AI Feedback Generation for low performers.

Employee Data: ${employeeDataStr}

Please format the response nicely.`;

    const openRouterApiKey = process.env.OPENROUTER_API_KEY;

    if (!openRouterApiKey) {
      return res.status(500).json({ message: 'OpenRouter API key is missing' });
    }

    // Call OpenRouter API
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'openai/gpt-3.5-turbo', // You can change the model as needed
      messages: [
        { role: 'system', content: 'You are a helpful HR AI assistant.' },
        { role: 'user', content: prompt }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${openRouterApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const aiFeedback = response.data.choices[0].message.content;
    
    res.status(200).json({
      success: true,
      recommendations: aiFeedback
    });

  } catch (error) {
    console.error('AI API Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Failed to generate AI recommendations' });
  }
};

module.exports = {
  getAIRecommendations
};
