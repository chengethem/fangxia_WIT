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
function writeFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}
async function readContent(contentType) {
  const contents = await readFile(path.join(__dirname, '../../', `model/${contentType}.json`));
  return contents;
}
async function writeContent(contentType, data) {
  await writeFile(path.join(__dirname, '../../', `model/${contentType}.json`), data);
}
module.exports = async (ctx, next) => {
  // console.info(ctx.params, ctx.request.body);
  // { contentType: 'contact' }
  // { json: '{"contentType":"contact","item":{"name":"方夏建筑设计（北京）有限公司a"}}' }
  const data = JSON.parse(ctx.request.body.json);
  const { contentType, item, id } = data;
  let contents = await readContent(contentType);
  contents = JSON.parse(contents);
  console.info('~~~', id, id > 0);
  if (id >= 0) {
    // contents[+id] = item;
    Object.assign(contents[+id], item);
    console.info('update_content_id>0', id, item, contents[+id]);
  } else {
    Object.assign(contents, item);
  }
  console.info('update_content', contents instanceof Array, '#', contents[+id]);
  await writeContent(contentType, JSON.stringify(contents));
  return ctx.body = {
    contentType,
    contents
  }
}
