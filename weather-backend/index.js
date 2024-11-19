const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

// Route to Fetch Weather Data
app.get('/', async (req, res) => {
  console.log('Welcome!')
});

app.listen(5001, () => {
  console.log('Backend server running on http://localhost:5001');
});
