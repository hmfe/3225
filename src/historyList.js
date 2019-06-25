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
    const line = document.createElement("LI");
    line.setAttribute("class", "flex flex-line");

    const title = document.createElement("H1");
    title.setAttribute("class", "flex-1");
    title.innerHTML = "Search history";

    const button = document.createElement("A");
    button.setAttribute("class", "text-small");
    button.innerHTML = "Clear search history";
    button.addEventListener("click", () => this.removeAll());

    line.appendChild(title);
    line.appendChild(button);

    return line;
  };

  renderPlaceholder = () => {
    const line = document.createElement("LI");
    line.setAttribute("class", "flex flex-line");
    line.innerHTML = "Search history is empty";
    return line;
  };
}
