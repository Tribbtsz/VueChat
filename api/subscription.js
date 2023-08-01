const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://api.aikey.one/dashboard/billing/subscription', {
      headers: {
        'Authorization': `Bearer ${process.env.AI_KEY}`,
        'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};
