const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const MongoDB = require('mongodb');
const mongoAuthUri = 'mongodb+srv://backend-dev:1234backend@database-fc7vq.mongodb.net/test?retryWrites=true&w=majority'

const router = require('./modules/router');
// eslint-disable-next-line max-len
const mongoClient = new MongoDB.MongoClient(mongoAuthUri, {useUnifiedTopology: true});

const app = new Koa();
const port = 3000;

mongoClient.connect(err => {
    if(err) throw err; 
});

app.use(bodyParser());
app.use(router());
app.listen(port);
console.log(`listening on port ${port}`);
