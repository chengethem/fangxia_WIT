// const founders = require('../../model/founder.json');
// const nav = require('../../model/nav.json');
const fs = require('fs');
const readContent = require('../lib/readContent');
module.exports = async (ctx, next) => {
  const title = '';
  // const nav_list = JSON.parse(JSON.stringify(nav));
  const founders = JSON.parse(await readContent('founder'));
  const nav_list = JSON.parse(await readContent('nav'));
  nav_list[0].cur = true;
  await ctx.render('founder', {
    title,
    nav: nav_list,
    founders
  });
}
