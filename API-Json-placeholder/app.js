
async function fetchingUsers(){
    try{
        let response = await fetch("https://jsonplaceholder.typicode.com/users"); 
        if(!response.ok){
            throw new Error(`failed to fetch user data ${response.status} , /n ${response.statusTexttext}`);
        }
        let json = await response.json();
        return json ; 
    }
    catch(error){
        alert(`Error fetching data: ${error}`);
    }
}

async function getUsers(){
    try{
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
    catch {
    alert(`Error rendring posts ${error.message}`)
    }
}
   



async function fetchingPosts(uId){
    try{
        await getUsers();
        let response =await fetch("https://jsonplaceholder.typicode.com/posts?userId="+uId);
        if(!response.ok){
           throw new Error(`Error with fetching data ${response.status} /n ${error.statusText}`);
        }
        let json = await response.json(); 
        return json  ; 
    }
    catch {
        alert(`Error rendering posts: ${error.message}`);
    }
   
}


async function getPosts(id){
    try{
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
    catch{
        alert(`Error with rendring posts ${error.message}`);
    }
}

try{
    getUsers();
}
catch{
    alert (error.message);
}
function userClicked(id , el){
    try {
        getPosts(id);
    
    let selectedElments = document.getElementsByClassName("selected");
    for(let ele of selectedElments){
        ele.classList.remove("selected");
    }
    el.classList.add("selected");
    }
    catch {
        alert(`error with handling user click: ${error.message}`); 
    }
    
    
}










