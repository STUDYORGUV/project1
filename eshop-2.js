"use strict"

$(document).ready(function() { //POUZI LEN TOTO
    
   //VZDY PRED NACITANIM MA BYT KOSIK PRAZDNY
    $.get('eshop.json', function(products) { //TU DAVAS POZIADAVKU NA TAHANIE DAT Z DATABAZY eshop.json
                
            $('#good').empty(); 
            //$('#woman').empty(); 
            let newProd;
            for (let prod of products) {  //CYKLUS NA VYPISANIE VSETKYCH PRODUKTOV, na stranke produkty a domov
                console.log(prod); 

                if (prod.specialPrice === 0.00) {
                    newProd = `
                    <div  class="goods">
                            <div class="tool-box">
                                <img src="${prod.image}" alt="product_1">
                                <a href="produkt.html" id=""></a>
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
                                <a href="produkt.html" id=""></a>
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
                        $('#specialgood').append(newProd); //FILTER: do elementu zobrazi len akciove 
                };
                  
                $('#good').append(newProd);

                if(prod.category ==="women") {
                    $('#woman').append(newProd); 
                    $('#woman').hide(); 
                }
                if(prod.category ==="accessories"){
                    $('#accessories').append(newProd); 
                    $('#accessories').hide(); 
                }
                if(prod.category ==="men"){
                    $('#men').append(newProd); 
                    $('#men').hide(); 
                }
            }; 
                
            $("#w").on("click",function(){
                $('#good').hide(); 
                $('#men').hide();
                $('#accessories').hide();
                $('#woman').show();
            }); 

            $("#a").on("click",function(){
                $('#good').hide(); 
                $('#men').hide();
                $('#accessories').show();
                $('#woman').hide();
            }); 

            $("#m").on("click",function(){
                $('#good').hide(); 
                $('#men').show();
                $('#accessories').hide();
                $('#woman').hide();
            }); 

            //VYHLADAVANIE: zobrazi iba produkty, podľa názvu, ktorý zadám do input a klik na lupu...
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
            });
        
        //VYKRESLENIE jednemu produktu do stranky produkt.html

        let carts = document.querySelectorAll('.add-cart');//pomocou tejto metody som zobral vsetky elementy kde sa trieda .add-cart nachádza a je zadefinovana v premennej "carts"

        for (let i=0; i < carts.length; i++) {              //pre-iteruje vsetky produkty na stranke
            carts[i].addEventListener('click', () => {      //prida udalost - "click"
                console.log('pridat do kosika');
                cartNumbers(products[i]);
                totalCost(products[i])
            })
        }
        //funkcia pridania cisla pri kosiku - nacitanie s localstorage aby tam ostalo take cislo aj po zatvoreni stranky
        function onLoadCartNumbers() { 
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
            // ak "porductNumber" existuje pridaj do localStorage +1, odporucam pozriet tutorial ktory som ti posielal
            if (productNumbers) { 
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
            let cartItems = localStorage.getItem('productsInCart'); //zoberie s localStorage produkty v kosiku do premennej
            cartItems = JSON.parse(cartItems);
            let productContainer = document.querySelector('.products');
            // let cartCost = localStorage.getItem('totalCost'); //zobere z kosika celkovu sumu do premennej
            let totalCost = localStorage.getItem('totalCost');

            //vypocet DPH
            let totalCostMath = totalCost * 0.20;
            let totalCostDPH = (totalCost - totalCostMath).toFixed(2);

            //console.log(cartItems);
            if (cartItems === null || cartItems == 0) {
                productContainer.innerHTML += `<h2>Košík je prázdny !</h2>`   
            } else if (cartItems && productContainer && totalCost) {
                $('.products').empty();                // prikaz v jquery namiesto javascriptoveho: productContainer.innerHTML = '';
                Object.values(cartItems).map(item => {
                    // ošetrila som podmienkou, že ak je akciová cena, aby túto cenu pripočítavalo ku celkovej cene
                    if (item.specialPrice === 0.00) {
                        productContainer.innerHTML += `
                        <td class="product-id">${item.id}</td>
                        <td class="products">
                            <span class="product-name">${item.name}</span>
                        </td>
                        <td class="price">€ ${item.price},00</td>
                        <td class="quantity">
                            <span class="amount">${item.inCart}</span>
                        </td>
                        <td class="total">
                            € ${item.inCart * item.price},00
                        </td>
                        <td class="remove dph" data-id="${item.id}">
                            <i class="far fa-trash-alt" id="icon"></i>
                        </td>`
                    } else {productContainer.innerHTML += `
                        <td class="product-id">${item.id}</td>
                        <td class="products">
                            <span class="product-name">${item.name}</span>
                        </td>
                        <td class="price">€ ${item.specialPrice},00</td>
                        <td class="quantity">
                            <span class="amount">${item.inCart}</span>
                        </td>
                        <td class="total">
                            € ${item.inCart * item.specialPrice},00
                        </td>
                        <td class="remove dph" data-id="${item.id}">
                            <i class="far fa-trash-alt" id="icon"></i>
                        </td>`
                    }
                });

                //vypisuj riadok s celkovou cenou
                productContainer.innerHTML += `
                <td class="dph"></td>
                <td class="dph"></td>
                <td class="total-price"></td>
                <td class="total-price total">CELKOVÁ CENA: </td>
                <td class="total total-price">€ ${totalCost}.00</td>`
                
                //vypisuje riadok s celkovou cenou s DPH
                productContainer.innerHTML += ` 
                <td class="dph"></td>
                <td class="dph"></td>
                <td class="dph"></td>             
                <td class="dph">CELKOVÁ CENA BEZ DPH:</td>
                <td class="dph total">€ ${totalCostDPH}</td>`

                //vypisuje riadok, kde su ikonky vyorázdniť košík a objednávka
                productContainer.innerHTML += `
                <td class="dph"></td>
                <td class="dph"></td>
                <td class="dph"></td>             
                <td class="dph total"><button class="empty">Vyprázdniť košík</button></td>
                <td class="total dph"><a class="order" href="objednavka.html">Objednať<a></td>`
            }

            // musi to ist sem, inak to po pregenerovani tabulky prestane fungovat - nebudu naviazane eventy na polozky
            $(".remove").click(function(){
                $("td").empty("");
                let cartItems = JSON.parse(localStorage.getItem('productsInCart'));
                let productNumbers = localStorage.getItem('cartNumbers');
                console.log('pocet produktov v kosiku je' ,productNumbers);
                let cartCost = localStorage.getItem('totalCost');                    
                // tuna mam cenu podla ID v kosiku // takymto sposobm to mozme spravit aj vo funckii "totalCost", pred ? - je podmienka ktorej vysledok musi byt true alebo false, za ? je vzdy true a za : je false
                let itemPrice = cartItems[$(this).data('id')].isSpecial ? cartItems[$(this).data('id')].specialPrice : cartItems[$(this).data('id')].price ; 
                let numberOfItems = cartItems[$(this).data('id')].inCart; // pocet tych istych produktov
                localStorage.setItem('totalCost', cartCost - itemPrice * numberOfItems);
                console.log(cartItems[$(this).data('id')]);// ziskala som cenu?(id) produktu ktoru musim odpocitat
                delete cartItems[$(this).data('id')]; //id produktu - vymaze z pola
                //postupne spočíta pri iterácii všetky produkty, čo ostanú po prípadnom vymazaní produktu klikom na ikonu košíka
                let y = 0;   
                for (let item in cartItems) {
                    let x = cartItems[item].inCart; 
                    y = y + x; 
                }
                productNumbers = y;
                localStorage.setItem('cartNumbers',productNumbers);
                localStorage.setItem('productsInCart', JSON.stringify(cartItems)); 
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
        generateTable();
        onLoadCartNumbers();
    });
});

// ---------------OBJEDNAVKOVY FORMULAR-----------------


