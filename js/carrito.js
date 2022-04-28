//--------------------------------- VARIABLES ---------------------------------------//

let total = 0;

//------------------SELECTORES---

let carritoCards = $(`#carritoCards`);
let prinTotal = $('#total');
let btnComprar = $('#btnComprar')


//------------------- ARRAYS -----------------------------------------------------------------//

// ----- TRAE CARRITO DEL LOCALSTORAGE Y ALMACENAR EN ARRAY

let carritoTraido = JSON.parse(localStorage.getItem(`carrito`));


//--------------------------------- FUNCIONES -----------------------------------------------------//

//------ LOGICA PARA EVENTO QUITAR OBJETO DEL CARRITO

function quitarElemento(id) {

    let quitar = JSON.parse(localStorage.getItem(`carrito`));

    let refresh = quitar.filter(e => e.id != id);

    localStorage.setItem(`carrito`, JSON.stringify(refresh));
}


//------ LOGICA PARA EVENTO DE COMPRA
 
function comprar() {
    alert('Gracias por su compra!');
    localStorage.removeItem('carrito')
    location.reload()
}

//---------------------------------- EJECUCIONES AL INICIAR EL SCRIPT ------------------------//

//-------------- LOGICAs DE IMPRESION DE LOS OBJETOS DENTRO DEL CARRITO ---------

if (carritoTraido == null){

    console.log(`Carrito vacio`);
    let carritoVacio = document.createElement(`p`);
    carritoVacio.innerHTML = `Su carrito se encuentra vacio`;
    carritoCards[0].appendChild(carritoVacio);
    prinTotal[0].textContent = `$0`;

}else if (carritoTraido != 0){    

    //-- ELIMINA OBJETOS DUPLICADOS
    
    let buscar = {};
    let carritoTraidoPrint = carritoTraido.filter((e) => {
        let existente = !buscar[e.id];
        buscar[e.id] = true;
        return existente;
    });

    //------CALCULA EL PRECIO TOTAL DE ELEMENTOS EN EL CARRITO

    let precio = carritoTraido.map((item) => {
        total = total + Number(item.precio);
        return total;
    });
    let precioTotal = precio.pop()


    //---- CONTINUA LOGICA DE IMPRESION

    carritoTraidoPrint.forEach(Vinilo => {

        //Determina cantidad de productos iguales para reflejarlo en el contador         
        let counter = carritoTraido.filter(e => e.id == Vinilo.id);
        //Creacion de las cards
        let carritoCardsElemnts = document.createElement("div");
        carritoCardsElemnts.setAttribute("class", "carrito__cards__elements");
        carritoCards[0].appendChild(carritoCardsElemnts);

        let carritoCardsElemntsDiv = document.createElement(`div`);
        carritoCardsElemntsDiv.setAttribute("class", "carrito__cards__elements__img");
        carritoCardsElemnts.appendChild(carritoCardsElemntsDiv);
        
        let carritoCardsElemntsImg = document.createElement("img");
        carritoCardsElemntsImg.setAttribute("src",`${Vinilo.img}`);
        carritoCardsElemntsDiv.appendChild(carritoCardsElemntsImg);

        let carritoCardsElemntsTxt = document.createElement(`div`);
        carritoCardsElemntsTxt.setAttribute("class", "carrito__cards__elements__txt");
        carritoCardsElemnts.appendChild(carritoCardsElemntsTxt);

        let carritoCardsElemntsH6 = document.createElement("h6");
        carritoCardsElemntsH6.innerHTML = Vinilo.titulo;
        carritoCardsElemntsTxt.appendChild(carritoCardsElemntsH6);

        let carritoCardsElemntsP = document.createElement("p");
        carritoCardsElemntsP.innerHTML = Vinilo.artista;
        carritoCardsElemntsTxt.appendChild(carritoCardsElemntsP);

        let carritoCardsElemntsCounter = document.createElement('div');
        carritoCardsElemntsCounter.setAttribute('class','carrito__cards__elements__counter');
        carritoCardsElemnts.appendChild(carritoCardsElemntsCounter);

        let counterInput = document.createElement('input');
        counterInput.setAttribute('class','carrito__cards__elements__counter__input')
        counterInput.setAttribute('type','text')
        counterInput.setAttribute('value',`${counter.length}`)
        counterInput.setAttribute('id',`input${Vinilo.id}`);
        counterInput.setAttribute('readOnly','readOnly')
        carritoCardsElemntsCounter.appendChild(counterInput)

        let counterBtnInc = document.createElement('button');
        counterBtnInc.setAttribute('class','btn btn-dark carrito__cards__elements__counter__inc');
        counterBtnInc.setAttribute('id',`inc${Vinilo.id}`);
        counterBtnInc.textContent = 'Agregar';
        carritoCardsElemntsCounter.appendChild(counterBtnInc);

        let carritoCardsElemntsSpan = document.createElement("p");
        carritoCardsElemntsSpan.innerHTML = `$${Vinilo.precio}`;
        carritoCardsElemnts.appendChild(carritoCardsElemntsSpan);

        let carritoCardsElemntsBtn = document.createElement("button");
        carritoCardsElemntsBtn.setAttribute(`class`,`btn btn-danger`);
        carritoCardsElemntsBtn.setAttribute(`id`,`${Vinilo.id}`);
        carritoCardsElemntsBtn.textContent = `X`;
        carritoCardsElemnts.appendChild(carritoCardsElemntsBtn);

    //------------- BOTON PARA EVENTO AGREGAR +1 
        //Selector
        let btnInc = document.getElementById(`inc${Vinilo.id}`)
        //Evento
        btnInc.onclick = () => {
            //Agrega elemento en Array y guarda en Local para reflejar cambios al recargar la pag.
            let agregar = JSON.parse(localStorage.getItem(`${Vinilo.id}`));            
            carritoTraido.push(agregar)
            localStorage.setItem('carrito',JSON.stringify(carritoTraido))  
            console.log(carritoTraido)          
            //Calcula precio total
            precioTotal = precioTotal + Number(Vinilo.precio);                
            prinTotal[0].textContent = `$${precioTotal}`;
            //Modifica contador                      
            counter = carritoTraido.filter(e => e.id == Vinilo.id);            
            counterInput.setAttribute('value',`${counter.length}`);
        }

    //------------- BOTON PARA EVENTO QUITAR OBJETO DEL CARRITO
        //Selector
        let btnQuitar = document.getElementById(`${Vinilo.id}`);
        //Evento
        btnQuitar.onclick = () => {
            quitarElemento(Vinilo.id);  

            //Remueve card
            carritoCards[0].removeChild(carritoCardsElemnts);    

            //Imprime precio total actualizado
            let precioTotalRefresh = carritoTraido.filter(e => e.id == Vinilo.id);                        
            precioTotalRefresh = precioTotalRefresh.map( e => {
                precioTotal = precioTotal - Number(e.precio);
                return precioTotal
            })
            precioTotalRefresh = precioTotalRefresh.pop()            
            prinTotal[0].textContent = `$${precioTotalRefresh}`;
        }
    })
    btnComprar[0].addEventListener('click',comprar)
    prinTotal[0].textContent = `$${precioTotal}`;

}else{
    console.log(`Carrito vacio`)
    let carritoVacio = document.createElement(`p`);
    carritoVacio.innerHTML = `Su carrito se encuentra vacio`;
    carritoCards[0].appendChild(carritoVacio);
    prinTotal[0].textContent = `$0`;
}