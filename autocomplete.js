'use strict';

class Autocomplete {
  onClick = null;
  el = null;
  currentFocus;

  constructor(onClick = null) {
    this.onClick = onClick;
    document.addEventListener("click", (e) => this.closeAllLists(e.target));
  }

  setNode(el) {
    if (this.el) {
      this.el.removeEventListener("input", this.onInput);
      this.el.removeEventListener("keydown", this.onKeyDown);
    }
    this.el = el;
    this.el.addEventListener("input",  _.debounce(this.onInput, 500));
    this.el.addEventListener("keydown", this.onKeyDown);
  }

  onInput = async () => {
    const val = this.el.value;
    let options = [];

    const request = new Request(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${val}`);

    const response = await fetch(request);
    if (response) {
      const items = await response.json();
      options = items.map(i => i.name);
    }

    this.closeAllLists();
    if (!val) {
      return false;
    }
    this.currentFocus = -1;
    const list = document.createElement("DIV");
    list.setAttribute("id", this.el.id + "autocomplete-list");
    list.setAttribute("class", "autocomplete-items");
    this.el.parentNode.appendChild(list);
    for (const option of options) {
      if (option.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
        list.appendChild(this.renderListItem(option, val));
      }
    }
  };

  onKeyDown = (e) => {
    const list = document.getElementById(this.el.id + "autocomplete-list");
    const arr = list ? list.getElementsByTagName("div") : [];
    switch (e.key) {
      case "ArrowDown":
        this.currentFocus++;
        this.addActive(arr);
        break;
      case "ArrowUp":
        this.currentFocus--;
        this.addActive(arr);
        break;
      case "Enter":
        e.preventDefault();
        if (this.currentFocus > -1 && arr && arr[this.currentFocus]) {
          arr[this.currentFocus].click();
        }
        break;
      default:
        break;
    }
  };

  addActive = (arr) => {
    if (!arr) return false;
    this.removeActive(arr);
    if (this.currentFocus >= arr.length) this.currentFocus = 0;
    if (this.currentFocus < 0) this.currentFocus = (arr.length - 1);
    arr[this.currentFocus].classList.add("autocomplete-active");
  };

  removeActive = (arr) => {
    for (const item of arr) {
      item.classList.remove("autocomplete-active");
    }
  };

  closeAllLists = (elmnt) => {
    const arr = document.getElementsByClassName("autocomplete-items");
    for (const item of arr) {
      if (elmnt !== item && elmnt !== this.el) {
        item.parentNode.removeChild(item);
      }
    }
  };

  renderListItem = (option, val) => {
    const resultLine = document.createElement("DIV");

    const highlightPart = document.createElement("span");
    highlightPart.setAttribute("class", "autocomplete-strong");
    highlightPart.innerText = option.substr(0, val.length);

    const restPart = document.createElement("span");
    restPart.innerText = option.substr(val.length);

    resultLine.appendChild(highlightPart);
    resultLine.appendChild(restPart);
    resultLine.addEventListener("click", () => {
      this.el.value = option;
      if (this.onClick) this.onClick(option);
      this.closeAllLists();
    });
    return resultLine;
  };
}
