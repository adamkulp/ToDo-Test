$(function () {
    $('.datepicker').datepicker({
        format: 'dd-mm-yyyy',
    })
})

$(document).ready(function () {
    $('todo').DataTable();
});

const text = document.getElementById("text");
const addTaskButton = document.getElementById("add");
const saveTaskButton = document.getElementById("save");
const listBox = document.getElementById("listBox");
const saveInd = document.getElementById("saveIndex");

addTaskButton.addEventListener("click", (e) => {
    e.preventDefault();
    let todo = localStorage.getItem("todo");
    if (todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    todoArray.push(text.value);
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
});

function displayTodo() {
    let todo = localStorage.getItem("todo");
    if (todo === null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(todo);
    }
    let htmlCode = "";
    todoArray.forEach((list, ind) => {
        htmlCode += `<div class='flex mb-4 items-center'>
 <p class='w-full text-grey-darkest'>${list}</p>
 <button onclick='edit(${ind})' class='flex-no-shrink p-2 ml-4 mr-2 border-2 rounded text-black text-black bg-green-600 '>Edit</button>
 <button onclick='deleteTodo(${ind})' class='flex-no-shrink p-2 ml-2 border-2 rounded text-black bg-red-500'>Delete</button>
</div>`;
    });
    listBox.innerHTML = htmlCode;
}

function deleteTodo(ind) {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    todoArray.splice(ind, 1);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
}
function edit(ind) {
    saveInd.value = ind;
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    text.value = todoArray[ind];
    addTaskButton.style.display = "none";
    saveTaskButton.style.display = "block";
}
saveTaskButton.addEventListener("click", () => {
    let todo = localStorage.getItem("todo");
    todoArray = JSON.parse(todo);
    let id = saveInd.value;
    todoArray[id] = text.value;
    addTaskButton.style.display = "block";
    saveTaskButton.style.display = "none";
    text.value = "";
    localStorage.setItem("todo", JSON.stringify(todoArray));
    displayTodo();
});


let email = document.getElementById("email")
let password = document.getElementById("password")
let verifyPassword = document.getElementById("verifyPassword")
let submitBtn = document.getElementById("submitBtn")
let emailErrorMsg = document.getElementById('emailErrorMsg')
let passwordErrorMsg = document.getElementById('passwordErrorMsg')

function displayErrorMsg(type, msg) {
	if (type == "email") {
		emailErrorMsg.style.display = "block"
		emailErrorMsg.innerHTML = msg
		submitBtn.disabled = true
	}
	else {
		passwordErrorMsg.style.display = "block"
		passwordErrorMsg.innerHTML = msg
		submitBtn.disabled = true
	}
}

function hideErrorMsg(type) {
	if (type == "email") {
		emailErrorMsg.style.display = "none"
		emailErrorMsg.innerHTML = ""
		submitBtn.disabled = true
		if (passwordErrorMsg.innerHTML == "")
			submitBtn.disabled = false
	}
	else {
		passwordErrorMsg.style.display = "none"
		passwordErrorMsg.innerHTML = ""
		if (emailErrorMsg.innerHTML == "")
			submitBtn.disabled = false
	}
}

// Validate password upon change
password.addEventListener("change", function () {

	// If password has no value, then it won't be changed and no error will be displayed
	if (password.value.length == 0 && verifyPassword.value.length == 0) hideErrorMsg("password")

	// If password has a value, then it will be checked. In this case the passwords don't match
	else if (password.value !== verifyPassword.value) displayErrorMsg("password", "Passwords do not match")

	// When the passwords match, we check the length
	else {
		// Check if the password has 8 characters or more
		if (password.value.length >= 8)
			hideErrorMsg("password")
		else
			displayErrorMsg("password", "Password must be at least 8 characters long")
	}
})

verifyPassword.addEventListener("change", function () {
	if (password.value !== verifyPassword.value)
		displayErrorMsg("password", "Passwords do not match")
	else {
		// Check if the password has 8 characters or more
		if (password.value.length >= 8)
			hideErrorMsg("password")
		else
			displayErrorMsg("password", "Password must be at least 8 characters long")
	}
})

// Validate email upon change
email.addEventListener("change", function () {
	// Check if the email is valid using a regular expression (string@string.string)
	if (email.value.match(/^[^@]+@[^@]+\.[^@]+$/))
		hideErrorMsg("email")
	else
		displayErrorMsg("email", "Invalid email")
});
</script >

