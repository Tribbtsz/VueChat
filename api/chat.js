const axios = require('axios');

module.exports = async (req, res) => {
  const { model, message } = req.body;

  try {
    const response = await axios.post('https://api.aikey.one/v1/chat/completions', {
      model,
      messages: [{ role: 'user', content: message }]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.AI_KEY}`,
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
        'Content-Type': 'application/json',
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
