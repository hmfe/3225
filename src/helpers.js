'use strict';

const createElement = (tag = "DIV", content = "", ...classes) => {
  const el = document.createElement(tag);
  el.classList.add(...classes);
  el.innerHTML = content;
  return el;
};
