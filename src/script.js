'use strict';

const searchList = new HistoryList();
const autocomplete = new Autocomplete("https://autocomplete.clearbit.com/v1/companies/suggest", (v) => searchList.addItem(v));

document.addEventListener("DOMContentLoaded", () => {
  searchList.setNode(document.getElementById("historyList"));
  autocomplete.setNode(document.getElementById("acInput"));
});
