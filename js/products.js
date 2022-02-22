let products = [
            {id: 1, title: 'A', price: 100.00},
            {id: 2, title: 'B', price: 200.20},
            {id: 3, title: 'C', price: 310.99},        
        ];

let product_html = [];

for(product of products){
    product_html.push(`<div class="item-slider__items" id="${product.id}">
    <div class="item-card">
        <div class="item-card__image">
            <div class="item-card__btns">
                <button class="btn-primary"><i class="fa fa-cart-plus"></i></button>
                <button class="btn-secondary">+ Quick View</button>
                <button class="btn-secondary"><i class="fa fa-thumbs-up"></i></button>
            </div>
            <i class="fa fa-heart item-card__like-btn"></i>
        </div>
        <div class="item-card__desc">
            <p class="item-card__desc__category">TOWEL</p>
            <p class="item-card__desc__name">${product.title}</p>
            <p class="item-card__desc__price">$${product.price}</p>
        </div>
    </div>
</div>`);
}        

for(let i=0; i<product_html.length; i++)
    document.getElementById("js_items").innerHTML += product_html[i];