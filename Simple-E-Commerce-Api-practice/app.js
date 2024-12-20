async function fetchingProducts(){
    try{
        let response = await fetch("https://fakestoreapi.com/products"); 
        if(!response.ok){
            throw new Error(`Error with fetching Products data: ${response.status} /n ${response.statusText} `)
        }
        let json = await response.json();
        return json;
    }
    catch(err){
        alert(`error fetching products : ${err}`);
    }
}

function updateMainHTML(mainData){
    try{
        
        let container = document.getElementById("main-content");
        container.innerHTML="";
        let content ="";
        mainData.forEach(ele => {
            content += `
                <div class="product-box">
                    <img src="${ele.image}" class="product-image">
                    <div class="product-details">
                        <h3 class="product-title">${ele.title}</h3>
                        <p class="product-price">$${ele.price}</p>
                    </div>
                    <div class="product-buttons">
                        <button 
                        class="view-details-btn"  onclick="displayDetails(${JSON.stringify(ele).replace(/"/g, '&quot;')})">
                        view details
                        </button>
                        <button class="add-to-cart-btn" onclick="cartManager.addTCart(${JSON.stringify(ele).replace(/"/g, '&quot;')})">Add to Cart</button>
                    </div>
                </div>
            `;
    })
    container.innerHTML = content;
    }
    catch(error){
        alert(`Error with Loading Poducts ${error.message}`);
    }
    
}

async function getProducts() {
    try{
        let products = await fetchingProducts();
        updateMainHTML(products);
        handlingSorting.allProducts = products;
    }
    catch(error){
        alert(`Error with Displaying Products ${error.message}`);
    }
}

getProducts();

handlingSorting = {

    allProducts : [] , 
    assendingProducts(){
        try{
            let assendingProduct = this.allProducts.sort((a,b)=>a.price-b.price); 
            updateMainHTML(assendingProduct);
        }
        catch(error){
        alert(`Error with sorting Products assending ${error.message}`);
        }  
    },
    
    dessendingProducts(){
        try{
            let dessendingProduct = this.allProducts.sort((a,b)=>b.price-a.price); 
            updateMainHTML(dessendingProduct);
        }
        catch(error){
            alert(`Error with sorting Products dessending ${error.message}`);
        }
    },
    
    MinMax (min=0 , max=Number.MAX_VALUE) {
        try{
            let filteredArray = this.allProducts.filter((product) => product.price >= min && product.price<= max);
            updateMainHTML(filteredArray);
        }catch(error){
            alert(`error in apply feltring ${error.message}`);
        }
    }
}

try{
    document.getElementById("assending").onclick=()=> handlingSorting.assendingProducts();
    document.getElementById("dessinding").onclick = () => handlingSorting.dessendingProducts();

}catch(error){
    alert(`Error with event sorting ${error.message}`)
}

document.getElementById("apply-Filter").onclick=()=>{
    try{
        const minInput = document.getElementById("minprice");
        const maxInput = document.getElementById("maxPrice");
    
        min = minInput.value;
        max = maxInput.value;
        
        min = isNaN(min) || min == "" ? 0 : +(min);
        max = isNaN(max)|| min == "" ? Number.MAX_VALUE : +(max);
        
        minInput.value="";
        maxInput.value="";

        handlingSorting.MinMax(min,max);
    }catch(error){
        alert(`Error with apply Filter event ${error.mesage} `);
    }
}

 document.getElementById("search-button").onclick= () => {
    event.preventDefault();
    const searchObj = document.getElementById("search-bar");
    searchInput = searchObj.value;
    
    let matchedProducts = searchInput =="" ? [] : 
        handlingSorting.allProducts.filter(product => 
        product.title.trim().toLowerCase().includes(searchInput.trim().toLowerCase())
    );
    
    matchedProducts.length>0 ?  updateMainHTML(matchedProducts) : [];
}

function displayDetails(product) {
    try{
        const model = document.getElementById("productModel");
        model.innerHTML = `
        <div class="model-content">
            <span class="close-button" onclick="closeModel()">&times;</span>
            <img id="modelImage" src=${product.image} alt="Product Image" class="model-image">
            <h3 id="modelTitle" >${product.title}</h3>
            <p id="modelPrice" >${product.price}</p>
            <p  id="modelDescription" >${product.description}</p>
        </div>
    `;
    model.style.display = "flex";
    }
    catch(err){
        alert(`Error with displaying details ${err.message}`);
    }
}


window.onclick = (event)=> {
    try{
        const model = document.getElementById("productModel");
        if (event.target === model) {
            model.style.display = "none";
        }
        const cart = document.getElementById("shoppingCart");
        if (event.target === cart) {
            cart.style.display = "none";
        }
    }catch(err){
        alert(`Error with closing events: ${err.message}`)
    } 
};


function displayCart(){
    try{
        document.getElementById("shoppingCart").style.display="flex";
    }
    catch(err){
        alert(`Error with display cart: ${err.message}`);
    }
}

const cartManager = {

    cartContainer : [],

    addTCart(ele){
        try{
            if (this.cartContainer.some(item => item.id === ele.id)) {
                alert("This item is already in the cart.");
                return;
            }
            this.cartContainer.push(ele);
        
            this.renderCart();
        }catch(err){
            alert(`Error with adding to cart: ${err.message}`);
        }
    },

    removeFCart(productId) {
        try{
            this.cartContainer = this.cartContainer.filter(item => item.id !== productId);
            this.renderCart();
        }catch(err){
            alert(`Error with adding to cart: ${err.message}`);
        }
    },

    renderCart() {
        try{
            const cart = document.getElementById("productCart");
            cart.innerHTML = ""; 
    
            if (this.cartContainer.length === 0) {
                cart.innerHTML = "<p>The cart is empty.</p>";
                return;
            }
    
            cart.innerHTML = ""; 
            this.cartContainer.forEach(ele => {
                let content = `
            
                    <div class="product-item" id="cart-item-${ele.id}">
                        <img src="${ele.image}" alt="Product Image">
                        <div class="description-cart">
                            <p class="title-product-cart">${ele.title}</p>
                            <p class="price-product-cart">$${ele.price}</p>
                        </div>
                        <button class="remove-button" onclick="cartManager.removeFCart(${ele.id})">Remove</button>
                    </div>
                    
                `;
                cart.innerHTML += content;
            });
        }catch(err){
            alert(`Error in rendring ${err.message}`);
        }
    }
}










