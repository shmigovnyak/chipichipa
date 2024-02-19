let TodoHttp = new XMLHttpRequest();
let UserHttp = new XMLHttpRequest();

let table = document.getElementById("tableTodo");

let btn = document.getElementById("buttonTodo");

btn.onclick = function () {
    
    TodoHttp.open("GET", "https://jsonplaceholder.typicode.com/todos", true);

    
    TodoHttp.onreadystatechange = function () {
        if (TodoHttp.readyState === 4 && TodoHttp.status === 200) {
            
            let todoData = JSON.parse(TodoHttp.responseText);
            
            UserHttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
            UserHttp.onreadystatechange = function () {
                if (UserHttp.readyState === 4 && UserHttp.status === 200) {
                   
                    let userData = JSON.parse(UserHttp.responseText);
                    
                    let tasks = todoData.map(function (todo) {
                      
                        let user = userData.find(function (user) {
                            return user.id === todo.userId;
                        });
                        
                        return {
                            userName: user.name,
                            title: todo.title,
                            completed: todo.completed
                        };
                    });
                    
                    let tbody = document.createElement("tbody");
                    table.appendChild(tbody);
                    
                    tasks.forEach(function (task, index) {
                        let row = document.createElement("tr");
                        tbody.appendChild(row);
                        let cell = document.createElement("td");
                        cell.textContent = index + 1;
                        row.appendChild(cell);
                        cell = document.createElement("td");
                        cell.textContent = task.userName;
                        row.appendChild(cell);
                        cell = document.createElement("td");
                        cell.textContent = task.title;
                        row.appendChild(cell);
                        cell = document.createElement("td");
                        let checkbox = document.createElement("input");
                        checkbox.type = "checkbox";
                        checkbox.checked = task.completed;
                        cell.appendChild(checkbox);
                        row.appendChild(cell);
                    });
                }
            };
            UserHttp.send();
        }
    };
    TodoHttp.send();
};

document.body.appendChild(btn);
