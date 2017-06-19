// const projects = require('../../model/projects.json');
const fs = require('fs');
const readContent = require('../lib/readContent');
// const nav = require('../../model/nav.json');
module.exports = async (ctx, next) => {
  const title = '';
  const projects = JSON.parse(await readContent('projects'));
  const project = projects[ctx.params.id];
  const nav_list = JSON.parse(await readContent('nav'));
  nav_list[1].cur = true;
  await ctx.render('project', {
    title,
    nav: nav_list,
    project
  });
}
