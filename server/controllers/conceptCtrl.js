const readContent = require('../lib/readContent');

module.exports = async (ctx, next) => {
  const title = '设计理念';
  const nav_list = JSON.parse(await readContent('nav'));
  nav_list[0].cur = true;
  await ctx.render('concept', {
    title,
    nav: nav_list
  });
}
