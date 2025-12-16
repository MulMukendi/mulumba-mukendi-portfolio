async function getData() {
    const response = await fetch("/data.json");
    const products = await response.json();
    return products;
}

async function main() {
    const products = await getData();
    await loadProducts(products);
}

function loadProducts(products) {
    const bodyElement = document.getElementById("bod");
    products.forEach(product => {

        
        const element = document.createElement("div");
        /*const topSection = document.createElement("div");
        const bottomSection = document.createElement("div");
        topSection.classList.add("div1");
        bottomSection.classList.add("div2");
        element.classList.add("card");*/


        element.innerHTML = `<div class="card">
                                    <div class="div1">
                                        <img class="prodImage" src="${product.imageUrl}" alt="">
                                    </div>
                                    <div class="div2">
                                        <h3 class="name">${product.name}</h3>
                                        <p class="available">${product.available}</p>
                                        <p class="price">$ ${product.price}</p>
                                        <button class="add-to-cart" >Add to cart</button>
                                    </div>
                            </div>`;
        /*element.appendChild(topSection);
        element.appendChild(bottomSection);*/
        bodyElement.appendChild(element);
    });
   
}

/*function addToCart(){
    const addButtons =  document.querySelectorAll(".add-to-cart");
    addButtons.forEach(element => {
            element.addEventListener('click', ()=>{
                window.alert("yes baby!");
                const cardinfo = element.closest(".card");
                const title = cardinfo.querySelector(".name").textContent;
                const price = Number(cardinfo.querySelector(".price").textContent);
                const image = cardinfo.querySelector(".prodImage").src;

                const item = document.createElement("div");
                item.innerHTML = `<img id="cartimage" src="${image}" alt="">
                                    <p>${title}</p>
                                    <p>${price}</p>`;

                item.classList.add("item");
                theCart.append(item);
            })
    });

}
*/





/*function addToCart() {
   
    const itemList = document.getElementById("#itemList");

    const bodyElement = document.getElementById("bod");
    bodyElement.addEventListener("click", (e)=> {
        if (e.target.classList.contains("add-to-cart")) {
            //find the card it is attached to

            const productCard = e.target.closest(".card");

            //get the product details
            const productName = productCard.querySelector(".name").textContent;
            const productPrice = productCard.querySelector(".price").textContent;
            const prodImage = productCard.querySelector(".prodImage").src;

           /* const cartItem = document.createElement("div");
            cartItem.innerHTML = `<img src="${prodImage}">
                                  <p>${productName}</p>
                                  <p>${productPrice}</p>
            `;*/

            //window.alert(`Added: ${productName} -  $${productPrice}`);

            /*itemList.style.backgroundColor = "blue";
            cartItem.add.classList("cartElement");
            itemList.append(cartItem);*/
        //}

    //});
//}

let totalCartQuantityInt= 0;
let itemCount = 0;
function addToCart() {
    array = [];
    
    const itemList = document.getElementById("itemList");
    const bodyElement = document.getElementById("bod");
    bodyElement.addEventListener("click", (e)=> {
        if (e.target.classList.contains("add-to-cart")) {
            //find the card it is attached to

            const productCard = e.target.closest(".card");
            
            //get the product details
            const productName = productCard.querySelector(".name").textContent;
            const productPrice = productCard.querySelector(".price").textContent;
            const prodImage = productCard.querySelector(".prodImage").src;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cartElement");
            totalCartQuantityInt++;
            document.getElementById("cartQuantity").textContent = totalCartQuantityInt;
           

            array.push(productName);
            itemCount = array.filter(item => item === productName).length;

                
            
            
            cartItem.innerHTML = `<img src="${prodImage}">
                                  <p>${productName}</p>
                                  <p id="itemCount">${itemCount}</p> *
                                  <p style="margin-right: 1.5rem">${productPrice}</p>
            `;
            

            itemList.append(cartItem);
            
        };

    });
}




const closeBtn = document.getElementById("close");
const theCart = document.querySelector(".cartItems");
const openCart = document.getElementById("openCart");

closeBtn.addEventListener("click", ()=> {
    theCart.style.display = "none";
});

openCart.addEventListener("click", ()=>{
    theCart.style.display = "block";

});

document.addEventListener("DOMContentLoaded", ()=> {
    addToCart();
})

main();