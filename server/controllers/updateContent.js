const contact = require('../../model/contact.json');
const nav = require('../../model/nav.json');
const fs = require('fs');
const path = require('path');
const readContent = require('../lib/readContent');

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

async function writeContent(contentType, data) {
  await writeFile(path.join(__dirname, '../../', `model/${contentType}.json`), data);
}
module.exports = async (ctx, next) => {
  const data = JSON.parse(ctx.request.body.json);
  console.info('DATA_REQUEST', data);
  const { contentType, item, remove, add } = data;
  const id = +data.id;
  let contents = await readContent(contentType);
  contents = JSON.parse(contents);

  if (id >= 0) {
    if (remove) {//remove a item
      // console.info('DEBUG_UPDATE_REMOVE', id, remove, contents);
      contents = contents.filter(item => +item.id !== +id);
      // console.info('DEBUG_UPDATE_REMOVE2', id, remove, contents.length);
      contents = contents.map((item, index) => {
        item.order = index + 1;
        return item;
      });
    } else {//update && add a item
      // contents[+id] = item;
      Object.assign(item, { id });
      let order;
      let index = contents.findIndex((item) => +item.id === +id);
      // console.info('ITEM_INDEX', index, contents, id);
      if (index < 0) {
        index = contents.length;
      }
      if (item.order > 0) {
        order = +item.order;
        delete item.order;
      }
      if (contents[index]) {
        Object.assign(contents[index], item);
      } else {
        contents[index] = Object.assign({}, item, { order: index + 1 });
      }
      console.info('add_new_item', index, contents[index]);
      // contents[index] = Object.assign(contents[index] || {}, item);
      // console.info('update_content_id>0', order, id, item, contents[+id]);
      let new_item = Object.assign({}, contents[index]);
      contents = contents.sort((a, b) => {
        return a.order - b.order;
      });

      if (order > 0) {
        contents = contents.filter(item => +item.id !== +id);
        contents.splice(order - 1, 0, new_item);
      }

      // console.info('ITEM_ORDER', contents);
      contents = contents.map((item, index) => {
        item.order = index + 1;
        return item;
      });
      contents.sort((a, b) => {
        return a.id - b.id;
      });
    }
  } else {
    Object.assign(contents, item);
  }
  // console.info('update_content', contents instanceof Array, '#', contents[+id]);
  await writeContent(contentType, JSON.stringify(contents));
  return ctx.body = {
    contentType,
    contents
  }
}
