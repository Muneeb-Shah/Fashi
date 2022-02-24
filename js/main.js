// COLLAPSIBLES
const collapsibles = document.querySelectorAll(".collapsible");
collapsibles.forEach((item) =>
  item.addEventListener("click", function () {
    this.classList.toggle("collapsible--expanded");
  })
);

// PRODUCTS
// let products = [
//             {id: 1, title: 'A', price: 100.00},
//             {id: 2, title: 'B', price: 200.20},
//             {id: 3, title: 'C', price: 310.99},
//             {id: 4, title: 'D', price: 310.99},
//             {id: 5, title: 'E', price: 310.99},
//             {id: 1, title: 'F', price: 100.00},
//             {id: 2, title: 'G', price: 200.20},
//             {id: 3, title: 'H', price: 310.99},
//             {id: 4, title: 'I', price: 310.99},
//             {id: 5, title: 'J', price: 310.99}, 
//             {id: 1, title: 'K', price: 100.00},
//             {id: 2, title: 'L', price: 200.20},
//             {id: 3, title: 'M', price: 310.99},
//             {id: 4, title: 'N', price: 310.99},
//             {id: 5, title: 'O', price: 310.99}
                    
//         ];

// let product_html = [];

// for(product of products){
//     product_html.push(`<div id="${product.id}">
//     <div class="item-card">
//         <div class="item-card__image">
//             <div class="item-card__btns">
//                 <button class="btn-primary"><i class="fa fa-cart-plus"></i></button>
//                 <button class="btn-secondary">+ Quick View</button>
//                 <button class="btn-secondary"><i class="fa fa-thumbs-up"></i></button>
//             </div>
//             <i class="fa fa-heart item-card__like-btn"></i>
//         </div>
//         <div class="item-card__desc">
//             <p class="item-card__desc__category">TOWEL</p>
//             <p class="item-card__desc__name">${product.title}</p>
//             <p class="item-card__desc__price">$${product.price}</p>
//         </div>
//     </div>
// </div>`);
// }        

// for(let i=0; i<product_html.length; i++){
//     document.querySelector('.js-items-women').innerHTML += product_html[i];
//     document.querySelector('.js-items-men').innerHTML += product_html[i];
// }

let products = [
            {id: 1, title: 'A', price: 100.00, inCart: 0},
            {id: 2, title: 'B', price: 200.00, inCart: 0},
            {id: 3, title: 'C', price: 310.99, inCart: 0}                    
        ];

// Fetching carts
let carts = document.querySelectorAll('.add-to-cart');

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () => {
        // clickedCarts(products[i]);
        storingClickedProducts(products[i]);
        totalPrice();
        cartNotificationBtn();
    });
}

// Storing clicked carts
function clickedCarts(clickedProduct) {
}

// updating cart notification btn
function cartNotificationBtn(){
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    let  productCount = 0;
    for(let product in cartItems){
        productCount += cartItems[product].inCart;
    }
    
    document.querySelector('.notification-btn__badge').textContent = productCount;
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

    for(let product in storedProducts){
        totalPrice += (storedProducts[product].inCart * storedProducts[product].price);
    }    
    localStorage.setItem('totalPrice', totalPrice);
}

// Display Cart
function displayCart() {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
    
    let cart__item = document.querySelector('.cart__items');
    if(cartItems) {
        Object.values(cartItems).map(item => {
            cart__item.innerHTML += `
                <div class="cart__items__item">
                    <img src="images/yellow-dress.jpg" alt="">
                    <div class="cart__item-detail">
                        <span class="cart__item-price">$${item.price} x </span><span class="cart__item-qty">${item.inCart}</span>
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
        totalPrice();
    }
}

// Removing cart products
function removeCartItem(e) {
    let cartItems = JSON.parse(localStorage.getItem('productsInCart'));

    let clickedCartsCount = JSON.parse(localStorage.getItem('clickedCartsCount'));

    if(e.target && e.target.classList.contains('cart__item__remove-btn')){
        const removingItem = e.target.dataset.title;

        // Updating cart notification btn count
        // clickedCartsCount = clickedCartsCount - cartItems[removingItem].inCart;
        // document.querySelector('.notification-btn__badge').textContent = clickedCartsCount;
        // localStorage.setItem('clickedCartsCount', JSON.stringify(clickedCartsCount));

        if (cartItems[removingItem].inCart > 1){
            cartItems[removingItem].inCart -= 1;
        } else {
            delete cartItems[removingItem];
        }
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        document.querySelector('.cart__item-qty').textContent = cartItems[removingItem].inCart;
        
        totalPrice();
        document.querySelector('.cart__total__total-price').textContent = localStorage.getItem('totalPrice');
        cartNotificationBtn();
        
    }
}






// onLoadclickedCartsCount();
cartNotificationBtn()
displayCart();
