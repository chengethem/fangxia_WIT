const contact = require('../../model/contact.json');
const nav = require('../../model/nav.json');
export default async (ctx, next) => {
  const title = '联系我们';
  await ctx.render('contact', {
    title,
    nav,
    contact
  });
}
