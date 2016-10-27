const founders = require('../../model/founder.json');
const nav = require('../../model/nav.json');
export default async (ctx, next) => {
  const title = '';
  await ctx.render('founder', {
    title,
    nav,
    founders
  });
}
