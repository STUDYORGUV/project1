"use strict"

$(document).ready(function() { //POUZI LEN TOTO
    //<a href="produkt.html?id=${prod.id}"><img src="${prod.image}" alt="product_1"></a>

    //VZDY PRED NACITANIM MA BYT KOSIK PRAZDNY
    $.get('eshop.json', function(products) { //TU DAVAS POZIADAVKU NA TAHANIE DAT Z DATABAZY eshop.json

             // PRODUKT, na stranke produkt a domov - zatial skusam..
            
            //$(".tool-box a").on("click",function(){
                $('#details').empty(); 
                let detailProd;
                let i;
                // let detail = $(this).att  r('data-id'); //tento zapis ???
                // console.log(detail); 
                for (let prod of products) {

                //     if(detail === prod.id ){
                            if (prod.specialPrice === 0.00) {
                                detailProd = `
                                <div  class="detail-product">

                                    <div class="goods">
                                        <div class="tool-box">
                                            <img src="${prod.image}" alt="product_1"></a>
                                        </div>
                                        <div class="description">
                                            <p>${prod.name}</p>
                                            <div class="values">
                                                <h4>€ ${prod.price.toFixed(2)}</h4>
                                            </div>
                                        </div>
                                        <div class="cart add-cart">
                                            <a>do košíka</a> 
                                        </div>
                                    </div>

                                    <div class="details">
                                            <h3>${prod.name}</h3>
                                            <p>${prod.about}</p>
                                            <div class="parameters">
                                                <p>Veľkosť: ${prod.size} </p>
                                                <p>Farba: ${prod.color}</p>
                                                <p>Materiál: ${prod.fabric}</p>
                                            </div>
                                            <div class"detail">
                                                <h5>Starostlivosť: </h5> 
                                                <ul>
                                                for (let i=0; i < prod.care.length; i++) {
                                                    <li><img src="${prod.care[i]}" height="25" class="care"></li>
                                                }
                                                <ul>         
                                            </div>
                                    </div>

                                </div>`
                            } else {
                                detailProd = `
                                <div  class="detail-product">

                                    <div  class="goods">
                                        <div class="tool-box">
                                            <img src="${prod.image}" alt="product_1">
                                        </div>
                                        <div class="description">
                                            
                                            <div class="values">
                                                <h4>€ ${prod.specialPrice.toFixed(2)}</h4>
                                                <span><del>€ ${prod.price.toFixed(2)}</del></span>
                                            </div>
                                        </div>
                                        <div class="cart add-cart">
                                            <a>do košíka</a> 
                                        </div>
                                    </div>

                                    <div class="details">
                                            <h3>${prod.name}</h3>
                                            <p>${prod.about}</p>
                                            <div class="parameters">
                                                <p>Veľkosť: ${prod.size} </p>
                                                <p>Farba: ${prod.color}</p>
                                                <p>Materiál: ${prod.fabric}</p>
                                            </div>
                                            <div class"detail">
                                                <h5>Starostlivosť: </h5> 
                                                <ul>
                                                    <li><img src="${prod.care[0]}" height="25" class="care"></li>
                                                    <li><img src="${prod.care[1]}" height="25" class="care"></li>
                                                    <li><img src="${prod.care[2]}" height="25" class="care"></li>
                                                    <li><img src="${prod.care[3]}" height="25" class="care"></li>
                                                <ul>         
                                            </div>
                                    </div>

                                </div>`;
                            }
                } 
                $('#details').append(detailProd);             
            // }
                 
                //});
    });
});


