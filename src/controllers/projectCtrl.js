const projects = require('../../model/projects.json');
const nav = require('../../model/nav.json');
export default async (ctx, next) => {
  const title = '';
  const project = projects[ctx.params.id];
  await ctx.render('project', {
    title,
    nav,
    project
  });
}
