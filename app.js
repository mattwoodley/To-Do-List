// Select all elements

const clear = document.querySelector(".clear");
const date = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");


// Show Today's Date

const today = new Date();
const dateOptions = { weekday: "long", month: "short", day:"numeric"};

date.innerHTML = today.toLocaleDateString("en-GB", dateOptions);

addToDo = (toDo) => {
    newItem = `
        <li class="item">
            <i class="far fa-circle" job="complete" id="0"></i>
            <p class="text">${toDo}</p>
            <i class="fa fa-trash" job="delete" id="0"></i>
        </li>
    `

    list.insertAdjacentHTML("beforeend", newItem)
}

document.addEventListener("keyup", (evt) => {
    if(evt.keyCode === 13) {
        const toDo = input.value;
        
        // check if toDo is empty
        if(toDo.length !== 0) {
            addToDo(toDo);
        } else {
            throw "Error: To Do contains zero characters."
        }
        input.value = "";
    }
});
