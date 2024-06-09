const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route to get all currencies
app.get('/getAllCurrencies', async (req, res) => {
  const nameURL = 'https://openexchangerates.org/api/currencies.json?app_id=9813ee300589453db06b382a6ca9fbcd';

  try {
    const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;
    return res.json(nameData);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Get target amount
app.get('/convert', async (req, res) => {
  const { date, sourceCurrency, targetCurrency, amountInSourceCurrency } = req.query;

  try {
    const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=9813ee300589453db06b382a6ca9fbcd`;

    const dataResponse = await axios.get(dataUrl);
    const rates = dataResponse.data.rates;

    // Rate calculations
    const sourceRate = rates[sourceCurrency];
    const targetRate = rates[targetCurrency];

    if (!sourceRate || !targetRate) {
      return res.status(400).json({ error: 'Invalid currency code or date.' });
    }

    const targetAmount = (targetRate / sourceRate) * amountInSourceCurrency;
    
    return res.json({ amountInTargetCurrency: targetAmount.toFixed(2) });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Listen on port 5000
app.listen(5000, () => {
  console.log('SERVER STARTED on port 5000');
});
