const Router = require('koa-router');
const router = new Router();

/* PRIMER API ENDPOINTA IN KAKO SE NAJ PIŠEJO */
router.get('/api/getRoom/:roomId', async (ctx) => {
  let code = null;
  let success = null;
  let error = null;
  let data = null;
  try {
    const {roomId} = ctx.params;
    data = roomId;
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

module.exports = router;
