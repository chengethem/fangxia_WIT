const nav = require('../../model/nav.json');
export default async (ctx, next) => {
  const title = '设计理念';
  const nav_list = JSON.parse(JSON.stringify(nav));
  nav_list[0].cur = true;
  await ctx.render('concept', {
    title,
    nav: nav_list
  });
}
