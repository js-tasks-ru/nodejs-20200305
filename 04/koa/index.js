const Koa = require('koa');


const app = new Koa();

/*
*
* promise1()
*   .then(() => {
*     return promise2();
*   })
*   .then(() => {
*     return promise3(); // 3s
*   })
*   .then(function final() {
*     // immediate
*   });
*
* */

app.use(async (ctx, next) => {
  const time = process.hrtime();
  console.log('request start', ctx.url);
  
  await next();
  
  console.log('request end', ctx.url, ctx.status, process.hrtime(time)[0]);
});

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.body = 'internal server error';
  }
});

// app.use((ctx, next) => {
//   return new Promise((resolve, reject) => {
//
//     let count = 0;
//     ctx.req.on('data', chunk => {
//       count += chunk.length;
//       if (count > 10) {
//         ctx.status = 413;
//         ctx.body = 'too big';
//         resolve();
//       }
//     });
//
//     ctx.req.on('end', resolve);
//
//   });
// });

app.use(require('koa-bodyparser')());

// app.use(async (ctx, next) => {
//
//   const body = [];
//   for await (const chunk of ctx.req) {
//     body.push(chunk);
//   }
//
//   ctx.request.body = JSON.parse(Buffer.concat(body).toString('utf-8'));
//
//   return next();
// });

app.use(async (ctx, next) => {
  if (ctx.url !== '/bye') return next();
  ctx.query
  ctx.body = 'Bye, Ivan!';
});

app.use(async (ctx, next) => {
  if (ctx.url !== '/hello') return next();
  
  await sleep(3000);
  
  throw new Error('Error!!!');
  
  ctx.body = 'Hello, Ivan!';
});

app.use(async (ctx, next) => {
  if (ctx.url !== '/message') return next();
  
  ctx.body = ctx.request.body.message;
});

const Router = require('koa-router');
const router = new Router();

router.get('/user/:username?', async (ctx, next) => {
  ctx.body = `hello ${ctx.params.username}`;
});

app.use(router.routes());

app.listen(3000);


function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
