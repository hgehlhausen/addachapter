// const marked = require('marked');
import marked from 'marked';
/**
 * https://marked.js.org/#/USING_PRO.md#renderer
 */

const renderer = new Proxy(new marked.Renderer(), {
  get(target, prop) {
    if (Reflect.has(target, prop)) {
      return target[prop];
    }
  }
});

Object.assign(renderer, {
  paragraph(text) {
    if (text === '\\page') {
      return `</div><div class="page">`;
    }
    return `<p>${text}</p>`;
  }
});

export default (raw) => {
  return `<div class="page">${marked(raw, { renderer })}</div>`;
};
