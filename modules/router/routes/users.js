const Router = require('koa-router');
const router = new Router();

const rsaWrapper = require('../../config/rsa-wrapper');
const aesWrapper = require('../../config/aes-wrapper');

/* PRIMER API ENDPOINTA IN KAKO SE NAJ PIŠEJO */
router.get('/api/getUser/:user', async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let data = null;
  try {
    const {user} = ctx.params;
    data = user;
    code = 200;
    success = true;
    error = false;
  } catch (err) {
    code = 500;
    error = err;
    success = false;
  }
  ctx.status = code;
  ctx.body = {
    data,
    error,
    success,
  };
});

router.post('/api/createUser', async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let out = null;
  let newUser = null;
  
  try {
    const {body} = ctx.request;
    out = await Users().findOne({username: body.username});
    if (out === null) {
      let key = rsaWrapper.generate();
      let private = key.exportKey('pkcs1-private-pem');
      let public = key.exportKey('pkcs1-public-pem');
      newUser = await Users().insertOne({username: body.username, privateKey: private, publicKey: public});
      if (newUser !== null) {
        code = 200;
        success = true;
        error = false;
      } else {
        code = 500;
        success = false;
        error = 'Error inserting in database!';
      }
    } else {
      code = 500;
      success = false;
      error = 'User already exists';
    }
  } catch (err) {
    console.log(err);
    success = false;
    code = 500;
    error = err;
  }
  ctx.status = code;
  ctx.body = {
    error,
    success,
  };
});

module.exports = router;
