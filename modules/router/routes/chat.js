/* eslint-disable new-cap, max-len */
const Router = require('koa-router');
const mongo = require('mongodb');
const router = new Router();

const {Rooms, Chat} = require('../../config/mongo');
const {empty, getDateTime} = require('../../config/util');

const authenticated = require('../../config/authenticated');

router.put('/api/chat/:id/:function', authenticated, async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  const id = ctx.params.id;
  const func = ctx.params.function;
  switch (func) {
    case 'addMsg': {
      try {
        const {username, date, message} = ctx.request.body;
        const out = await Chat().findOne({_id: new mongo.ObjectId(id)});
        if (!empty(out)) {
          const msgId = new mongo.ObjectId();
          const updateData = {
            id: msgId,
            Username: username,
            Date: date,
            Message: message,
          };
          const output = await Chat().updateOne({_id: new mongo.ObjectId(id)}, {$push: {Chat: updateData}});
          if (!empty(output)) {
            code = 200;
            success = true;
          } else {
            code = 500;
            success = false;
            error = 'Update failed!';
          }
        } else {
          code = 500;
          success = false;
          error = 'Can not find room/chat wih this name/admin';
        }
      } catch (err) {
        code = 500;
        success = false;
        error = err;
      }
    }
      break;
    case 'removeMsg': {
      try {
        const {msgId} = ctx.request.body;
        const out = await Chat().findOne({_id: new mongo.ObjectId(id)});
        if (!empty(out)) {
          const output = await Chat().updateOne({_id: new mongo.ObjectId(id)}, {$pull: {Chat: {id: new mongo.ObjectId(msgId)}}});
          if (!empty(output)) {
            code = 200;
            success = true;
          } else {
            code = 500;
            success = false;
            error = 'Update failed!';
          }
        } else {
          code = 500;
          success = false;
          error = 'Can not find room/chat wih this name/admin';
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
  }
  ctx.status = code;
  ctx.body = {
    success,
    error,
  };
});

router.get('/api/chat/:id', authenticated, async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  const id = ctx.params.id;
  try {
    const out = await Chat().findOne({_id: new mongo.ObjectId(id)});
    if (!empty(out)) {
      code = 200;
      success = true;
    } else {
      code = 500;
      success = false;
    }
  } catch (err) {
    error = err;
    success = false;
    code = 500;
  }
  ctx.status = code;
  ctx.body = {
    success,
    error,
  };
});

module.exports = router;
