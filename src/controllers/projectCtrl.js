const projects = require('../../model/projects.json');
const nav = require('../../model/nav.json');
export default async (ctx, next) => {
  const title = '';
  const project = projects[ctx.params.id];
  const nav_list = JSON.parse(JSON.stringify(nav));
  nav_list[1].cur = true;
  await ctx.render('project', {
    title,
    nav: nav_list,
    project
  });
}
