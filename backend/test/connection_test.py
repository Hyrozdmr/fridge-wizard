from pymongo import MongoClient

def test_mongodb_connection():
    try:
        # Replace these values with your MongoDB connection details
        client = MongoClient('mongodb://localhost:27017/')
        db = client['fridge_hero_test']
        collection = db['users']

        # Insert a document
        result = collection.insert_one({'test_key': 'test_value'})
        print("Document inserted with ID:", result.inserted_id)

        # Query the inserted document
        document = collection.find_one({'test_key': 'test_value'})
        print("Found document:", document)

        # Delete the inserted document
        result = collection.delete_one({'test_key': 'test_value'})
        print("Deleted document with ID:", result.deleted_count)
        
        # Close the connection
        client.close()

        return True

    except Exception as e:
        print("Error:", e)
        return False

if __name__ == "__main__":
    if test_mongodb_connection():
        print("Connection to MongoDB successful.")
    else:
        print("Connection to MongoDB failed.")
