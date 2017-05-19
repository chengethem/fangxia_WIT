const contact = require('../../model/contact.json');
const nav = require('../../model/nav.json');
const fs = require('fs');
const path = require('path');

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(data);
    });
  });
}
async function readContent(contentType) {
  const contents = await readFile(path.join(__dirname, '../../', `model/${contentType}.json`));
  return contents;
}
module.exports = async (ctx, next) => {
  const contentType = ctx.params.contentType;
  const contents = await readContent(contentType);
  return ctx.body = {
    contentType,
    contents: JSON.parse(contents)
  }
}
