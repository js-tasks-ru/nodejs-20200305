const Koa = require('koa');
const Router = require('koa-router');
const User = require('./models/User');

const validateIdMiddleware = require('./lib/validateIdMiddleware');
const mongooseValidationErrorMiddleware = require('./lib/mongooseValidationErrorMiddleware');

const mapUser = require('./mappers/user');

const app = new Koa();

app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch(err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = err.message;
      return;
    }

    ctx.status = 500;
    ctx.body = 'Internal server error';
    console.error(err);
  }
});

const router = new Router();

router.get('/users', async (ctx) => {
  const users = await User.find();
  ctx.body = users.map(mapUser);
});

router.get('/users/:id', validateIdMiddleware, async (ctx) => {
  const user = await User.findById(ctx.params.id);
  
  if (!user) ctx.throw(404, 'no such user');
  
  ctx.body = mapUser(user);
});

router.delete('/users/:id', validateIdMiddleware, async (ctx) => {
  const user = await User.findByIdAndRemove(ctx.params.id);
  
  if (!user) ctx.throw(404, 'no such user');
  
  ctx.body = 'all done';
});

router.patch('/users/:id', validateIdMiddleware, mongooseValidationErrorMiddleware(402), async (ctx) => {
  const user = await User.findByIdAndUpdate(ctx.params.id, {
    name: ctx.request.body.name,
    gender: ctx.request.body.gender,
  }, { runValidators: true, new: true, omitUndefined: true, });
  
  ctx.body = mapUser(user);
});

router.post('/users', mongooseValidationErrorMiddleware(401), async (ctx) => {
  const user = await User.create({
    email: ctx.request.body.email,
    name: ctx.request.body.name,
    gender: ctx.request.body.gender,
  });
  
  ctx.body = mapUser(user);
});

app.use(router.routes());

module.exports = app;
