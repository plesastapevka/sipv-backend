/* eslint-disable new-cap, max-len */
const Router = require('koa-router');
const mongo = require('mongodb');
const router = new Router();

const {Rooms, Chat} = require('../../config/mongo');
const {empty, getDateTime} = require('../../config/util');

const authenticated = require('../../config/authenticated');

/// Get user's rooms
router.get('/api/getRooms/:userId', authenticated, async (ctx) => { // dodal middleware za avtentikacijo probno
  let code = null;
  let success = null;
  let error = null;
  let data = null;
  try {
    const {userId} = ctx.params;
    data = await Rooms().find({People: {$elemMatch: {User: userId}}}).toArray();
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

/// Get single room
router.get('/api/getRoom/:id', authenticated, async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let data = null;
  try {
    const {id} = ctx.params;
    data = await Rooms().findOne({_id: new mongo.ObjectId(id)});
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

/// Create room
router.post('/api/createRoom', authenticated, async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let out = null;
  let out1 = null;
  let newRoom = null;
  let newChat = null;
  try {
    const {body} = ctx.request;
    out = await Rooms().findOne({Title: body.title, Creator: body.admin});
    out1 = await Chat().findOne({Title: body.title, Creator: body.admin});
    if (empty(out) && empty(out1)) {
      newRoom = await Rooms().insertOne({Title: body.title, Creator: body.admin, People: [{User: body.admin}]});
      newChat = await Chat().insertOne({Title: body.title, Creator: body.admin, Chat: []});
      if (!empty(newRoom) && !empty(newChat)) {
        out1 = await Rooms().updateOne({_id: new mongo.ObjectId(newRoom.ops[0]._id)}, {$set: {ChatId: newChat.ops[0]._id.toString()}});
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
      error = 'Room/chat with same name already exists!';
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

/// Update room - add user, change name
router.put('/api/rooms/:id/:function', authenticated, async (ctx) => {
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
        const {title, creator, chatId} = ctx.request.body;
        out = await Rooms().findOne({Creator: creator, Title: title});
        const output = await Chat().findOne({Creator: creator, Title: title});
        if (empty(out) && empty(output)) {
          const out1 = await Rooms().updateOne({_id: new mongo.ObjectId(roomId)}, {$set: {Title: title}});
          const out2 = await Chat().updateOne({_id: new mongo.ObjectId(chatId)}, {$set: {Title: title}});
          if (!empty(out1) && !empty(out2)) {
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
