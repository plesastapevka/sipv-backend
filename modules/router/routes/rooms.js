/* eslint-disable new-cap, max-len */
const Router = require('koa-router');
const mongo = require('mongodb');
const router = new Router();

const {Rooms} = require('../../config/mongo');
const {empty, getDateTime} = require('../../config/util');

router.get('/api/getRoom/:userId/:roomId', async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let data = null;
  try {
    const {roomId, userId} = ctx.params;
    data = await Rooms().findOne({_id: new mongo.ObjectID(roomId), Creator: userId});
    if (!empty(data)) {
      code = 200;
      success = true;
      error = false;
    } else {
      code = 500;
      success = false;
      error = 'Error, no room found!';
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

router.post('/api/createRoom', async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let out = null;
  let newRoom = null;
  try {
    const {body} = ctx.request;
    out = await Rooms().findOne({Title: body.title, Creator: body.admin});
    if (empty(out)) {
      newRoom = await Rooms().insertOne({Title: body.title, Creator: body.admin, People: [{User: body.admin}]});
      if (!empty(newRoom)) {
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
      error = 'Room with same name already exists!';
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
