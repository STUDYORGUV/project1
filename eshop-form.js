"use strict"

$(document).ready(function() { //POUZI LEN TOTO
    
   //VZDY PRED NACITANIM MA BYT KOSIK PRAZDNY
    $.get('eshop.json', function(products) { //TU DAVAS POZIADAVKU NA TAHANIE DAT S DATABAZY eshop.json
        $('#good').empty(); 
        let newProd;
  
            for (let prod of products) {  //CYKLUS NA VYPISANIE VSETKYCH PRODUKTOV, na stranke produkty a domov
                console.log(prod); 
                if (prod.specialPrice === 0.00) {
                    newProd = `
                    <div  class="goods">
                            <div class="tool-box">
                                <img src="${prod.image}" alt="product_1">
                                <a href=""></a>
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
                    </div>`
                } else {
                        newProd = `
                        <div  class="goods">
                            <div class="tool-box">
                                <img src="${prod.image}" alt="product_1">
                                <a href=""></a>
                            </div>
                            <div class="description">
                                <p>${prod.name}</p>
                                <div class="values">
                                    <h4>€ ${prod.specialPrice.toFixed(2)}</h4>
                                    <span><del>€ ${prod.price.toFixed(2)}</del></span>
                                </div>
                            </div>
                            <div class="cart add-cart">
                                <a>do košíka</a> 
                            </div>
                        </div>`;
                    };
                $('#good').append(newProd); 
                
            }  
            
            // FILTER: ESTE NEFUGUJE chcem, aby zobrazilo iba produkty, podľa názvu, ktorý zadám do input a klik na lupu... :-/
            $("#myBtn").on("click",function(){
                let str = $("#myInput").val().toLowerCase();
                console.log(str);
                let x = $(".goods").find("p");
                console.log(x); 
                for(let y of x){
                    console.log(y);
                    
                   const found = $(y).text().toLowerCase().indexOf(str) > -1;
                   console.log(found);
                   if(!found){
                       $(y).parent().parent().hide();
                   }
                }
             //    console.log($(".goods").find("p").text().toLowerCase().indexOf(str));
                
             //     $(".goods").toggle($(".goods").find("p").text().toLowerCase().indexOf(str) > -1);
             //    console.log(p);      
             });
        
        let carts = document.querySelectorAll('.add-cart');//pomocou tejto metody som zobral vsetky elementy kde sa trieda .add-cart nachádza a je zadefinovana v premennej "carts"

        for (let i=0; i < carts.length; i++) {              //pre-iteruje vsetky produkty na stranke
            carts[i].addEventListener('click', () => {      //prida udalost - "click"
                console.log('pridat do kosika');
                cartNumbers(products[i]);
                totalCost(products[i])
            })
        }

        function onLoadCartNumbers() { //funkcia pridania cisla pri kosiku - nacitanie s localstorage aby tam ostalo take cislo aj po zatvoreni stranky
            let productNumbers = localStorage.getItem('cartNumbers');
            console.log(productNumbers);
            
            if(productNumbers !== null) {
                document.querySelector('.icon').textContent = productNumbers;
            }else {
                document.querySelector('.icon').textContent = 0;
            }
        }

        function cartNumbers(product) {        //funckia pridanie do kosika pocet produktov ich hodnota do local storage key=cartNumbers, value = pocet produktov
            console.log('kliknuty produkt je:', product);
            
            let productNumbers = localStorage.getItem('cartNumbers'); // nacitanie hodnoty v localstorage (value)
            
            productNumbers = parseInt(productNumbers); //skonvertuje string na cislo
            console.log(productNumbers);

            if (productNumbers) { // ak "porductNumber" existuje pridaj do localStorage +1, odporucam pozriet tutorial ktory som ti posielal part 2/5 cca 12:00 min, 
                localStorage.setItem('cartNumbers', productNumbers + 1);
                //pridanie cisla na ikonu kosik (pocet produktov v kosiku)
                document.querySelector('.icon').textContent = productNumbers + 1;
            } else {
                localStorage.setItem('cartNumbers', 1);
                document.querySelector('.icon').textContent = 1;
            }
            setItems(product); // zavolanie funkcie "setItems"
        }

        function setItems(product) { //funkcia do ktorej vstupuje "product" ten na ktory kliknes na stranke 
            console.log("moj produkt je", product);
            
            let cartItems = localStorage.getItem('productsInCart');
            cartItems = JSON.parse(cartItems);
            console.log("moje produkty v kosiku su", cartItems);
            
            // tutorial part 3/5 11:00 tuto cast nejdem popisovat musim si to znovu pozriet (ja si to este dostudujem a napisem lepsie poznamky k obhajobe)
            if(cartItems !== null) {
                if(cartItems[product.id] === undefined)
                cartItems = {
                    //tie tri bodky = tutorial part 3/5 16:50 cca
                    // v tejto casti ide o pripocitavanie produktu v localstorage
                    ...cartItems,
                    [product.id]: product 
                }
                cartItems[product.id].inCart += 1;
            } else {
                product.inCart = 1; 
                cartItems = {
                    [product.id] : product
                }
            }

            localStorage.setItem('productsInCart', JSON.stringify(cartItems)) //vlozenie produktu do local-storage (key,value)
        }
        // funkcia na vypocet celkovej sumy
        function totalCost(product) {
            console.log('cena produktu je', product.price);
            let cartCost = localStorage.getItem('totalCost');
            
            console.log('celkova cena v kosiku', cartCost);

            //tu nepopisujem myslim ze je to zrozumitelne plus hore to co sa deje hore vypisuje "console.log" (tutorail part 4/5)

            if (cartCost != null) {
                cartCost = parseInt(cartCost);
                if(product.isSpecial) {
                    localStorage.setItem('totalCost', cartCost + product.specialPrice);
                }else  {
                    localStorage.setItem('totalCost', cartCost + product.price);}

            } else {
                if (product.isSpecial) {
                    localStorage.setItem('totalCost', product.specialPrice)
                }else {
                    localStorage.setItem('totalCost', product.price)
                }
            }
        }

        // kosik.html - nepopisujem budem to prerabat, ked som sa do toho uz pustil
        // myslim ze tuto funkcionalitu mozme pouzit aj na stranku "zoznam produktov - pridavanie do local storage a potom do kosika," 

        function generateTable() { //funkcia zobrazenie kosika
            let cartItems = localStorage.getItem('productsInCart'); //zobere s localStorage produkty v kosiku do premennej
            cartItems = JSON.parse(cartItems);
            let productContainer = document.querySelector('.products');
            // let cartCost = localStorage.getItem('totalCost'); //zobere z kosika celkovu sumu do premennej
            let totalCost = localStorage.getItem('totalCost');

            //vypocet DPH
            let totalCostMath = totalCost * 0.20;
            let totalCostDPH = (totalCost - totalCostMath).toFixed(2);

            console.log(cartItems);
            if (!cartItems) { 
                productContainer.innerHTML += `<h2>Košík je prázdny !</h2>`   
            }
            if(cartItems && productContainer && totalCost) {
                $('.products').empty();                // prikaz v jquery namiesto javascriptoveho: productContainer.innerHTML = '';
                Object.values(cartItems).map(item => {
                    // ošetrila som podmienkou, že ak je akciová cena, aby túto cenu pripočítavalo ku celkovej cene
                    if (item.specialPrice === 0.00) {
                        productContainer.innerHTML += `
                        <td class="product-id">${item.id}</td>
                        <td class="products">
                            <span class="product-name">${item.name}</span>
                        </td>
                        <td class="quantity">
                            <span class="amount">${item.inCart}</span>
                        </td>
                        `
                    } else {productContainer.innerHTML += `
                        <td class="product-id">${item.id}</td>
                        <td class="products">
                            <span class="product-name">${item.name}</span>
                        </td>
                        <td class="quantity">
                            <span class="amount">${item.inCart}</span>
                        </td>
                        `
                    }
                });

                // vypisuj riadok s celkovou cenou
                productContainer.innerHTML += `
                <td class="total-price total">CELKOVÁ CENA: </td>
                <td class="total total-price">€ ${totalCost}.00</td>`
                
                // vypisuje riadok s celkovou cenou s DPH
                productContainer.innerHTML += `            
                <td class="dph">CELKOVÁ CENA BEZ DPH:</td>
                <td class="dph total">€ ${totalCostDPH}</td>`

                // vypisuje riadok, kde su ikonky vyorázdniť košík a objednávka
               
            }

            // musi to ist sem, inak to po pregenerovani tabulky prestane fungovat - nebudu naviazane eventy na polozky
            $(".remove").click(function(){
                $("td").empty("");
                let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
                let cartCost = localStorage.getItem('totalCost');
                cartItems.incart;
                
                let itemPrice =  cartItems[$(this).data('id')].isSpecial ? cartItems[$(this).data('id')].specialPrice : cartItems[$(this).data('id')].price ; // tuna mam cenu podla ID v kosiku // takymto sposobm to mozme spravit aj vo funckii "totalCost", pred ? - je podmienka ktorej vysledok musi byt true alebo false, za ? je vzdy true a za : je false

                let numberOfItems = cartItems[$(this).data('id')].inCart; // pocet tych istych produktov

                localStorage.setItem('totalCost', cartCost - itemPrice * numberOfItems);

                // for(let item in cartItems) {
                    
                //     console.log('Vypisujem inCart' ,cartItems[item].inCart);  
                
                // if(cartItems[item].isSpecial) {
                //     cartCost = cartCost - (cartItems[item].specialPrice * cartItems[item].inCart);
                // } else(cartCost = cartCost - (cartItems[item].price * cartItems[item].inCart))
                
                // };
                
                // if (cartCost != null) {
                //     cartCost = parseInt(cartCost);
                //     localStorage.setItem('totalCost', cartCost + product.price);
                // } else {
                //     localStorage.setItem('totalCost', product.price)
                // }
                console.log(cartItems[$(this).data('id')]);// ziskla som cenu produktu ktoru musim odpocitat
                

                delete cartItems[$(this).data('id')]; //id produktu - vymaze s pola

                
                let productNumbers = localStorage.getItem('cartNumbers');
                productNumbers = Object.keys(cartItems).length;
                localStorage.setItem('cartNumbers',productNumbers);
                
                            
                localStorage.setItem('productsInCart', JSON.stringify(cartItems)); 
                // localStorage.setItem('totalCost',JSON.stringify(cartCost));//---

                

                // if (productNumbers) {  
                // localStorage.setItem('cartNumbers', productNumbers - 1);
                // //pridanie cisla na ikonu kosik (pocet produktov v kosiku)
                // document.querySelector('.icon').textContent = productNumbers - 1;
                // } else {
                // localStorage.setItem('cartNumbers', 1);
                // document.querySelector('.icon').textContent = 1;
                // }
                // delete operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete
                // $.data(): https://api.jquery.com/data/#data-html5
                // delete cartItems[$(this).data('id')];
                // localStorage.setItem('productsInCart', JSON.stringify(cartItems)) //vlozenie produktu do local-storage (key,value);
                // let cartCost = localStorage.getItem("totalCost");
                

                // if (cartCost != null) {
                //     cartCost = parseInt(cartCost);
                //     localStorage.setItem('totalCost', cartCost + product.price);
                // } else {
                //     localStorage.setItem('totalCost', product.price)
                // }
                
                onLoadCartNumbers();
                generateTable();
                //TODO: prepocitanie cisiel v kosiku a zmena poctu kusov v hlavicke stranky
            }); 

            $(".empty").click(function() { //vymazanie celeho kosika
                $("td").remove();
                localStorage.removeItem('cartNumbers');
                localStorage.removeItem('productsInCart');
                localStorage.removeItem('totalCost');
                onLoadCartNumbers();
                generateTable();
            });

        }

//        onLoadCartNumbers();
        generateTable();


        onLoadCartNumbers();
    });
});

// ---------------OBJEDNAVKOVY FORMULAR-----------------

function generateFrom() {
    
}


