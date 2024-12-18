
async function fetchingUsers(){
    let response = await fetch("https://jsonplaceholder.typicode.com/users"); 
    let json = await response.json();
    return json ; 
}

async function getUsers(){
    let users = await fetchingUsers();
    let allUsersContainer = document.getElementById("allUsers");
    allUsersContainer.innerHTML = "";
   
    if (Array.isArray(users) && users.length > 0) { 
        let content ="";
        users.forEach(user => {
             content +=` 
            <div class="User" onclick="userClicked(${user.id}, this)">
                <p class="UserName">${user.name}</p>
                <p class="UserEmail">${user.email}</p>
            </div>
            `;
        })
        allUsersContainer.innerHTML = content;
    }
}


async function fetchingPosts(uId){
    await getUsers();
    let response =await fetch("https://jsonplaceholder.typicode.com/posts?userId="+uId);
    let json = await response.json(); 
    return json  ; 
}


async function getPosts(id){
    userPosts = await fetchingPosts(id) ; 
    let container = document.getElementById("mainContent");
    container.innerHTML="";
    let content ="";
    userPosts.forEach(post => {
         content += `
            <div class="para">
                <p class="paraTitle">${post.title}</p>
                <p class="paraBody">${post.body}</p>
            </div>
        `;
    });
    container.innerHTML = content;
}

getUsers();
function userClicked(id , el){
    
    
    getPosts(id);
    
    let selectedElments = document.getElementsByClassName("selected");
    for(let ele of selectedElments){
        ele.classList.remove("selected");
    }
    el.classList.add("selected");
}










