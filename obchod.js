"use strict"


//PRODUCTY.HTML//

$(document).ready(function() {
    $.get('http://127.0.0.1:5500/eshop.json', function(response) {
        $('#good').empty();
        for (let product of response) {
            console.log(product);
            let newProduct = `
            <div  class="goods">
                <div class="tool-box">
                <img src="${product.image}" alt="product_1">
                    <a href=""></a>
                </div>
                    <div class="description">
                        <p>${product.name}</p>
                        <div class="values">
                            <h4>${product.specialPrice}</h4>
                            <span><del>${product.price}</del></span>
                        </div>
                    </div>
                <div class="cart">
                    <a class="add-cart">do košíka</a> 
                </div>
            </div>`;
            $('#good').append(newProduct);
        }
    });
});

//INAK//
$(document).ready(function() {
    $.get('http://127.0.0.1:5500/eshop.json', function(response) {
        $('#good').empty();
        for (let product of response) {
            console.log(product);
            let newProduct = `
            <div  class="goods">
                <div class="tool-box">
                <img src="${product.image}" alt="product_1">
                    <a href=""></a>
                </div>
                    <div class="description">
                        <p>${product.name}</p>
                        <div class="values">
                            <h4>${product.specialPrice}</h4>
                            <span><del>${product.price}</del></span>
                        </div>
                    </div>
                <div class="cart">
                    <a class="add-cart">do košíka</a> 
                </div>
            </div>`;
            $('#good').append(newProduct);
        }
    });
});