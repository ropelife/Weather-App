const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
app.use(cors());

// Schema and Model for Caching
// const WeatherSchema = new mongoose.Schema({
//   _id: Object,
//   Location: String,
//   Date_Time: String,
//   Temperature_C: Number,
//   Humidity_pct: Number,
//   Precipitation_mm: Number,
//   Wind_Speed_kmh: Number,
// });

const uri = 'mongodb+srv://achaud25:Anjali@weatherapp.thzlw.mongodb.net/'; // Replace with your MongoDB URI if needed
const dbName = 'Weather'; // Replace with your database name
const collectionName = 'data'; // Replace with your collection name

async function fetchLatestData(cityName) {
  // MongoDB connection URI

  // Create a MongoDB client
  const client = new MongoClient(uri);

  try {
    console.log('this is city ' + cityName);
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // Get the database and collection
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Query to find the latest document for the specified city
    const query = { Location: cityName }; // Filter for the city
    const sort = { Date_Time: -1 }; // Sort by date in descending order (latest first)

    // Fetch the latest document
    const latestData = await collection.findOne(query, { sort });

    if (latestData) {
      console.log('Latest Data:', latestData);
      return latestData;
    } else {
      console.log('error: No data found');
    }
  } catch (err) {
    console.error('Error occurred:', err);
    console.log('{ error: Failed to fetch weather data}');
  } finally {
    // Close the client
    await client.close();
  }
}
// Route to Fetch Weather Data
app.get('/weather', async (req, res) => {
  const cityName = req.query.city; // Get the city name from query parameter
  console.log('this is inside req cityname ' + cityName);
  if (!cityName) {
    return res.status(400).send({ error: 'City name is required' });
  }

  try {
    const latestData = await fetchLatestData(cityName);
    if (latestData) {
      res.status(200).json(latestData);
    } else {
      res.status(404).json({ message: `No data found for city: ${cityName}` });
    }
  } catch (err) {
    res.status(500).json({ error: `Error fetching data: ${err.message}` });
  }
});

app.listen(5000, () => {
  console.log('Backend server running on http://localhost:5000');
});

// async (req, res) => {
//   const { city } = req.query;
//   console.log('This is city ' + city);

//   if (!city) {
//     return res.status(400).json({ error: 'City name is required' });
//   }

//   try {
//     // Check Cache
//     const cachedWeather = await Weather.findOne({ Location: city }).sort({
//       Date_Time: -1,
//     });
//     console.log('cachedResponse ' + cachedWeather);
//     if (cachedWeather) {
//       return res.json(cachedWeather);
//     }

//     // Fetch from API
//     // const response = await axios.get(
//     //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
//     // );

//     // const data = {
//     //   city,
//     //   temperature: response.data.main.temp,
//     //   condition: response.data.weather[0].description,
//     // };

//     // Update Cache
//     // await Weather.findOneAndUpdate({ city }, data, { upsert: true, new: true });
//     // res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch weather data' });
//   }
// }
