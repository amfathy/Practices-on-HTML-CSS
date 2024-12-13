let allProducts =[];

function getProducts() {
    fetch("https://fakestoreapi.com/products")
    .then(response => {
        if(response.ok){
            return response.json(); 
        }
        throw new Error("Response not available"); 
    })
    .then(products => {
        document.getElementById("main-content").innerHTML = "";
        if (Array.isArray(products) && products.length > 0) { 
            allProducts = products;
            products.forEach(ele => {
                let content = `
                    <div class="product-box">
                        <img src="${ele.image}" class="product-image">
                        <div class="product-details">
                            <h3 class="product-title">${ele.title}</h3>
                            <p class="product-price">$${ele.price}</p>
                        </div>
                        <div class="product-buttons">
                            <button 
                            class="view-details-btn"  onclick="showModel(${JSON.stringify(ele).replace(/"/g, '&quot;')})">
                            view details
                            </button>
                            <button class="add-to-cart-btn" onclick="addingToCart(${JSON.stringify(ele).replace(/"/g, '&quot;')})">Add to Cart</button>
                        </div>
                    </div>
                `;
                document.getElementById("main-content").innerHTML += content;
            });
        } else {
            alert("No products found");
        }
    })
    .catch(error => {
        alert("Error fetching products");
        console.error(error);
    });
}
getProducts();

function showModel(product) {
    console.log(product);
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


window.onclick = function(event) {
    const model = document.getElementById("productModel");
    if (event.target === model) {
        model.style.display = "none";
    }
    const cart = document.getElementById("shoppingCart");
    if (event.target === cart) {
        cart.style.display = "none";
    }
};



function assendingProducts(){
    let assendingProduct = allProducts.sort((a,b)=>a.price-b.price); 
    document.getElementById("main-content").innerHTML ="";
    console.log(assendingProduct);
    assendingProduct.forEach(ele => {
        let content = `
            <div class="product-box">
                <img src="${ele.image}" class="product-image">
                <div class="product-details">
                    <h3 class="product-title">${ele.title}</h3>
                    <p class="product-price">$${ele.price}</p>
                </div>
                <div class="product-buttons">
                    <button 
                    class="view-details-btn"  onclick="showModel(${JSON.stringify(ele).replace(/"/g, '&quot;')})">
                    view details
                    </button>
                    <button class="add-to-cart-btn" onclick="addingToCart(${JSON.stringify(ele).replace(/"/g, '&quot;')})">Add to Cart</button>
                </div>
            </div>
        `;
        document.getElementById("main-content").innerHTML += content;
    });

}



function dessendingProducts(){
    let dessendingProduct = allProducts.sort((a,b)=>b.price-a.price); 
    document.getElementById("main-content").innerHTML ="";
    dessendingProduct.forEach(ele => {
        let content = `
            <div class="product-box">
                <img src="${ele.image}" class="product-image">
                <div class="product-details">
                    <h3 class="product-title">${ele.title}</h3>
                    <p class="product-price">$${ele.price}</p>
                </div>
                <div class="product-buttons">
                    <button 
                    class="view-details-btn"  onclick="showModel(${JSON.stringify(ele).replace(/"/g, '&quot;')})">
                    view details
                    </button>
                    <button class="add-to-cart-btn" onclick="addingToCart(${JSON.stringify(ele).replace(/"/g, '&quot;')})">Add to Cart</button>
                </div>
            </div>
        `;
        document.getElementById("main-content").innerHTML += content;
    });

}


function displayCart(){
    document.getElementById("shoppingCart").style.display="flex";
}


// document.querySelectorAll(".remove-button").forEach(button => {
//     button.addEventListener("click", function() {
//         this.parentElement.remove();
//     });
// });

var cart;
let cartContainer = [];

function addingToCart(ele) {

    if (cartContainer.some(item => item.id === ele.id)) {
        alert("This item is already in the cart.");
        return;
    }
    cartContainer.push(ele);

    renderCart();
}

function removeProductCart(productId) {
    cartContainer = cartContainer.filter(item => item.id !== productId);

    renderCart();
}



function renderCart() {
    const cart = document.getElementById("productCart");
    cart.innerHTML = ""; 

    if (cartContainer.length === 0) {
        cart.innerHTML = "<p>The cart is empty.</p>";
        return;
    }

    cart.innerHTML = ""; 
    cartContainer.forEach(ele => {
        let content = `
     
            <div class="product-item" id="cart-item-${ele.id}">
                <img src="${ele.image}" alt="Product Image">
                <div class="description-cart">
                    <p class="title-product-cart">${ele.title}</p>
                    <p class="price-product-cart">$${ele.price}</p>
                </div>
                <button class="remove-button" onclick="removeProductCart(${ele.id})">Remove</button>
            </div>
            
        `;
        cart.innerHTML += content;
    });
}


