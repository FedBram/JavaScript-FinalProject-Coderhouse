// ------------------- ENTIDADES CLASES ------------------------ //

class Vinilo {
    constructor (id, titulo, artista, precio, cat, img) {
        this.id = id;
        this.titulo = titulo;
        this.artista = artista;
        this.precio = precio;
        this.cat = cat;
        this.img = img;
    }
}


// ---------------------------------------- VARIABLES -----------------------------------------------------//

//-------- SELECTORES GENERALES--------

let cartel = $('body')
let inputSrch = $(`#srchData`);
let btnSrch = $(`#btnSrch`);
let cards = $("#cards");
let order = $('#orderSelect')


//------------ ARRAYS ---------

let vinilos = [];
let vinilosNews = [];
let carrito = [];


// ---------- URL PARA PETICION AJAX -----

const URLGET = `https://mocki.io/v1/6279ec3f-2306-4f9b-8818-401c5e308f24`;


// ------------ LOGICAS DE CREACION DE OBJETOS, PUSHEO A ARRAY Y ALMACENAMIENTO EN LOCAL STORAGE ------------------------//

//--------------- CREACION Y ALMACENAMIENTO DE OBJETOS DEL ARRAY VINILOSNEWS -----------------

const Vinilo1 = vinilosNews.push(new Vinilo(1,`Animals`, `Pink Floyd`,3000, `Rock`, `https://img.discogs.com/lobz3kQRE_tMyg8NKKebxN9UnXo=/fit-in/600x597/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9431705-1480968179-9837.jpeg.jpg`));
const Vinilo2 = vinilosNews.push(new Vinilo(2,`Blonde on Blonde`, `Bob Dylan`,4300, `Rock`, `https://img.discogs.com/Q7M-_eHI7r1t_fDRAJr3z4f3hMc=/fit-in/600x597/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-7764632-1514500788-2286.jpeg.jpg`));
const Vinilo3 = vinilosNews.push(new Vinilo(3,`Diamond Dogs`, `David Bowie`,2900, `Rock`, `https://img.discogs.com/5YH-e2LXO7c5M_aJGMRUsT1w--U=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9797722-1558686292-8371.jpeg.jpg`));
const Vinilo4 = vinilosNews.push(new Vinilo(4,`Sticky Fingers`, `The Rolling Stones`,3000, `Rock`, `https://img.discogs.com/opltRShfrbknHcmXbOLcf0rU3WU=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-451342-1265844984.jpeg.jpg`));
const Vinilo5 = vinilosNews.push(new Vinilo(5,`The Wall`, `Pink Floyd`,4500, `Rock`, `https://img.discogs.com/1Bmfb9iMfaBPtpmTsBXcsXozGMI=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-8957729-1477237326-7283.jpeg.jpg`));

// ------- LOGICA DE ALMACENAMIENTO EN LOCALSTORAGE

const vinilosLocal = (key, value) => {localStorage.setItem(key,value)};
for (let Vinilo of vinilosNews) {
    vinilosLocal(Vinilo.id, JSON.stringify(Vinilo));
}

//--------------- CREACION Y ALMACENAMIENTO DE OBJETOS DEL ARRAY VINILOS -----------------

//---------------------- PETICION AJAX DE DATOS -------------------------

$.get(URLGET, function (respuesta, estado) {
    if(estado === "success"){
      let misDatos = respuesta;
      localStorage.setItem(`Vinilos`, JSON.stringify(misDatos));

    }
});

 //----- CREACION Y ALMACENAMIENTO DE OBJETOS EN ARRAY VINILOS A PARTIR DE LOS DATOS TRAIDOS

let misDatosTraidos = JSON.parse(localStorage.getItem(`Vinilos`));

if (misDatosTraidos == null){
    console.log(`Los datos estan terminando de cargarse.`);
}else{
    misDatosTraidos.forEach (e => {

        const newVinilo = new Vinilo(e.id, e.titulo, e.artista, e.precio, e.cat, e.img);
        vinilos.push(newVinilo);
        
    // -------- LOGICA DE ALMACENAMIENTO EN LOCALSTORAGE DE ARRAY VINILOS

        const vinilosLocal = (key, value) => {localStorage.setItem(key,value)};
        for (let Vinilo of vinilos) {
        vinilosLocal(Vinilo.id, JSON.stringify(Vinilo));
        }
    })
}



//--------------------------------- FUNCIONES -----------------------------------------------------//


//------------ LOGICA PARA IMPRESION DE CARDS GENERALES

