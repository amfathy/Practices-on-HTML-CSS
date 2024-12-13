function getUsers() {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/users");
    request.responseType = "json";
    request.send();

    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            let users = request.response;
            document.getElementById("allUsers").innerHTML ="";
            if (Array.isArray(users) && users.length > 0) { 
                users.forEach(user => {
                    let content = `
                    <div class="User" onclick="userClicked(${user.id}, this)">
                        <p class="UserName">${user.name}</p>
                        <p class="UserEmail">${user.email}</p>
                    </div>
                    `;
                    document.getElementById("allUsers").innerHTML += content;
                });
            } else {
                alert("No users found or invalid data.");
            }
        } else {
            alert("Error fetching users. Status: " + request.status);
        }
    };

    request.onerror = function () {
        alert("Request failed. Please check your connection.");
    };
}


function getPosts(userIdd) {
    let request = new XMLHttpRequest();
    request.open("GET", "https://jsonplaceholder.typicode.com/posts?userId="+userIdd);
    request.responseType = "json";
    request.send();

    request.onload = function () {
        if (request.status >= 200 && request.status < 300) {
            let posts = request.response;
            document.getElementById("mainContent").innerHTML ="";
            if (Array.isArray(posts) && posts.length > 0) { 
                posts.forEach(post => {
                        let content = `
                        <div class="para">
                            <p class="paraTitle">${post.title}</p>
                            <p class="paraBody">${post.body}</p>
                        </div>
                        `;
                        document.getElementById("mainContent").innerHTML += content;
                });
            } else {
                alert("No users found or invalid data.");
            }
        } else {
            alert("Error fetching users. Status: " + request.status);
        }
    };

    request.onerror = function () {
        alert("Request failed. Please check your connection.");
    };
}

getUsers();
function userClicked(id , el){
    getPosts(id);
    let selectedElments = document.getElementsByClassName("selected");
    for(ele of selectedElments){
        ele.classList.remove("selected");
    }
    el.classList.add("selected");
}

 