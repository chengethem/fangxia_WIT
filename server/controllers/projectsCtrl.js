// const projects = require('../../model/projects.json');
// const nav = require('../../model/nav.json');
const fs = require('fs');
const readContent = require('../lib/readContent');

module.exports = async (ctx, next) => {
  const projects = JSON.parse(await readContent('projects'));
  const nav_list = JSON.parse(await readContent('nav'));
  const title = '';

  nav_list[1].cur = true;
  projects.sort((a, b) => {
    if (a.order && b.order) {
      return a.order - b.order;
    }
    return a.id - b.id;
  });
  await ctx.render('projects', {
    title,
    nav: nav_list,
    projects
  });
}
