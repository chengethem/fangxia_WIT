const http = require('http');
const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const convert = require('koa-convert');
const json = require('koa-json');
const Bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaStatic = require('koa-static-plus');
const koaOnError = require('koa-onerror');
// const config = require('./config');
// const routes = require('./routes');
const routes = require('./routes');

const app = new Koa();
const bodyparser = Bodyparser();

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

// static
app.use(convert(koaStatic(path.join(__dirname, '../public'), {
  pathPrefix: '',
})));

// views
app.use(views(path.join(__dirname, '../views'), {
  map: {
    html: 'dust',
    dt:'dust'
  },
  extension: 'dt'
}));

// 500 error
// koaOnError(app, {
//   template: 'views/500.ejs'
// });

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// response router
app.use(async (ctx, next) => {
  await routes.routes()(ctx, next);
});

// 404
app.use(async (ctx) => {
  ctx.status = 404;
  await ctx.render('404');
});

// error logger
app.on('error', async (err, ctx) => {
  console.log('error occured:', err);
});

// // const port = +(config.port || '3000');
let port = 3000;
if (process.env.NODE_ENV === 'production') {
  port = 80;
}

const server = http.createServer(app.callback());

server.listen(port);
server.on('error', (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  console.log('Listening on port: %d', port);
});

module.exports = app;