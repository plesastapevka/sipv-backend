const MongoDB = require('mongodb');
const mongoAuthUri = 'mongodb+srv://backend-dev:1234backend@database-fc7vq.mongodb.net/test?retryWrites=true&w=majority';

// eslint-disable-next-line
const mongoClient = new MongoDB.MongoClient(mongoAuthUri, {useUnifiedTopology: true});
let users;
let rooms;

const initDB = (callback) => {
  mongoClient.connect((err, db) => {
    if (err) throw err;
    const database = db.db('chat');
    users = database.collection('user');
    rooms = database.collection('Room');
    return callback(null);
  });
};

mongoClient.connect((err, db) => {
  if (err) throw err;
  const database = db.db('chat');
  users = database.collection('user');
  rooms = database.collection('Room');
});

const Users = () => users;
const Rooms = () => rooms;

module.exports = {
  initDB,
  Users,
  Rooms,
};
