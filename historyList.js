'use strict';

class HistoryItem {
  item = "";
  date = new Date;
  constructor(item) {
    this.item = item;
  }
}

class HistoryList {
  arr = [];
  el = null;

  setNode(el) {
    this.el = el;
    this.render();
  }

  addItem = (item) => {
    this.arr.unshift(new HistoryItem(item));
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
      this.el.appendChild(this.renderItem(this.arr[i], i));
    }
  };

  renderItem = (item, index) => {
    const line = document.createElement("LI");
    line.setAttribute("class", "flex flex-line");

    const value = document.createElement("SPAN");
    value.setAttribute("class", "flex-1 text-overflow");
    value.innerText = item.item;

    const time = document.createElement("TIME");
    time.setAttribute("class", "text-light text-small");
    time.innerHTML = item.date.toISOString().substring(0, 10) +", " +item.date.toTimeString().substring(0, 5);

    const button = document.createElement("BUTTON");
    button.setAttribute("class", "btn-fab");
    button.innerHTML = "&times;";
    button.addEventListener("click", () => this.removeByIndex(index));

    line.appendChild(value);
    line.appendChild(time);
    line.appendChild(button);

    return line;
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
