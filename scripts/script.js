var tasks = [];

function addTask() {
    const input = document.getElementById("task-text");
    const taskText = input.value.trim();
    if (taskText === "") {
        alert("Você tentou adicionar uma tarefa sem texto");
        return;
    }
    const newTask = {
        id: Math.floor(Math.random() * 1000000),
        text: taskText,
        completed: false,
    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
    input.value = "";
    input.focus();
}

function render() {
    const tasklist = document.getElementById("task-list");
    tasklist.innerHTML = "";
    for (var i = 0; i < tasks.length; i++) {
        const li = document.createElement("li");
        if (tasks[i].completed === true) {
            li.classList.add("completed");
        }
        const span = document.createElement("span");
        span.textContent = tasks[i].text;

        const finish = document.createElement("span");
        finish.textContent = tasks[i].completed ? "close" : "check";
        finish.classList.add("check");
        finish.classList.add("material-symbols-outlined");
        finish.setAttribute("onclick", `toogleTask(${tasks[i].id})`);
        

        const edit = document.createElement("span");
        edit.textContent = "edit";
        edit.classList.add("edit");
        edit.classList.add("material-symbols-outlined");
        edit.setAttribute("onclick", `editTask(${tasks[i].id})`);
        

        const deletar = document.createElement("span");
        deletar.textContent = "delete";
        deletar.classList.add("delete");
        deletar.classList.add("material-symbols-outlined");
        deletar.setAttribute("onclick", `deletTask(${tasks[i].id})`);
        

        const div = document.createElement("div");
        div.appendChild(finish);
        div.appendChild(edit);
        div.appendChild(deletar);
        li.appendChild(span);
        li.appendChild(div);
        tasklist.appendChild(li);
    }
}

function enterKey(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

function createIcon(buttonName, iconName) {
    buttonName.textContent = iconName;
    buttonName.classList.add("material-symbols-outlined");
}

function toogleTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    const currentValue = tasks[index].completed;
    tasks[index].completed = !currentValue;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

function editTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    const newTaskText = prompt("Edite a tarefa:", tasks[index].text);
    if (newTaskText !== null && newTaskText.trim() !== "") {
        tasks[index].text = newTaskText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        render();
    }
}

function deletTask(id) {
    const index = tasks.findIndex((task) => task.id === id);
    tasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

function loadTasks() {
    const tasksLocalStorage = localStorage.getItem("tasks");
    if (tasksLocalStorage) {
        tasks = JSON.parse(tasksLocalStorage);
        render();
    }
}
