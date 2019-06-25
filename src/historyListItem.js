'use strict';

class HistoryListItem {
  onDelete = null;
  item = null;

  constructor(item, onDelete) {
    this.item = item;
    this.onDelete = onDelete;
  }

  render = () => {
    const prettyTime = this.item.date.toISOString().substring(0, 10) + ", " + this.item.date.toTimeString().substring(0, 5);

    const line = createElement("LI", "", "flex", "flex-line");
    const value = createElement("SPAN", this.item.title, "flex-1", "text-overflow");
    const time = createElement("TIME", prettyTime, "text-light", "text-small");
    const button = createElement("BUTTON", "&times;", "btn-fab");
    button.addEventListener("click", this.onDelete);

    line.appendChild(value);
    line.appendChild(time);
    line.appendChild(button);

    return line;
  };

}
