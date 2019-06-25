'use strict';

class AutocompleteList {
  options = [];
  value = '';
  onClick = null;
  list = null;
  currentFocus = -1;

  constructor(options, value, onClick) {
    this.options = options;
    this.onClick = onClick;
    this.value = value;
  }

  render = () => {
    this.currentFocus = -1;
    this.list = createElement("DIV", "", "autocomplete-items");
    for (const option of this.options) {
      if (option.substr(0, this.value.length).toUpperCase() === this.value.toUpperCase()) {
        this.list.appendChild(this.renderListItem(option));
      }
    }
    return this.list;
  };

  renderListItem = (option) => {
    const resultLine = createElement("DIV");
    const highlightPart = createElement("SPAN", option.substr(0, this.value.length), "autocomplete-strong");
    const restPart = createElement("SPAN", option.substr(this.value.length));

    resultLine.appendChild(highlightPart);
    resultLine.appendChild(restPart);
    resultLine.addEventListener("click", () => {
      if (this.onClick) this.onClick(option);
    });
    return resultLine;
  };

  focusUp() {
    this.currentFocus--;
    this.markActive();
  }

  focusDown() {
    this.currentFocus++;
    this.markActive();
  }

  focusClick() {
    if (this.currentFocus > -1 && this.options[this.currentFocus] && this.onClick) {
      this.onClick(this.options[this.currentFocus]);
    }
  }

  markActive = () => {
    const arr = this.list ? this.list.getElementsByTagName("div") : [];
    if (!arr) return false;
    for (const item of arr) {
      item.classList.remove("autocomplete-active");
    }
    if (this.currentFocus >= arr.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (arr.length - 1);
    arr[this.currentFocus].classList.add("autocomplete-active");
  };
}
