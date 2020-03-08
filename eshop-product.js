"use strict"

$(document).ready(function() { //POUZI LEN TOTO
   

    //VZDY PRED NACITANIM MA BYT KOSIK PRAZDNY
    $.get('eshop.json', function(products) { //TU DAVAS POZIADAVKU NA TAHANIE DAT Z DATABAZY eshop.json

             // PRODUKT, na stranke produkt a domov - zatial skusam..
            
            //$(".tool-box a").on("click",function(){
                $('#details').empty(); 
                let detailProd;
                
                // let detail = $(this).attr('data-id'); //tento zapis ???
                // console.log(detail); 
                for (let prod of products) {
                //     if(detail === prod.id ){
                            if (prod.specialPrice === 0.00) {
                                detailProd = `
                                <div  class="goods">
                                            </div>
                                        <div class="tool-box">
                                            <img src="${prod.image}" alt="product_1">
                                        </div>
                                        <div class="description">
                                            <h2>${prod.name}</h2>
                                            <p>${prod.about}</p>
                                            <p>Kod produktu:${prod.id}</p>
                                            <p>Kategória: ${prod.category}</p>
                                            <p>Veľkosť: ${prod.size}
                                            <div class="values">
                                                <h4>€ ${prod.price.toFixed(2)}</h4>
                                            </div>
                                        </div>
                                        </div>
                                    <div class="cart add-cart">
                                        <a>do košíka</a> 
                                    </div>
                                </div>`
                                $('#details').append(detailProd); 
                            } else {
                                    detailProd = `
                                    <div  class="goods">
                                        <div class="tool-box">
                                            <img src="${prod.image}" alt="product_1">
                                        </div>
                                        <div class="description">
                                        <h1>${prod.name}</h1>
                                            <p>${prod.about}</p>
                                            <p>Kod produktu: ${prod.id}</p>
                                            <p>Kategória: ${prod.category}</p>

                                            <div class="values">
                                                <h4>€ ${prod.specialPrice.toFixed(2)}</h4>
                                                <span><del>€ ${prod.price.toFixed(2)}</del></span>
                                            </div>
                                        </div>
                                        <div class="cart add-cart">
                                            <a>do košíka</a> 
                                        </div>
                                    </div>`;  
                            $('#details').append(detailProd); 
                            }
                    } 
                             
            // }
                 
                //});
    });
});


