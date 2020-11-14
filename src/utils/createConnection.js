const { MongoClient } = require('mongodb');

let client;
let database;

const createConnection = async () => {
  if (!database) {
    console.log('Connecting to database');
    try {
      client = await MongoClient.connect(process.env.MONGO_CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      console.log(`Error connecting to database`, e);
    }
    database = client.db(process.env.MONGO_DB_NAME);
  }

  return database;
};

module.exports = {
  client,
  database,
  createConnection,
};
