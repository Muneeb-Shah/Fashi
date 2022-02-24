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
        clickedCarts(products[i]);
        totalPrice();
    });
}

// Storing clicked carts
function clickedCarts(clickedProduct) {
    let clickedCartsCount = parseInt(localStorage.getItem('clickedCartsCount'));
    
    if(clickedCartsCount) {
        localStorage.setItem('clickedCartsCount', clickedCartsCount + 1);

        // updating cart notification btn
        document.querySelector('.notification-btn__badge').textContent = clickedCartsCount + 1;

    } else {
        localStorage.setItem('clickedCartsCount', 1);
        document.querySelector('.notification-btn__badge').textContent = 1;
    }

    storingClickedProducts(clickedProduct);
}

// Setting cart notification btn on load
function onLoadclickedCartsCount() {
    let clickedCartsCount = localStorage.getItem('clickedCartsCount');
    if(clickedCartsCount){
        document.querySelector('.notification-btn__badge').textContent = clickedCartsCount;
    }
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

onLoadclickedCartsCount();