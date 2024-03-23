var todoList = [];
var comdoList = [];
var remList = [];
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deadlineInput = document.getElementById("deadline-input");
var priorityInput = document.getElementById("priority-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

// Event listeners for add and delete
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

// Event listeners for filters
document.addEventListener('click', (e) => {
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e);
    }
    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }
});

// Event listener for Enter key
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

// Update all the remaining, completed, and main lists
function update() {
    comdoList = todoList.filter((ele) => {
        return ele.complete;
    });
    remList = todoList.filter((ele) => {
        return !ele.complete;
    });
    document.getElementById("r-count").innerText = todoList.length.toString();
    document.getElementById("c-count").innerText = comdoList.length.toString();
}

// Adds the task to the main list
function add() {
    var value = todoInput.value;
    var deadline = deadlineInput.value;
    var priority = priorityInput.value;

    if (value === '' || deadline === '') {
        alert("😮 Task and Deadline cannot be empty");
        return;
    }

    todoList.push({
        task: value,
        deadline: deadline,
        priority: priority,
        id: Date.now().toString(),
        complete: false,
    });

    todoInput.value = "";
    deadlineInput.value = "";
    priorityInput.value = "low"; // Reset priority to default
    update();
    addinmain(todoList);
}

// Renders the main list and views it on the main content
function addinmain(todoList) {
    allTodos.innerHTML = "";
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <p id="deadline">Deadline: ${element.deadline}</p>
    <p id="priority">Priority: ${element.priority}</p>
    <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;
        allTodos.innerHTML += x;
    });
}

// Deletes an individual task and updates all the lists
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => {
        return ele.id != deleted;
    });

    update();
    addinmain(todoList);
}

// Completes an individual task and updates all the lists
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true;
                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false;
                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }
        }
    });

    update();
    addinmain(todoList);
}

// Deletes all the tasks
function deleteAll(todo) {
    todoList = [];
    update();
    addinmain(todoList);
}

// Deletes only completed tasks
function deleteS(todo) {
    todoList = todoList.filter((ele) => {
        return !ele.complete;
    });

    update();
    addinmain(todoList);
}

// Functions for filters
function viewCompleted() {
    addinmain(comdoList);
}

function viewRemaining() {
    addinmain(remList);
}

function viewAll() {
    addinmain(todoList);
}
