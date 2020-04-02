const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const router = require('./modules/router');
const {initDB} = require('./modules/config/mongo');
const sockets=require('./modules/sockets/sockets');
const app = new Koa();
const port = 3000;

initDB((error) => {
  if (error) {
    console.error('MongoClient error:', error);
    process.exit(1);
  }
  app.use(bodyParser());
  app.use(router());
  app.listen(port);
  console.log(`listening on port ${port}`);
});
