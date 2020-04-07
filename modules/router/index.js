const combineRouters = require('koa-combine-routers');

const users = require('./routes/users');
const rooms = require('./routes/rooms');
const channels = require('./routes/channels');

module.exports = combineRouters([
  users,
  rooms,
  channels
]);
