/* eslint-disable new-cap, max-len */
const Router = require('koa-router');
const socket = require('../../sockets/sockets')
const router = new Router();

const authenticated = require('../../config/authenticated');

/// Request channel - create, join
router.post('/api/channels/requestChannel', authenticated, async (ctx) => {
    let code = null;
    let success = null;
    let error = null;
    var port = null;
    try {
        const { body } = ctx.request;
        port = socket.postChannel(body);
        if (port != null) {
            code = 200;
            success = true;
            error = false;
        }
    } catch (err) {
        code = 500;
        error = err;
        success = false;
    }

    ctx.status = code;
    ctx.body = {
        port,
        error,
        success,
    };
});

module.exports = router;