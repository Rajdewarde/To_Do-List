// =========================
// Global Variables
// =========================

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// HTML Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// =========================
// Load Existing Tasks
// =========================

displayTasks();

// =========================
// Add Task
// =========================

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task.");
        return;
    }

    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    taskInput.value = "";

    displayTasks();
}

// =========================
// Display Tasks
// =========================

function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";

    }

    tasks.forEach((task, index) => {

        taskList.innerHTML += `

        <li class="list-group-item">

            <div class="task-left">

                <input
                    type="checkbox"
                    ${task.completed ? "checked" : ""}
                    onclick="toggleTask(${index})">

                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>

            </div>

            <div class="action-btn">

                <button
                    class="btn btn-warning btn-sm"
                    onclick="editTask(${index})">

                    <i class="fa-solid fa-pen"></i>

                </button>

                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteTask(${index})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </li>

        `;
    });

    updateCounter();
}

// =========================
// Delete Task
// =========================

function deleteTask(index) {

    if (confirm("Delete this task?")) {

        tasks.splice(index, 1);

        saveTasks();

        displayTasks();

    }

}

// =========================
// Complete Task
// =========================

function toggleTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}

// =========================
// Edit Task
// =========================

function editTask(index) {

    let updated = prompt("Edit Task", tasks[index].text);

    if (updated === null) return;

    updated = updated.trim();

    if (updated === "") {

        alert("Task cannot be empty.");

        return;

    }

    tasks[index].text = updated;

    saveTasks();

    displayTasks();

}

// =========================
// Update Counter
// =========================

function updateCounter() {

    totalTasks.textContent = tasks.length;

    let completed = tasks.filter(task => task.completed).length;

    completedTasks.textContent = completed;

    pendingTasks.textContent = tasks.length - completed;

}

// =========================
// Save Local Storage
// =========================

function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

}