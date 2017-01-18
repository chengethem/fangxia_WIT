const projects = require('../../model/projects.json');
const nav = require('../../model/nav.json');
module.exports = async (ctx, next) => {
  const title = '';
  await ctx.render('index', {
    title,
    nav,
    projects
  });
}
