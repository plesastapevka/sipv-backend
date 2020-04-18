const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'some_secret';


// Middleware, ki preverja ce je uporabnik prijavljen
// skozi to funkcijo gre vsaki route, za katerega moras bit prijavljen
module.exports = async (ctx, next) => {
	let error = null;
	let code = null;
	console.log(ctx);
	if (!ctx.headers.authorization) {
		code = 403;
		error = 'No token';
console.log(error);
		ctx.throw(code, error);
	}
	else {
		const token = ctx.headers.authorization.split(' ')[1];
		
		try {
			ctx.request.jwtPayload = jwt.verify(token, secret);
			// v ctx.request.jwtPayload.sub se shrani id prijavljenega uporabnika, for further use
			
		} catch (err) {
			console.log(err);
			code = err.status || 403;
			error = err;
			ctx.throw(code, error);
		}
	}
	
	await next();

};