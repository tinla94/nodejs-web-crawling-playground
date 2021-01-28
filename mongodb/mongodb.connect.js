const mongodb = require('mongodb').MongoClient;

const connect = async () => {
    try {
        const client = await mongodb.connect(process.env.MONGO_URI, {
          useNewUrlParser: true
        });
        console.log("connected to mongodb");
        return client;
      } catch (err) {
        console.error(err);
      }
}

module.exports = connect;