const express = require('express');
const axios = require('axios');
const { MongoClient, Timestamp } = require('mongodb');
const cors = require('cors');

const DATABASE_SERVER_URL = 'http://localhost:4000';

const app = express();
app.use(cors());

// async function fetchLatestData(cityName) {
//   // MongoDB connection URI

//   // Create a MongoDB client
//   const client = new MongoClient(MONGO_URI);

//   try {
//     console.log('this is city ' + cityName);
//     // Connect to the MongoDB server
//     await client.connect();
//     console.log('Connected to MongoDB');

//     // Get the database and collection
//     const db = client.db(DB_NAME);
//     const collection = db.collection(COLLECTION_NAME);

//     // Query to find the latest document for the specified city
//     const query = { Location: cityName }; // Filter for the city
//     const sort = { Date_Time: -1 }; // Sort by date in descending order (latest first)

//     // Fetch the latest document
//     const latestData = await collection.findOne(query, { sort });

//     if (latestData) {
//       console.log('Latest Data:', latestData);
//       return latestData;
//     } else {
//       console.log('error: No data found');
//     }
//   } catch (err) {
//     console.error('Error occurred:', err);
//     console.log('{ error: Failed to fetch weather data}');
//   } finally {
//     // Close the client
//     await client.close();
//   }
// }

app.get('/weather', async (req, res) => {
  const cityName = req.query.city; // Get the city name from query parameter
  console.log('this is inside req cityname ' + cityName);
  if (!cityName) {
    return res.status(400).send({ error: 'City name is required' });
  }

  try {
    API_KEY = 'f1ec850335ad042181f9c963651eee71';
    const uri = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${API_KEY}`;
    // console.log(uri);
    // const api_data = await axios.get(uri, {
    //   params: { q: cityName, appid: API_KEY },
    // });
    // console.log('This is api_data ', api_data.data);

    const response = await axios.get(`${DATABASE_SERVER_URL}/data`, {
      params: { city: cityName},
    });
    console.log('Returned data ', response.data);

    if (Object.keys(response.data).length === 0) {
      console.log('Entered if');
      console.log(uri);
      const response = await axios.get(uri);
      console.log('This is api_data ', response.data);

      response.data.timestamp = new Date();
      const weatherData = {
        Location: cityName,
        data: response.data,
      };
      response.data.Location = cityName;

      console.log('Data after added Location ', response.data);
      axios
        .post('http://localhost:4000/insert-weather', weatherData)
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
