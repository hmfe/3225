'use strict';

class HistoryItem {
  title = "";
  date = new Date;

  constructor(title) {
    this.title = title;
  }
}

class HistoryList {
  arr = [];
  el = null;

  setNode(el) {
    this.el = el;
    this.render();
  }

  addItem = (title) => {
    this.arr.unshift(new HistoryItem(title));
    this.render();
  };

  removeByIndex = (index) => {
    this.arr.splice(index, 1);
    this.render();
  };

  removeAll = () => {
    this.arr = [];
    this.render();
  };

  render = () => {
    if (!this.el) return;
    this.el.innerHTML = "";
    if (this.arr.length) {
      this.el.appendChild(this.renderHeader());
    } else {
      this.el.appendChild(this.renderPlaceholder());
    }
    for (let i = 0; i < this.arr.length; i++) {
      this.el.appendChild(new HistoryListItem(this.arr[i], () => this.removeByIndex(i)).render());
    }
  };

  renderHeader = () => {
    const line = createElement("LI", "", "flex", "flex-line");
    const title = createElement("H1", "Search history", "flex-1");
    const button = createElement("A", "Clear search history", "text-small");
    button.addEventListener("click", () => this.removeAll());
    line.appendChild(title);
    line.appendChild(button);
    return line;
  };

  renderPlaceholder = () => createElement("LI", "Search history is empty", "flex", "flex-line");
}
