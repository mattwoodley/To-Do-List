// Select all elements

const clear = document.querySelector(".clear");
const date = document.querySelector("#date");
const list = document.querySelector("#list");
const input = document.querySelector("#input");


// Show Today's Date

const today = new Date();
const dateOptions = { weekday: "long", month: "short", day:"numeric"};

date.innerHTML = today.toLocaleDateString("en-GB", dateOptions);

addToDo = (id, toDo, completed, deleted) => {

    // check if deleted === true, if so then don't run code below.
    if (deleted) { return; }

    //  check completed state to decide what css styles to apply
    let check = ""
    let line = ""
    if (completed) {
        check = "fa-check-circle"
        line = "lineThrough"
    } else {
        check = "fa-circle"
    }

    newItem = `
        <li class="item">
            <i class="far ${check}" job="complete" id="${id}"></i>
            <p class="text ${line}">${toDo}</p>
            <i class="fa fa-trash" job="delete" id="${id}"></i>
        </li>
    `

    list.insertAdjacentHTML("beforeend", newItem)
}

// enter keyup to submit new toDo onto list
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