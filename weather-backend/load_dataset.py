import pandas as pd
from pymongo import MongoClient

# Function to insert data into MongoDB
def insert_data_to_mongo(file_path, mongo_uri, db_name, collection_name):
    # Connect to MongoDB
    client = MongoClient(mongo_uri)
    db = client[db_name]  # Database name
    collection = db[collection_name]  # Collection name
    
    # Read the CSV file into a pandas DataFrame
    df = pd.read_csv(file_path)
    
    # Convert DataFrame to a list of dictionaries
    data_dict = df.to_dict(orient='records')
    
    # Insert data into MongoDB
    collection.insert_many(data_dict)
    print(f"Data inserted into MongoDB collection: {collection_name}")

if __name__ == "__main__":
    # Path to the local CSV file
    file_path = r'/Users/anjalichaudhari/Documents/GitHub/Weather-App/weather-backend/weather_data.csv'  # Replace with your file path
    
    # MongoDB connection details
    mongo_uri = "mongodb+srv://achaud25:Anjali@weatherapp.thzlw.mongodb.net/"  # Replace with your MongoDB URI if needed
    db_name = "Weather"  # Replace with your database name
    collection_name = "data"  # Replace with your collection name
    
    # Insert the data into MongoDB
    insert_data_to_mongo(file_path, mongo_uri, db_name, collection_name)
