// Select all elements

const clear = document.querySelector(".clear");
const date = document.querySelector(".date");
const listContainer = document.querySelector(".list-container");
const input = document.querySelector("#input");
const addToDoButton = document.querySelector(".add-to-do-button");

// Create list array and id

let list, id;

// Show Today's Date

const today = new Date();
const dateOptions = { weekday: "long", month: "short", day:"numeric"};

date.innerHTML = today.toLocaleDateString("en-GB", dateOptions);

const addToDo = (id, toDo, completed, deleted) => {
    // check if deleted === true, if so then don't run code below.
    if (deleted) { return; }

    //  check completed state to decide what css styles to apply
    let [completedCheck, lineThrough] = ["", ""];
    if (completed) {
        completedCheck = "fa-check-circle"
        lineThrough = "line-through"
    } else {
        completedCheck = "fa-circle"
    }
    newToDo = `
        <li class="to-do">
            <i class="far ${completedCheck}" job="complete" id="${id}"></i>
            <p class="text ${lineThrough}">${toDo}</p>
            <i class="fas fa-times-circle" job="delete" id="${id}"></i>
        </li>
    `
    listContainer.insertAdjacentHTML("beforeend", newToDo)
}

// complete to do

const completeToDo = (toDo) => {
    toDo.classList.toggle("fa-check-circle");
    toDo.classList.toggle("fa-circle");
    toDo.parentNode.querySelector(".text").classList.toggle("line-through");    
    list[toDo.id].completed = listContainer[toDo.id].completed ?  false : true;
}

// delete to do

const deleteToDo = (toDo) => {
    toDo.parentNode.parentNode.removeChild(toDo.parentNode);
    list[toDo.id].deleted = true;
}

// load items to the user's interface

const loadList = (array) => {
    array.forEach((item) => {
        addToDo(item.id, item.toDoName, item.completed, item.deleted);
    });
}

// Get item from localStorage

let data = localStorage.getItem("toDo");

// check if data is not empty

if(data) {
    list = JSON.parse(data);
    id = list.length; // set the id to the last one in the list
    loadList(list); // load the list to the user interface
} else {
    // if data is empty
    list = [];
    id = 0;
}

// clear the local storage

clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

// enter keyup to submit new toDo onto list
document.addEventListener("keyup", (evt) => {
    if(evt.key === 'Enter') {
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

            // add item to localStorage (this code must be added where the list array is updated)
            localStorage.setItem("toDo", JSON.stringify(list));

            id++;
        } else {
            throw "Error: To Do cannot contain zero characters."
        }
        input.value = "";
    }
});

// click + to submit new toDo onto list
addToDoButton.addEventListener("click", () => {
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

        // add item to localStorage (this code must be added where the list array is updated)
        localStorage.setItem("toDo", JSON.stringify(list));

        id++;
    } else {
        throw "Error: To Do cannot contain zero characters."
    }
    input.value = "";
});

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
    // add item to localStorage (this code must be added where the list array is updated)
    localStorage.setItem("toDo", JSON.stringify(list));
});

