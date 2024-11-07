

function requestAndAddElementsToDom(page){
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/products/main/" + page);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    /*
        <div class="col-lg-3 col-md-4 col-sm-6" >
            <div class="card color1">
                <img class="card-img-top" src="https://images.freeimages.com/images/large-previews/f6c/japanese-food-1327418.jpg" alt="Title" 
                style="max-height: 325px;"/>
                <div class="card-body">
                    <h4 class="card-title">ummmm sushi</h4>
                    <p class="card-text">ching chang ching chun</p>
                </div>

                <button 
                    type="button"
                    class="btn btn-primary"
                >
                    Agregar al carrito
                </button>
                
            </div>
        </div>
    */
    xhr.onload = () => {
    if (xhr.status == 200) {
        let response = JSON.parse(xhr.responseText);
        console.log(response);
        flexBox = document.getElementById("showing_all_products");
        let killingKids = flexBox.children;
        let howManyKidsAreWeKilling = killingKids.length;
        for(let i = 0; i < howManyKidsAreWeKilling; i++){
            console.log(killingKids[0]);
            flexBox.removeChild(killingKids[0]);
        }

        response.map((ProductData)=>{
            let mainDiv = document.createElement("div");
            mainDiv.classList.add("col-lg-3");
            mainDiv.classList.add("col-md-4");
            mainDiv.classList.add("col-sm-6");

            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card");
            cardDiv.classList.add("color1");

            let imagexd = document.createElement("img");
            imagexd.classList.add("card-img-top");
            imagexd.src = ProductData.imageUrl;
            imagexd.alt = "Title";
            imagexd.style = "max-height: 325px;"

            let cardBody = document.createElement("div");
            cardBody.classList.add("card-body");

            let cardTitle = document.createElement("h4");
            cardTitle.classList.add("card-title");
            let textNodeTitle = document.createTextNode(ProductData.title); 
            cardTitle.appendChild(textNodeTitle);

            let cardDescription = document.createElement("p");
            cardDescription.classList.add("card-text");
            let textNodeDescription = document.createTextNode(ProductData.description); 
            cardDescription.appendChild(textNodeDescription);
            /*
            <!-- Modal trigger button -->
            <button
                type="button"
                class="btn btn-primary btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#modalId3"
            >
                Launch
            </button>
            */
            let buttonInCard = document.createElement("button");
            buttonInCard.classList.add("btn");
            buttonInCard.classList.add("btn-primary");
            buttonInCard.setAttribute('data-bs-toggle', 'modal');
            buttonInCard.setAttribute('data-bs-target', '#modalId3');
            buttonInCard.type = "button";
            
            buttonInCard.addEventListener("click", function(){
                sessionStorage.setItem("id", ProductData.uuid);
            });
            
            let textNodeButton = document.createTextNode("Agregar al carrito"); 
            buttonInCard.appendChild(textNodeButton);
   
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardDescription);

            cardDiv.appendChild(imagexd);
            cardDiv.appendChild(cardBody);
            cardDiv.appendChild(buttonInCard);
            
            mainDiv.appendChild(cardDiv);
            
            flexBox.appendChild(mainDiv);


        });

    } else if (xhr.status == 404) {
        console.log("Didnt find the product you were looking for");
    } else{
        console.log(`Error: ${xhr.status}`);
    }
        

    };
    xhr.send();
}

document.addEventListener("DOMContentLoaded", function(){
    
    //on start inject the products on sell
    //make request
    requestAndAddElementsToDom(1);
    //clean();

    let navBar = document.getElementById("navigation");
    for(let i = 0; i < navBar.children.length; i++){
        navBar.children[i].addEventListener("click", function(){requestAndAddElementsToDom(i+1)});
    }
    
    
    /*
    <input type="number" max="100" min="1" id="inputModal" style="width: 100%; height: 50px; border-radius: 6px;">
    BotonAgregarCarrito
    */
    let buttonConfirm = document.getElementById("BotonAgregarCarrito"); 
    buttonConfirm.addEventListener("click", function(){
        //call carrito function
        let inputModal = document.getElementById("inputModal");
        
        add(sessionStorage.getItem("id"), inputModal.value);
    }); 
    
    
    let cartbutton = document.getElementById("button_to_move_to_shopping_cart_that_is_useless_but_requirement"); 
    cartbutton.addEventListener("click", function(){
        window.location.href = "/views/shopping_cart.html"
    }); 
});



//make event listener that jsut wehn activated, it changes teh dom
