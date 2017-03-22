const projects = require('../../model/projects.json');
const nav = require('../../model/nav.json');
module.exports = async (ctx, next) => {
  const title = '';
  const nav_list = JSON.parse(JSON.stringify(nav));
  nav_list[1].cur = true;
  await ctx.render('projects', {
    title,
    nav: nav_list,
    projects
  });
}
