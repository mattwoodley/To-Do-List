// Select all elements

const clear = document.querySelector(".clear");
const date = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");


// Show Today's Date

const today = new Date();
const dateOptions = { weekday: "long", month: "short", day:"numeric"};

date.innerHTML = today.toLocaleDateString("en-GB", dateOptions);