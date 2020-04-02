/* eslint-disable new-cap, max-len */
const Router = require('koa-router');
const mongo = require('mongodb');
const router = new Router();

const {Rooms} = require('../../config/mongo');
const {empty, getDateTime} = require('../../config/util');

router.get('/api/getRooms/:userId', async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let data = null;
  try {
    const {userId} = ctx.params;
    data = await Rooms().find({Creator: userId}).toArray();
    if (!empty(data)) {
      code = 200;
      success = true;
      error = false;
    } else {
      code = 500;
      success = false;
      error = 'No rooms found!';
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

router.get('/api/getRoom/:userId/:roomName', async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let data = null;
  try {
    const {roomName, userId} = ctx.params;
    data = await Rooms().findOne({Title: roomName, Creator: userId});
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

router.put('/api/rooms/:id/:function', async (ctx) => {
  const roomId = ctx.params.id;
  const func = ctx.params.function;
  let code = null;
  let error = null;
  let success = null;
  let out = null;
  switch (func) {
    case 'addUser': {
      try {
        const {username} = ctx.request.body;
        out = await Rooms().findOne({_id: new mongo.ObjectId(roomId), People: {$elemMatch: {User: username}}});
        if (empty(out)) {
          const out1 = await Rooms().updateOne({_id: new mongo.ObjectId(roomId)}, {$push: {People: {User: username}}});
          if (!empty(out1)) {
            code = 200;
            success = true;
            error = false;
          } else {
            code = 500;
            success = false;
            error = 'Update failed!';
          }
        } else {
          code = 500;
          success = false;
          error = 'Failed to find room';
        }
      } catch (err) {
        code = 500;
        success = false;
        error = err;
      }
    }
      break;
    case 'changeName': {
      try {
        const {title, creator} = ctx.request.body;
        out = await Rooms().findOne({Creator: creator, Title: title});
        if (empty(out)) {
          const out1 = await Rooms().updateOne({_id: new mongo.ObjectId(roomId)}, {$set: {Title: title}});
          if (!empty(out1)) {
            code = 200;
            success = true;
            error = false;
          } else {
            code = 500;
            success = false;
            error = 'Update failed!';
          }
        } else {
          code = 500;
          success = false;
          error = 'Failed to find room';
        }
      } catch (err) {
        code = 500;
        success = false;
        error = err;
      }
    }
      break;
    default: {
    }
      break;
  }
  ctx.status = code;
  ctx.body = {
    success,
    error,
  };
});

module.exports = router;
