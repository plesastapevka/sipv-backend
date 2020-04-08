const combineRouters = require('koa-combine-routers');

const users = require('./routes/users');
const rooms = require('./routes/rooms');
const chat = require('./routes/chat');
const dms = require('./routes/dm');
const channels = require('./routes/channels');

module.exports = combineRouters([
  users,
  rooms,
  chat,
  dms,
  channels
]);
