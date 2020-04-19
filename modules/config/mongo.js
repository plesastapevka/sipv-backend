const MongoDB = require('mongodb');
const mongoAuthUri = 'mongodb+srv://backend-dev:1234backend@database-fc7vq.mongodb.net/test?retryWrites=true&w=majority';

// eslint-disable-next-line
const mongoClient = new MongoDB.MongoClient(mongoAuthUri, {useUnifiedTopology: true});
let users;
let rooms;
let chats;
let dms;

const initDB = (callback) => {
  mongoClient.connect((err, db) => {
    if (err) throw err;
    const database = db.db('chat');
    users = database.collection('user');
    rooms = database.collection('Room');
    chats = database.collection('Chat');
    dms = database.collection('DMs');
    return callback(null);
  });
};

const Users = () => users;
const Rooms = () => rooms;
const Chat = () => chats;
const DMs = () => dms;

module.exports = {
  initDB,
  Users,
  Rooms,
  Chat,
  DMs,
};
