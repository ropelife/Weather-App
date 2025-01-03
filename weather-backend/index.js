const express = require('express');
const axios = require('axios');
const { MongoClient, Timestamp } = require('mongodb');
const cors = require('cors');

const DATABASE_SERVER_URL =
  process.env.DB_SERVER_URL || 'http://localhost:4000';

const app = express();
app.use(cors());

app.get('/weather', async (req, res) => {
  const cityName = req.query.city;
  // console.log('this is inside req cityname ' + cityName);
  if (!cityName) {
    return res.status(400).send({ error: 'City name is required' });
  }

  try {
    API_KEY = 'f1ec850335ad042181f9c963651eee71';
    const uri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${API_KEY}`;

    const response = await axios.get(`${DATABASE_SERVER_URL}/data`, {
      params: { city: cityName },
    });
    // console.log('Returned data ', response.data);

    if (Object.keys(response.data).length === 0) {
      // console.log(uri);
      const response = await axios.get(uri);
      // console.log('This is api_data ', response.data);

      response.data.timestamp = new Date();
      const weatherData = {
        Location: cityName,
        data: response.data,
      };
      response.data.Location = cityName;

      axios
        .post(`${DATABASE_SERVER_URL}/insert-weather`, weatherData)
        .then((response) => {
          console.log('Data inserted successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error inserting data:', error);
        });
      res.status(200).json(response.data);
    } else {
      if (response.data) {
        res.status(200).json(response.data);
      } else {
        res
          .status(404)
          .json({ message: `No data found for city: ${cityName}` });
      }
    }
  } catch (err) {
    res.status(500).json({ error: `Error fetching data: ${err.message}` });
  }
});

app.listen(5001, () => {
  console.log('Backend server running on http://localhost:5001');
});
