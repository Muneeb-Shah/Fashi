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
            {id: 2, title: 'B', price: 200.20, inCart: 0},
            {id: 3, title: 'C', price: 310.99, inCart: 0}                    
        ];

// Fetching carts
let carts = document.querySelectorAll('.add-to-cart');

for(let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
    });
}

// Storing carts
function cartNumbers(product) {
    // console.log(product);
    let productNumbers = parseInt(localStorage.getItem('cartNumbers'));
    
    if(productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.notification-btn__badge').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.notification-btn__badge').textContent = 1;
    }

    setItems(product);
}

// Setting carts notification dot
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers)
         {document.querySelector('.notification-btn__badge').textContent = productNumbers;}
}

function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        cartItems[product.id].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
        [product.id]: product
        };

    }


    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    
}

onLoadCartNumbers();