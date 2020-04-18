const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const router = new Router();

const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'some_secret'; // secret string, ki ga samo server pozna
const {Users} = require('../../config/mongo');
const {empty} = require('../../config/util');
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
console.log(error);
});

// Avtentikacija uporabnika, uporablja jwt (json web token)
router.post('/api/authUser', async (ctx) => {
	let code = null;
	let success = null;
	let error = null;
	let data = null;
	let user = null;
	try {
		const { body } = ctx.request;

		if (!body.username) {
			success = false;
			code = 422;
			error = 'Username required';
		}
		if (!body.pass) {
			success = false;
			code = 422;
			error = 'Password required';
		}
		
		user = await Users().findOne({username: body.username});
		if (!user) {
			success = false;
			code = 401;
			error = 'Cannot find user';
		}
		else {
			if (user.pass === body.pass) { // tu se pride enkripcija
				const payload = { sub: user._id };
				const token = jwt.sign(payload, secret);
				data = token;
				code = 200;
				success = true;
			}
			else {
				code = 401;
				success = false;
				error = 'Incorrect username and/or password';
			}
		}
	} catch (err) {
		code = 500;
		success = false;
		error = err;
	}
	ctx.status = code;
	ctx.body = {
		data,
		error,
		success,
	};
console.log(error);
});

module.exports = router;