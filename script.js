document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");
    const clearAllButton = document.getElementById("clear-all");

    window.addTask = function addTask() {
        if (inputBox.value.trim() === '') {
            alert("You must enter something");
            return;
        }
        
        // Create and append the new task
        const li = document.createElement("li");
        li.textContent = inputBox.value.trim();
        li.appendChild(createCloseButton());
        li.setAttribute('draggable', true); // Make list items draggable
        listContainer.appendChild(li);

        inputBox.value = "";
        saveData();
    }

    listContainer.addEventListener("click", function(e) {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "SPAN") {
            e.target.parentElement.remove();
            saveData();
        }
    }, false);

    inputBox.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault(); 
            addTask();
        }
    });

    // Drag and Drop Events
    listContainer.addEventListener("dragstart", function(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
        e.target.classList.add("dragging");
    });

    listContainer.addEventListener("dragover", function(e) {
        e.preventDefault(); // Allow drop
        const draggingItem = document.querySelector(".dragging");
        const afterElement = getDragAfterElement(listContainer, e.clientY);
        if (afterElement == null) {
            listContainer.appendChild(draggingItem);
        } else {
            listContainer.insertBefore(draggingItem, afterElement);
        }
    });

    listContainer.addEventListener("dragend", function(e) {
        e.target.classList.remove("dragging");
        saveData();
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    function createCloseButton() {
        const span = document.createElement("span");
        span.textContent = '×'; // Use textContent for security
        span.className = 'close'; // Add class for styling if needed
        return span;
    }

    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    function showTask() {
        const data = localStorage.getItem("data");
        if (data) {
            listContainer.innerHTML = data;
            // Reapply draggable attribute
            listContainer.querySelectorAll("li").forEach(item => {
                item.setAttribute('draggable', true);
            });
        }
    }

    showTask();
    window.clearAllTasks = function clearAllTasks() {
        if (conform("Are you sure you want to clear all tasks?"));
        saveData();
    }




});


