const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const router = require('./modules/router');

const app = new Koa();
const port = 3000;

app.use(bodyParser());

app.use(router());
app.listen(port);
console.log(`listening on port ${port}`);
