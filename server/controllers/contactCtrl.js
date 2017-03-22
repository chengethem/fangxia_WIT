const contact = require('../../model/contact.json');
const nav = require('../../model/nav.json');
module.exports = async (ctx, next) => {
  const title = '联系我们';
  const nav_list = JSON.parse(JSON.stringify(nav));
  nav_list[2].cur = true;
  console.info('_debug_', nav_list);
  await ctx.render('contact', {
    title,
    nav: nav_list,
    contact
  });
}
