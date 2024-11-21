const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const { MONGO_URI, DB_NAME, COLLECTION_NAME } = process.env;

const app = express();
const port = 4000; // Database server port

app.use(express.json());
app.use(cors());

let client;
let db;

// Connect to MongoDB
async function connectToDatabase() {
//   const config = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// };
  if (!client) {
    client = new MongoClient(MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

    try {
      await client.connect();
      console.log('Database server connected to MongoDB');
      db = client.db(DB_NAME);
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      process.exit(1);
    }
  }
  return db;
}
async function checkIfCollectionIsEmpty() {
  const db = await connectToDatabase();
  const count = await db.collection(COLLECTION_NAME).countDocuments();
  return count === 0;
}

async function insertDataToDB(cityName, data) {
  const db = await connectToDatabase();
  const result = await db.collection(COLLECTION_NAME).updateOne(
    { Location: cityName },
    { $set: data },
    { upsert: true } // If city doesn't exist, it will insert it
  );
  return result;
}

app.post('/insert-weather', async (req, res) => {
  try {
    // Get the city name and data from the request body
    const { Location, data } = req.body;

    // Call insertDataToDB function to insert data into MongoDB
    const result = await insertDataToDB(Location, data);

    // Return a success response
    res.status(200).json({ message: 'Data inserted successfully', result });
  } catch (err) {
    console.error('Error inserting data:', err);
    res.status(500).json({ error: 'Failed to insert data' });
  }
});

// API route to fetch data
app.get('/data', async (req, res) => {
  const cityName = req.query.city; // Get the city name from query parameter

  if (!cityName) {
    return res.status(400).send({ error: 'City name is required' });
  }
  console.log('Connection Details', MONGO_URI, COLLECTION_NAME, DB_NAME);
  try {
    const isCollectionEmpty = await checkIfCollectionIsEmpty();
    if (isCollectionEmpty) {
      res.status(200).json({});
    } else {
      const db = await connectToDatabase();
      const collection = db.collection(COLLECTION_NAME);
      const query = { Location: cityName }; // Filter for the city
      const latestData = await collection.findOne(query);
      if (latestData) {
        res.status(200).json(latestData);
      } else {
        res.status(200).json({});
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Start server
app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Database server is running on http://localhost:${port}`);
});

// Gracefully handle shutdown
process.on('SIGINT', async () => {
  console.log('Shutting down database server gracefully...');
  if (client) await client.close();
  process.exit(0);
});
