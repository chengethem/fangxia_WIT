const banner = require('../../model/banner.json');
const nav = require('../../model/nav.json');
export default async (ctx, next) => {
  const title = 'koa2 title';
  await ctx.render('index', {
    title,
    nav,
    banner
  });
}
