'use strict';

class Autocomplete {
  url = '';
  onClick = null;
  el = null;
  list = null;
  debounceInput;

  constructor(url, onClick = null) {
    this.url = url;
    this.onClick = onClick;
    this.debounceInput = _.debounce(this.onInput, 500);
    document.addEventListener("click", (e) => this.closeAllLists(e.target));
  }

  setNode(el) {
    if (this.el) {
      this.el.removeEventListener("input", this.onInput);
      this.el.removeEventListener("keydown", this.debounceInput);
    }
    this.el = el;
    this.el.addEventListener("input", this.debounceInput);
    this.el.addEventListener("keydown", this.onKeyDown);
  }

  onInput = async () => {
    const val = this.el.value;
    this.closeAllLists();
    if (!val) {
      return false;
    }
    let options = [];
    const request = new Request(this.url + `?query=${val}`);
    const response = await fetch(request);
    if (response) {
      const items = await response.json();
      options = items.map(i => i.name);
    }
    this.list = new AutocompleteList(options, val, (v) => {
      this.el.value = v;
      if (this.onClick) this.onClick(v);
      this.closeAllLists();
    });
    this.el.parentNode.appendChild(this.list.render());
  };

  onKeyDown = (e) => {
    if (!this.list) {
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        this.list.focusDown();
        break;
      case "ArrowUp":
        this.list.focusUp();
        break;
      case "Enter":
        e.preventDefault();
        this.list.focusClick();
        break;
      default:
        break;
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
}
