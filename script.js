document.querySelector('#push').onclick = function() {
    if (document.querySelector('#newtask input').value.length === 0) {
        alert("Please Enter a Task");
    } else {
        const taskName = document.querySelector('#newtask input').value;
        const reminderTime = document.querySelector('#reminder').value;

        const taskElement = document.createElement("div");
        taskElement.classList.add("task");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("task-checkbox");
        taskElement.appendChild(checkbox);

        const taskInfoElement = document.createElement("div");
        taskInfoElement.classList.add("task-info");

        const taskNameElement = document.createElement("span");
        taskNameElement.classList.add("task-name");
        taskNameElement.innerText = taskName;
        taskInfoElement.appendChild(taskNameElement);

        const taskTimeElement = document.createElement("span");
        taskTimeElement.classList.add("task-time");
        taskTimeElement.style.fontSize = "12px"; // Smaller font size
        taskTimeElement.style.color = "#aaa"; // Lighter color

        if (reminderTime) {
            const currentTime = new Date();
            const reminderDate = new Date(reminderTime);
            const timeDifference = reminderDate - currentTime;

            if (timeDifference > 0) {
                const remainingTime = formatTime(timeDifference);
                taskTimeElement.innerText = `Time left: ${remainingTime}`;

                setTimeout(() => {
                    showNotification(`Reminder: Task ${taskName}`);
                }, timeDifference);
            }
        }

        taskInfoElement.appendChild(taskTimeElement);
        taskElement.appendChild(taskInfoElement);

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = '<i class="far fa-trash-alt"></i>';
        taskElement.appendChild(deleteButton);

        document.querySelector('#tasks').appendChild(taskElement);

        // Delete Task
        deleteButton.onclick = function() {
            taskElement.remove();
        };

        // Checkbox Behavior
        checkbox.onchange = function() {
            if (this.checked) {
                taskElement.classList.add("completed");
                document.querySelector("#donetasks").appendChild(taskElement);
            } else {
                taskElement.classList.remove("completed");
                document.querySelector("#tasks").appendChild(taskElement);
            }
        };

        // Clear Input and Reminder
        document.querySelector("#newtask input").value = "";
        document.querySelector("#reminder").value = "";
    }
};

function showNotification(message) {
    if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification(message);
            }
        });
    }
}

function formatTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
}
