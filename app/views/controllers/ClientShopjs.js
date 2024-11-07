document.addEventListener("DOMContentLoaded", function() {
    
    let cart = returnAll();

    //MATAR A LOS NIÑOS QUE BENDICION DE FRASE
    const mainDiv = document.getElementById("aqui_metemos_todo");
    // let killingKids = flexBox.children;
    // let howManyKidsAreWeKilling = killingKids.length;
    // for(let i = 0; i < howManyKidsAreWeKilling; i++){
    //     console.log(killingKids[0]);
    //     flexBox.removeChild(killingKids[0]);
    // }
    let howManyKidsAreWeKilling = mainDiv.children.length;
    for(let i = 0; i < howManyKidsAreWeKilling; i++){
        mainDiv.removeChild(mainDiv.children[0]);
    }
    //no he matado a los niños :<
    console.log(cart);

    let calculateTotal = 0;
    const jump_line = document.createElement("br");

    cart.map((idAndAmount) =>{

        //get a whole ass product
        const xhr = new XMLHttpRequest();
        console.log(idAndAmount.id);
        xhr.open("GET", "http://localhost:3000/products/" + idAndAmount.id);
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        xhr.onload = () => {
            if (xhr.status == 200) {
                
                let response = JSON.parse(xhr.responseText);
                
                const div1 = document.getElementById("aqui_metemos_todo");
                //<div class="d-flex">
                let div2 = document.createElement("div");
                div2.classList.add("d-flex");
                
                //<div class="flex-grow-1 ms-3">
                let div3 = document.createElement("div");
                div3.classList.add("flex-grow-1");
                div3.classList.add("ms-3");
                
                //<h5 class="mt-0">Mejillones
                let h5Main = document.createElement("h5");
                h5Main.classList.add("mt-0");
                let cardTitletext = document.createTextNode(response.title); 
                h5Main.appendChild(cardTitletext);
                
                //<a name="delete_button_mejillones"
                let deletebutton = document.createElement("a");
                deletebutton.classList.add("btn");
                deletebutton.classList.add("btn-danger");
                deletebutton.name="delete_button_mejillones"
                deletebutton.id = "delete_" + response.uuid;
                
                
                //no agregue href = # por que asi no se reinicia la pagina, y aqui tengo que agregar 
                //cosas de dom para eliminar este nodo
                deletebutton.addEventListener("click", function(){
                    //eitehr make a func that goe through the children of parent and find us
                    //or somehow sen ourselfs
                    mainDiv.removeChild(div2); //this might cause errors
                    deleteProduct(idAndAmount.id);
                    window.location.href = "shopping_cart.html"
                });
                const trahscan = document.createElement("i");
                trahscan.classList.add("fa-solid");
                trahscan.classList.add("fa-trash-can");
                deletebutton.appendChild(trahscan);
                h5Main.appendChild(deletebutton);

                


                //<!-- We are gonna do a subgrid cause its easier -->
                //<div class="container"></div>
                let div4 = document.createElement("div");
                div4.classList.add("container");

                //<div class="row">
                let div5 = document.createElement("div");
                div5.classList.add("row");
                
                //the following 2 are under div 5, its childs
                //<div class="col-md-4 col-sm-12"> hice el de abajo primero but i should append them alrevez
                let div6_1 = document.createElement("div");
                div6_1.classList.add("col-md-4");
                div6_1.classList.add("col-sm-12");

                // <p class="center_text"> 
                //     <img src="https://media.istockphoto.com/id/916156000/photo/food.webp?s=612x612&w=0&k=20&c=r19uEhLyAEYP8uj4FOnTeTNEHJd-c7th4K2pesZV_8E="
                //     alt="mejillon" width="200px" >
                // </p>
                let imageWithinTextToCenter = document.createElement("p");
                imageWithinTextToCenter.classList.add("center_text");
                
                let imgProduct = document.createElement("img");
                imgProduct.src = response.imageUrl;
                imgProduct.alt = response.title;
                imgProduct.style = "max-width: 200px;"

                imageWithinTextToCenter.appendChild(imgProduct);
                div6_1.appendChild(imageWithinTextToCenter);

                //Aqui empezamos el largo
                //<div class="col-md-8 col-sm-12">
                let div6_2 = document.createElement("div");
                div6_2.classList.add("col-md-8");
                div6_2.classList.add("col-sm-12");

                
                let form_1 = document.createElement("form");
                //<div class="input-group mb-3"></div>
                let div7_1 = document.createElement("div");
                div7_1.classList.add("input-group");
                div7_1.classList.add("mb-3");

                //child <span class="input-group-text">Cantidad:</span>
                let span1 = document.createElement("span");
                span1.classList.add("input-group-text");
                let spanCantidad = document.createTextNode("Cantidad:"); 
                span1.appendChild(spanCantidad);
                div7_1.appendChild(span1);

                //<input disabled id="cantidad1" type="number" min="1" class="form-control" placeholder="Ingresa cantidad">
                let cantidad1 = document.createElement("input");
                cantidad1.disabled = true;
                cantidad1.type = "number"
                cantidad1.min = "1";
                cantidad1.classList.add("form-control");
                cantidad1.placeholder = idAndAmount.amount;
                div7_1.appendChild(cantidad1);

                // <button  id="replaceButton" type="button" class="btn btn-primary">
                //     <i class="fa-solid fa-pencil"></i>
                // </button>
                let modifyButton = document.createElement("button");
                modifyButton.classList.add("btn");
                modifyButton.classList.add("btn-primary");
                modifyButton.id = "modifyButton_"+idAndAmount.id;
                modifyButton.type = "button";

                const pencil = document.createElement("i");
                pencil.classList.add("fa-solid");
                pencil.classList.add("fa-pencil");
                modifyButton.appendChild(pencil);

                modifyButton.addEventListener("click", function() {
                    sessionStorage.setItem("id", response.uuid);

                    // Create new buttons
                    const newButton1 = document.createElement("button");
                    newButton1.classList.add("btn", "btn-success");
                    const checkmark = document.createElement("i");
                    checkmark.classList.add("fa-solid");
                    checkmark.classList.add("fa-check");
                    newButton1.appendChild(checkmark);
                    newButton1.addEventListener("click", function(){
                        
                        add(sessionStorage.getItem("id"), cantidad1.value);
                    });
            
                    const newButton2 = document.createElement("button");
                    newButton2.classList.add("btn", "btn-danger");
                    const tache = document.createElement("i");
                    tache.classList.add("fa-solid");
                    tache.classList.add("fa-xmark");
                    newButton2.appendChild(tache);
            
                    cantidad1.disabled = false; //tal vez causa errores
            
            
                    // Get the parent element of the modifyButton
                    const buttonContainer = modifyButton.parentElement;
            
                    // Remove the modifyButton
                    buttonContainer.removeChild(modifyButton);
            
                    // Add new buttons to the container
                    buttonContainer.appendChild(newButton1);
                    buttonContainer.appendChild(newButton2);
                });

                div7_1.appendChild(modifyButton);

                form_1.appendChild(div7_1);

                let form_2 = document.createElement("form");
                // <div class="input-group mb-3">
                // <span class="input-group-text">Precio:</span>
                // <input id="precio1" type="number" min="0" class="form-control" placeholder="Ingresa cantidad" disabled>
                // <span class="input-group-text">MXN:</span>
                // </div>
                let div7_2 = document.createElement("div");
                div7_2.classList.add("input-group");
                div7_2.classList.add("mb-3");

                let span2 = document.createElement("span");
                span2.classList.add("input-group-text");
                let spanPrecio = document.createTextNode("Precio:"); 
                span2.appendChild(spanPrecio);
                div7_2.appendChild(span2);

                let precio1 = document.createElement("input");
                precio1.disabled = true;
                precio1.id = "precio_" + idAndAmount.id;
                precio1.type = "number"
                precio1.classList.add("form-control");
                precio1.placeholder = response.pricePerUnit;
                div7_2.appendChild(precio1);
                
                let span3 = document.createElement("span");
                span3.classList.add("input-group-text");
                let spanTipoDeDinero = document.createTextNode("MXM:"); 
                span3.appendChild(spanTipoDeDinero);
                div7_2.appendChild(span3);

                form_2.appendChild(div7_2);
                div6_2.appendChild(form_1);
                div6_2.appendChild(form_2);

                //creo que esto es lo de alrevez
                div5.appendChild(div6_2);
                div5.appendChild(div6_1);

                div4.appendChild(div5);

                div3.appendChild(h5Main);
                div3.appendChild(div4);
                
                div2.appendChild(div3);
                div1.appendChild(div2);

                let total = document.getElementById("TotalCompraTexto");
                calculateTotal += idAndAmount.amount*response.pricePerUnit;
                
                let paragraph = document.createElement("p");

                let text = document.createTextNode(response.title + ":" + idAndAmount.amount + " x ");
                paragraph.append(text);
                paragraph.append(jump_line);
                text = document.createTextNode(response.pricePerUnit +" = " +idAndAmount.amount*response.pricePerUnit + "MXM\n");
                paragraph.append(text);
                paragraph.append(jump_line);
                total.append(paragraph);
                
            } else if (xhr.status == 404) {
                console.log("Didnt find the product you were looking for");
            } else{
                console.log(`Error: ${xhr.status}`);
            }
            
            let texto = document.getElementById("TotalCompraTexto");
            texto.append(document.createTextNode("El total essss:  " + calculateTotal));
            
        };
        xhr.send();

        
        
    } );

});
