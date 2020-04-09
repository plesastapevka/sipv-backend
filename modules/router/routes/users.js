const Router = require('koa-router');
const router = new Router();

const {Users} = require('../../config/mongo');

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

// Registracija novega uporabnika.
router.post('/api/registerUser', async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let out = null;
  let newUser = null;
  try {
    const {body} = ctx.request;
    out = await Users().findOne({email: body.email, username: body.username});
    if (empty(out)) {
      newUser = await Users().insertOne({email: body.email, username: body.username, pass: body.pass});
      if (!empty(newUser)) {
        code = 200;
        success = true;
        error = false;
      } else {
        code = 500;
        success = false;
        error = 'Error inserting in database!';
      }
    } else {
      code = 409;
      success = false;
      error = 'User already exists.';
    }
  } catch (err) {
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