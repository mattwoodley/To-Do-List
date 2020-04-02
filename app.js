// Select all elements

const clear = document.querySelector(".clear");
const date = document.querySelector("#date");
const listContainer = document.querySelector("#list-container");
const input = document.querySelector("#input");

// Create list array and id

const list = [];
let id = 0;

// Show Today's Date

const today = new Date();
const dateOptions = { weekday: "long", month: "short", day:"numeric"};

date.innerHTML = today.toLocaleDateString("en-GB", dateOptions);

addToDo = (id, toDo, completed, deleted) => {
    // check if deleted === true, if so then don't run code below.
    if (deleted) { return; }

    //  check completed state to decide what css styles to apply
    let [completedCheck, lineThrough] = ["", ""];
    if (completed) {
        completedCheck = "fa-check-circle"
        lineThrough = "lineThrough"
    } else {
        completedCheck = "fa-circle"
    }
    newToDo = `
        <li class="toDo">
            <i class="far ${completedCheck}" job="complete" id="${id}"></i>
            <p class="text ${lineThrough}">${toDo}</p>
            <i class="fa fa-trash" job="delete" id="${id}"></i>
        </li>
    `
    listContainer.insertAdjacentHTML("beforeend", newToDo)
}

// enter keyup to submit new toDo onto list
document.addEventListener("keyup", (evt) => {
    if(evt.keyCode === 13) {
        const toDo = input.value;
        
        // check if toDo is empty
        if(toDo.length !== 0) {
            addToDo(id, toDo, false, false);
            list.push({
                toDoName: toDo,
                id: id,
                completed: false,
                deleted: false
            });
            id++;
        } else {
            throw "Error: To Do cannot contain zero characters."
        }
        input.value = "";
    }
});

// delete to do

deleteToDo = (toDo) => {
    toDo.parentNode.parentNode.removeChild(toDo.parentNode);
    list[toDo.id].deleted = true;
}

listContainer.addEventListener("click", (evt) => {
    let toDoContainer = evt.target;
    let toDoJob = null;
    if (toDoContainer.hasAttribute("job")) {
        toDoJob = toDoContainer.attributes.job.value; //complete or delete
        if (toDoJob === "complete") {
            completeToDo(toDoContainer);
        } else if (toDoJob === "delete") {
            deleteToDo(toDoContainer);
        } else {
            return;
        }
    }
});

addToDo(0, "Hello World", false, false);
addToDo(1, "True", false, false);