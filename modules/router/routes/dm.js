/* eslint-disable new-cap, max-len */
const Router = require('koa-router');
const mongo = require('mongodb');
const router = new Router();

const {Rooms, Chat, DMs} = require('../../config/mongo');
const {empty, getDateTime} = require('../../config/util');

// samo testni primer, DM se naj ustvari ob dodajanju prijatelja
router.post('/api/createDM', async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let out = null;
  try {
    const {user1, user2} = ctx.request.body;
    out = await DMs().findOne({$and: [{Users: {$elemMatch: {User: user1}}}, {Users: {$elemMatch: {User: user2}}}]});
    if (empty(out)) {
      out = await DMs().insertOne({Users: [{User: user1}, {User: user2}], Chat: []});
      if (!empty(out)) {
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
      error = 'DMs already exists!';
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

router.get('/api/getDMs/:id', async (ctx) => {
  let code = null;
  let success= null;
  let error = null;
  let data = null;
  const dmId = ctx.params.id;
  try {
    data = await DMs().findOne({_id: new mongo.ObjectId(dmId)});
    if (!empty(data)) {
      code = 200;
      success = true;
      error = false;
    } else {
      code = 500;
      success = false;
      error = 'Error finding dm.';
    }
  } catch (err) {
    code = 500;
    success = false;
    error = err;
  }
  ctx.status = code;
  ctx.body = {
    error,
    success,
    data,
  };
});

router.put('/api/DMs/:id/:function', async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  const chatId = ctx.params.id;
  const func = ctx.params.function;
  switch (func) {
    case 'addMsg': {
      try {
        const {msg, date, sender, receiver} = ctx.request.body;
        const out = await DMs().findOne({_id: new mongo.ObjectId(chatId)});
        if (!empty(out)) {
          const customId = new mongo.ObjectId();
          const chatObj = {
            id: customId,
            Message: msg,
            Date: date,
            Sender: sender,
            Receiver: receiver,
          };
          const update = await DMs().updateOne({_id: new mongo.ObjectId(chatId)}, {$push: {Chat: chatObj}});
          if (!empty(update)) {
            code = 200;
            success = true;
            error = false;
          } else {
            code = 500;
            success = false;
            error = 'Failed to add msg.';
          }
        } else {
          code = 500;
          success = false;
          error = 'Can not find DM with this id.';
        }
      } catch (err) {
        code = 500;
        error = err;
        success = false;
      }
    }
      break;
    case 'removeMsg': {
      try {
        const {msgId} = ctx.request.body;
        const out = await DMs().findOne({_id: new mongo.ObjectId(chatId)});
        if (!empty(out)) {
          const update = await DMs().updateOne({_id: new mongo.ObjectId(chatId)}, {$pull: {Chat: {id: new mongo.ObjectId(msgId)}}});
          if (!empty(update)) {
            code = 200;
            success = true;
            error = false;
          } else {
            code = 500;
            success = false;
            error = 'Failed to remove msg.';
          }
        } else {
          code = 500;
          success = false;
          error = 'Can not find Dm with this id.';
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
