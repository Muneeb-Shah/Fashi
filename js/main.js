// COLLAPSIBLES
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

// PRODUCTS
let productsWomen = [
    {title: 'A', price: 100.00, inCart: 0},
    {title: 'B', price: 200.00, inCart: 0},
    {title: 'C', price: 310.00, inCart: 0},
    {title: 'D', price: 310.00, inCart: 0},
    {title: 'E', price: 310.00, inCart: 0},
    {title: 'F', price: 310.00, inCart: 0},
    {title: 'G', price: 310.00, inCart: 0},
    {title: 'H', price: 310.00, inCart: 0},
    {title: 'I', price: 310.00, inCart: 0}
];

let productsMen = [
    {title: 'J', price: 310.00, inCart: 0},
    {title: 'K', price: 310.00, inCart: 0},
    {title: 'L', price: 310.00, inCart: 0},
    {title: 'M', price: 310.00, inCart: 0},
    {title: 'N', price: 310.00, inCart: 0},
    {title: 'O', price: 310.00, inCart: 0},
    {title: 'P', price: 310.00, inCart: 0},
    {title: 'Q', price: 310.00, inCart: 0},
    {title: 'R', price: 310.00, inCart: 0},
    {title: 'S', price: 310.00, inCart: 0},
    {title: 'T', price: 310.00, inCart: 0}
];

let productsWomen_html = [];
let productsMen_html = [];

for(product of productsWomen){
    productsWomen_html.push(`<div id="${product.id}">
    <div class="item-card">
        <div class="item-card__image">
            <div class="item-card__btns">
                <button class="btn-primary"><i class="fa fa-cart-plus"></i></button>
                <button class="btn-secondary add-to-cart">Add to Cart</button>
                <button class="btn-secondary"><i class="fa fa-thumbs-up"></i></button>
            </div>
            <i class="fa fa-heart item-card__like-btn"></i>
        </div>
        <div class="item-card__desc">
            <p class="item-card__desc__category">TOWEL</p>
            <p class="item-card__desc__name">${product.title}</p>
            <p class="item-card__desc__price">$${product.price}.00</p>
        </div>
    </div>
</div>`);
}        

for(product of productsMen){
    productsMen_html.push(`<div id="${product.id}">
    <div class="item-card">
        <div class="item-card__image">
            <div class="item-card__btns">
                <button class="btn-primary"><i class="fa fa-cart-plus"></i></button>
                <button class="btn-secondary add-to-cart">Add to Cart</button>
                <button class="btn-secondary"><i class="fa fa-thumbs-up"></i></button>
            </div>
            <i class="fa fa-heart item-card__like-btn"></i>
        </div>
        <div class="item-card__desc">
            <p class="item-card__desc__category">TOWEL</p>
            <p class="item-card__desc__name">${product.title}</p>
            <p class="item-card__desc__price">$${product.price}.00</p>
        </div>
    </div>
</div>`);
}

for(let i=0; i<productsWomen.length; i++){
    document.querySelector('.js-items-women').innerHTML += productsWomen_html[i];
}

for(let i=0; i<productsMen.length; i++){
    document.querySelector('.js-items-men').innerHTML += productsMen_html[i];
}

let products = [...productsWomen, ...productsMen];

// Fetching carts
function fetchingCarts(){
    let carts = document.querySelectorAll('.add-to-cart');
    
    for(let i=0; i<carts.length; i++){
        carts[i].addEventListener('click', () => {
            storingClickedProducts(products[i]);
            totalPrice();
            cartNotificationBtn();
            toast();
        });
    }
}

// updating cart notification btn
function cartNotificationBtn(){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    let  productCount = 0;
    for(let product in cartItems){
        productCount += cartItems[product].inCart;
    }
    
    document.querySelector('.cart-badge').textContent = productCount;
}

// Storing clicked products in local storage 
function storingClickedProducts(clickedProduct) {    
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    if(cartItems != null) {
        if(cartItems[clickedProduct.title] == undefined) {
            cartItems = {
                ...cartItems,
                [clickedProduct.title]: clickedProduct
            };
        }
        cartItems[clickedProduct.title].inCart += 1;
    } else {
        clickedProduct.inCart = 1;
        cartItems = {
            [clickedProduct.title]: clickedProduct
        };
    }
    
    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
}

// Total Price
function totalPrice() {
    let storedProducts = JSON.parse(localStorage.getItem('productsInCart'));
    let totalPrice = 0;

    if(storedProducts == {} || storedProducts == null){
    localStorage.setItem('totalPrice', totalPrice);
    } else {
        for(let product in storedProducts){
            totalPrice += (storedProducts[product].inCart * storedProducts[product].price);
        }    
        localStorage.setItem('totalPrice', totalPrice);
    }
    document.querySelector('.cart__total__total-price').textContent = localStorage.getItem('totalPrice');
    let headerTotal = document.querySelector('.header__middle__cart__total');

    headerTotal.textContent = `$${localStorage.getItem('totalPrice')}.00`;
}

// Display Cart
function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    
    let cart__item = document.querySelector('.cart__items');

    if(cartItems) {
        let printed = [];
        Object.values(cartItems).map(item => {
            cart__item.innerHTML += `            
            <div class="cart__items__item removing-item${item.title}">
            <img src="images/yellow-dress.jpg" alt="">
            <div class="cart__item-detail">
            <span class="cart__item-price">$${item.price}.00 x </span><span class="cart__item-qty removing-qty${item.title}">${item.inCart}</span>
            <div class="cart__item-name">${item.title}</div>
            </div>
            <button class="cart__item__remove-btn" data-title="${item.title}">X</button>
            </div>
            `;
        });
    }

    let total = document.querySelector('.cart__total__total-price');
    
    total.textContent = localStorage.getItem('totalPrice');

    cart__item.onclick = function(e) {
        removeCartItem(e);
        
        cartNotificationBtn();
    }
}

// Removing cart products
function removeCartItem(e) {
    
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    if(e?.target?.classList.contains('cart__item__remove-btn')){
        const removingItem = e.target.dataset.title;

        if (cartItems[removingItem].inCart >= 1){
            cartItems[removingItem].inCart -= 1;
            document.querySelector(`.removing-qty${removingItem}`).textContent = cartItems[removingItem].inCart;
            
            if(cartItems[removingItem].inCart == 0) {
                document.querySelector(`.removing-item${removingItem}`).innerHTML = '';
                delete cartItems[removingItem];                
            }
        }
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));         
        
        //clearing storage
        if(Object.keys(cartItems).length == 0) {
            localStorage.clear();
        }

        totalPrice();
    }
}


// Cart visible
let viewCart = document.querySelector('.cart__view-cart-btn');
viewCart.onclick = function(){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    if(cartItems == {}){
        localStorage.clear();
    }
    displayCart();
}

// Toasts
function toast(){
    let x = document.querySelector("#toast");
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 1000);
}
 
cartNotificationBtn();
fetchingCarts();
totalPrice();