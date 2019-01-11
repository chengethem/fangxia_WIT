// const projects = require('../../model/projects.json');
// const nav = require('../../model/nav.json');
const fs = require('fs');
const readContent = require('../lib/readContent');
module.exports = async (ctx, next) => {
  const title = '';
  const projects = JSON.parse(await readContent('projects'));
  const nav = JSON.parse(await readContent('nav'));
  console.info('nav__', nav);
  projects.sort((a, b) => {
    if (a.order && b.order) {
      return a.order - b.order;
    }
    return a.id - b.id;
  });
  await ctx.render('index', {
    title,
    nav,
    projects
  });
}
