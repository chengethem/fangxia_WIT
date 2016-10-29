const projects = require('../../model/projects.json');
const nav = require('../../model/nav.json');
export default async (ctx, next) => {
  const title = 'koa2 title';
  await ctx.render('index', {
    title,
    nav,
    projects
  });
}
