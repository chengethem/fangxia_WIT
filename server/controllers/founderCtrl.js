const founders = require('../../model/founder.json');
const nav = require('../../model/nav.json');
module.exports = async (ctx, next) => {
  const title = '';
  const nav_list = JSON.parse(JSON.stringify(nav));
  nav_list[0].cur = true;
  await ctx.render('founder', {
    title,
    nav: nav_list,
    founders
  });
}
