'use strict';

class HistoryListItem {
  onDelete = null;
  item = null;

  constructor(item, onDelete) {
    this.item = item;
    this.onDelete = onDelete;
  }

  render = () => {
    const line = document.createElement("LI");
    line.setAttribute("class", "flex flex-line");

    const value = document.createElement("SPAN");
    value.setAttribute("class", "flex-1 text-overflow");
    value.innerText = this.item.title;

    const time = document.createElement("TIME");
    time.setAttribute("class", "text-light text-small");
    time.innerHTML = this.item.date.toISOString().substring(0, 10) + ", " + this.item.date.toTimeString().substring(0, 5);

    const button = document.createElement("BUTTON");
    button.setAttribute("class", "btn-fab");
    button.innerHTML = "&times;";
    button.addEventListener("click", this.onDelete);

    line.appendChild(value);
    line.appendChild(time);
    line.appendChild(button);

    return line;
  };

}
