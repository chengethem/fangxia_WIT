const nav = require('../../model/nav.json');
export default async (ctx, next) => {
  const title = '设计理念';
  await ctx.render('concept', {
    title,
    nav
  });
}
