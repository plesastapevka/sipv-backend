const combineRouters = require('koa-combine-routers');

const users = require('./routes/users');
const rooms = require('./routes/rooms');

module.exports = combineRouters([
  users,
  rooms,
]);
