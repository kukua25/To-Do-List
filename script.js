document.addEventListener("DOMContentLoaded", function() {
    const inputBox = document.getElementById("input-box");
    const listContainer = document.getElementById("list-container");

    window.addTask = function addTask(){
        if(inputBox.value === ''){
            alert("You must enter something");
        } else {
            let li = document.createElement("li");
            li.innerHTML = inputBox.value;
            listContainer.appendChild(li);
            let span = document.createElement("span");
            span.innerHTML = '\u00d7'; // Unicode for multiplication symbol
            li.appendChild(span);
        }
        inputBox.value = "";
        saveData();
    }

    listContainer.addEventListener("click", function(e){
        if(e.target.tagName === "LI"){
            e.target.classList.toggle("checked");
            saveData();
        } else if(e.target.tagName === "SPAN"){
            e.target.parentElement.remove();
            saveData();
        }
    }, false);

    inputBox.addEventListener("keydown", function(e) {
        if(e.key === "Enter") {
            e.preventDefault();
            addTask();
        }
    });

    function saveData() {
        localStorage.setItem("data", listContainer.innerHTML);
    }

    function showTask(){
        listContainer.innerHTML = localStorage.getItem("data");
    }

    showTask();
});


