const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
app.use(require('koa-bodyparser')());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status) {
      ctx.status = err.status;
      ctx.body = {error: err.message};
    } else {
      console.error(err);
      ctx.status = 500;
      ctx.body = {error: 'Internal server error'};
    }
  }
});

const router = new Router();

router.post('/login', require('./controllers/login').login);

router.get('/oauth/:strategy', require('./controllers/login').oauth);
router.get('/oauth/callback/:strategy', require('./controllers/login').oauth);

router.get('/me', require('./controllers/me').get);

app.use(router.routes());

module.exports = app;
