const Router = require('koa-router');
const mongo = require('mongodb');
const router = new Router();

const {Users} = require('../../config/mongo');
const {empty, getDateTime} = require('../../config/util');

//private key naj nebi bil v bazi, samo za testiranje

router.get('/api/getPublicKey/:username/', async (ctx) => {
    let code = null;
    let success = null;
    let error = null;
    let data = null;
    try {
      const {username} = ctx.params;
      data = await Users().findOne({username: username});
      data = data.publicKey;
      if (!empty(data)) {
        code = 200;
        success = true;
        error = false;
      } else {
        code = 500;
        success = false;
        error = 'Error, no user found!';
      }
    } catch (err) {
      code = 500;
      success = false;
      error = err;
    }
    ctx.status = code;
    ctx.body = {
      success,
      error,
      data,
    };
  });

  router.get('/api/getPrivateKey/:username/', async (ctx) => {
    let code = null;
    let success = null;
    let error = null;
    let data = null;
    try {
      const {username} = ctx.params;
      data = await Users().findOne({username: username});
      data = data.privateKey;
      if (!empty(data)) {
        code = 200;
        success = true;
        error = false;
      } else {
        code = 500;
        success = false;
        error = 'Error, no user found!';
      }
    } catch (err) {
      code = 500;
      success = false;
      error = err;
    }
    ctx.status = code;
    ctx.body = {
      success,
      error,
      data,
    };
  });

  module.exports = router;