function imprimirCards(Vinilo) {

    let newsCardsElemnts = document.createElement("div");
    newsCardsElemnts.setAttribute("class", "news__cards__elements");
    cards[0].appendChild(newsCardsElemnts);
    
    let newsCardsElemntsImg = document.createElement("img");
    newsCardsElemntsImg.setAttribute("src",`${Vinilo.img}`);
    newsCardsElemnts.appendChild(newsCardsElemntsImg);

    let newsCardsElemntsH6 = document.createElement("h6");
    newsCardsElemntsH6.innerHTML = Vinilo.titulo;
    newsCardsElemnts.appendChild(newsCardsElemntsH6);

    let newsCardsElemntsP = document.createElement("p");
    newsCardsElemntsP.innerHTML = Vinilo.artista;
    newsCardsElemnts.appendChild(newsCardsElemntsP);

    let newsCardsElemntsSpan = document.createElement("p");
    newsCardsElemntsSpan.innerHTML = `$${Vinilo.precio}`;
    newsCardsElemnts.appendChild(newsCardsElemntsSpan);

    let newsCardsElemntsBtn = document.createElement("button");
    newsCardsElemntsBtn.setAttribute(`class`,`btn btn-danger`);
    newsCardsElemntsBtn.setAttribute(`id`,`${Vinilo.id}`/ 32);
    newsCardsElemntsBtn.textContent = `Comprar`;
    newsCardsElemnts.appendChild(newsCardsElemntsBtn);

    let newsCardsElemntsBtnIr = document.createElement("button");
    newsCardsElemntsBtnIr.setAttribute(`class`,`btn btn-dark btn__carrito`);
    newsCardsElemntsBtnIr.setAttribute(`id`,`${Vinilo.id}`);
    newsCardsElemnts.appendChild(newsCardsElemntsBtnIr);

    let newsCardsElemntsBtnIrLink = document.createElement(`a`);
    newsCardsElemntsBtnIrLink.setAttribute(`href`,`./carrito.html`);
    newsCardsElemntsBtnIrLink.textContent = `Ir al carrito`;
    newsCardsElemntsBtnIr.appendChild(newsCardsElemntsBtnIrLink)

//--------- BOTON PARA EVENTO AGREGAR OBJETO AL CARRITO

   let botonPush = document.getElementById(`${Vinilo.id}` / 32) 
    botonPush.onclick = () => {
        agregarCarrito(Vinilo.id);
        $(`#${Vinilo.id}`).fadeIn()
    };
}



// ------------- LOGICA PARA EVENTO AGREGAR OBJETOS AL CARRITO 

function agregarCarrito(id) {   

    //GUARDA ELEMENTOS EN EL LOCALSTORAGE

    let carritoRefresh = JSON.parse(localStorage.getItem(`carrito`))

    if (localStorage.getItem(`carrito`) != null){
        let agregar = JSON.parse(localStorage.getItem(`${id}`));
        carritoRefresh.push(agregar);
        localStorage.setItem(`carrito`,JSON.stringify(carritoRefresh));
    }else {
        let agregar = JSON.parse(localStorage.getItem(`${id}`));
        carrito.push(agregar);
        localStorage.setItem(`carrito`,JSON.stringify(carrito));
    }
    
    //NOTIFICACION DE PRODUCTO AGREGADO CON EXITO

    let cartelDiv = document.createElement('div');
    cartelDiv.setAttribute('class','cartel')
    cartel[0].appendChild(cartelDiv);

    let cartelDivTxt = document.createElement('p');
    cartelDivTxt.setAttribute('class','cartelTxt')
    cartelDivTxt.textContent = 'AGREGADO AL CARRITO CON EXITO'
    cartelDiv.appendChild(cartelDivTxt)

    setTimeout(()=>{
        cartel[0].removeChild(cartelDiv);
    }, 2000)

}

// ------------- LOGICA PARA BARRA DE BUSQUEDA 

function search () {
    let srchVal = $(`#srchData`).val().toLowerCase();
    if(srchVal != ""){
        let srchTitle = vinilos.filter(e => e.titulo.toLowerCase().includes(srchVal));
        let srchArtist = vinilos.filter( e => e.artista.toLowerCase().includes(srchVal));
        
        localStorage.setItem(`Busqueda`, JSON.stringify(srchTitle));
        localStorage.setItem(`Busqueda1`, JSON.stringify(srchArtist));

        window.location.replace("./search.html");

    }else {
        localStorage.removeItem(`Busqueda`);
        localStorage.removeItem(`Busqueda1`);
        
        window.location.replace("./search.html");
    }
}


//---------- LOGICA PARA IMPRESION DE CARDS DEL CATALOGO ---------------

function imprimirCardsCat(){

    cards[0].textContent = ''
    vinilos.forEach(Vinilo => {
        imprimirCards(Vinilo)
    })

}

//-------------- LOGICA PARA SELECTOR ORDENAR POR... -----------------------


function ordenar() {
        
    let orderValue = $('#orderSelect').val()

    if(orderValue == 'Artista'){
        vinilos.sort(function(a, b) {
        if(a.artista > b.artista) {
            return 1;
        }
        if(a.artista < b.artista) {
            return -1;
        }
        return 0;
        })
    }else if (orderValue == 'Titulo'){
        vinilos.sort(function(a, b) {
            if(a.titulo > b.titulo) {
                return 1;
            }
            if(a.titulo < b.titulo) {
                return -1;
            }
            return 0;
            })
    }else if (orderValue == 'PrecioMenor'){
        vinilos.sort(function(a, b) {
            if(a.precio > b.precio) {
                return 1;
            }
            if(a.precio < b.precio) {
                return -1;
            }
            return 0;
            })
    }else if (orderValue == 'PrecioMayor'){
        vinilos.sort(function(a, b) {
            if(a.precio > b.precio) {
                return -1;
            }
            if(a.precio < b.precio) {
                return 1;
            }
            return 0;
            })
    }

    imprimirCardsCat()
}



//----------------------------------- EJECUCION DE EVENTOS GENERALES -------------------------------------------- //

//--------- BUSCADOR TECLA ENTER
inputSrch[0].addEventListener(`keypress`,function(event){
    if (event.keyCode === 13) {
        search();
    }
})

//------ BOTON BUSCADOR
btnSrch[0].addEventListener(`click`, search);