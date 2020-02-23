"use strict"

let carts = document.querySelectorAll('.add-cart'); //pomocou tejto metody som zobral vsetky elementy kde sa trieda .add-cart nachádza a je zadefinovana v premennej "carts"



let products = [
    {
        id: 1,
        name: 'Pánska športová mikina',
        tag: 'PanskaŠportovaMikina',
        price: 45,
        inCart: 0
    },{
        id: 2,
        name: 'Dámska taška',
        tag:'DamskaTaska',
        price: 50,
        inCart: 0
    },{
        id: 3,
        name: 'Dámsky pulóver',
        tag: 'DamskyPulover',
        price: 40,
        inCart: 0
    },{
        id: 4,
        name: 'Dámska športová kabelka',
        tag: 'DamskaŠportovaKabelka',
        price: 30,
        inCart: 0
    }
];




for (let i=0; i < carts.length; i++) {              //pre-iteruje 4 produkty na stranke
    carts[i].addEventListener('click', () => {      //prida udalost - "click"
        console.log('pridat do kosika');
        cartNumbers(products[i]);
        totalCost(products[i])
    })
}

function onLoadCartNumbers() { //funkcia priadania cisla pri kosiku - nacitanie s localstorage aby tam ostalo take cislo aj po zatvoreni stranky
    let productNumbers = localStorage.getItem('cartNumbers');
    
    if(productNumbers) {
        document.querySelector('.icon').textContent = productNumbers
    }
}

function cartNumbers(product) {        //funckia pridanie do kosika pocet produktov ich hodnota do local storage key=cartNumbers, value = pocet produktov
    console.log('kliknuty produkt je:', product);
    
    let productNumbers = localStorage.getItem('cartNumbers'); // nacitanie hodnoty v lokalstorage (value)
    
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
    if(cartItems != null) {
        if(cartItems[product.id] == undefined)
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
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price)
    }
    
    
}

// kosik.html - nepopisujem budem to prerabat ked som sa do toho uz pustil
// myslim ze tuto funkcionalitu mozme pouzit aj na stranku "zoznam produktov - pridavanie do local storage a potom do kosika," 

function generateTable() { //funckkia zobrazenie kosika
    let cartItems = localStorage.getItem('productsInCart'); //zobere s localStorage produkty v kosiku do premennej
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    // let cartCost = localStorage.getItem('totalCost'); //zobere s kosika celkovu sumu do premenner
    let totalCost = localStorage.getItem('totalCost');

    //vypocet DPH
    let totalCostMath = totalCost * 0.20;
    let totalCostDPH = totalCost - totalCostMath;

    console.log(cartItems);

    if(cartItems && productContainer && totalCost ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <td class="products">
                <span>${item.name}</span>
            </td>
            <td class="price">${item.price},00</td>
            <td class="quantity">
                <i class="icon fas fa-arrow-alt-circle-left"></i>
                <span>${item.inCart}</span>
                <i class="fas fa-arrow-alt-circle-right"></i>
            </td>
            <td class="total">
                €${item.inCart * item.price},00
            </td>
            <td class="remove">
                <i onClick="removeProduct()" class="icon far fa-trash-alt"></i>
            </td> 
            `
        });


        productContainer.innerHTML += `
            <h4>
                CELKOVÁ CENA: €${totalCost}.00
            </h4>
            <h5>
                CELKOVÁ CENA BEZ DPH: €${totalCostDPH}.00
            </h5>
        `
    }

    
}

onLoadCartNumbers();
generateTable()

//odstranenie produktu s kosika // zatial rozrobene - skusam

function removeProduct() {
    let deleteBtns = document.querySelectorAll('.remove .icon');
    console.log('funguje');
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartCost = localStorage.getItem('totalCost');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productName;

    for(let i = 0; i < deleteBtns.length; i++) {
        console.log('ikona', [i]);

        
    }

    generateTable();
    onLoadCartNumbers();
}

// let removeIcon = document.getElementById('icon');
//     removeIcon.addEventListener('icon', () => {
//         console.log('odstranit z kosika');
        
//     })




// function displayCart() { //funckkia zobrazenie kosika
//     let cartItems = localStorage.getItem('productsInCart');
//     cartItems = JSON.parse(cartItems);
//     let productContainer = document.querySelector('.products');
//     let cartCost = localStorage.getItem('totalCost');

//     console.log(cartItems);
    
//     if(cartItems && productContainer ) {
//         productContainer.innerHTML = '';
//         Object.values(cartItems).map(item => {
//             productContainer.innerHTML += `
//             <div class="product">
//                 <i class="far fa-trash-alt"></i>
//                 <span>${item.name}</span>
//             </div>
//             <div class="price">${item.price},00</div>
//             <div class="quantity">
//                 <i class="fas fa-arrow-alt-circle-left"></i>
//                 <span>${item.inCart}</span>
//                 <i class="fas fa-arrow-alt-circle-right"></i>
//             </div>
//             <div class="total">
//             €${item.inCart * item.price},00
//             </div>
//             `
//         });


//         productContainer.innerHTML += `
//             <div class="basketTotalContainer">
//                 <h4 class="basketTotalTitle">
//                     celková cena
//                 <h4 class="basketTotal>
//                     €${cartCost}.00
//                 </h4>
//         `
//     }
    
// }

//PRODUKTY.HTML
$(document).ready(function() {
    
    $('#good').empty();
    $.get('eshop.json', function(response) {
        
            for (let prod of response) {
                console.log(prod);
                let newProd = `
                <div  class="goods">
                        <div class="tool-box">
                            <img src="${prod.image}" alt="product_1">
                            <a href=""></a>
                        </div>
                        <div class="description">
                            <p>${prod.name}</p>
                            <div class="values">
                                <h4>${prod.specialPrice}</h4>
                                <span><del>${prod.price}</del></span>
                            </div>
                        </div>
                    <div class="cart">
                        <a class="add-cart">do košíka</a> 
                    </div>
                </div>`;   
                $('#good').append(newProd); 
            }       
    

            $("#myBtn").click(function(){
                var str = $("#myInput").val();
                console.log(str);
                $("").hide()
            });
    
    });
});

