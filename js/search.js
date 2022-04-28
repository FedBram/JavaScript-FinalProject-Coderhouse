// ---------------------------------------- VARIABLES -----------------------------------------------------//

//------ DATOS TRAIDOS DEL LOCAL STORAGE PARA IMPRESION DE RESULTADOS DE LA BUSQUEDA ------

let busqueda = JSON.parse(localStorage.getItem(`Busqueda`))
let busqueda1 = JSON.parse(localStorage.getItem(`Busqueda1`))


//---------------------------------- EJECUCIONES AL INICIAR EL SCRIPT ------------------------//

//---------------IMPRESION DE RESULTADOS DE LA BUSQUEDA --------------------

if (busqueda == null & busqueda1 == null){

    console.log(`No se encontraron resultados`);

    let carritoVacio = document.createElement(`p`);
    carritoVacio.innerHTML = `No se encuentra el vinilo que buscas`;
    cards[0].appendChild(carritoVacio);

}else if (busqueda != 0 & busqueda1 != 0){

    busqueda.forEach(Vinilo => {
        imprimirCards(Vinilo)
    })

    busqueda1.forEach(Vinilo => {        
        imprimirCards(Vinilo)
    })

}else if (busqueda.length != 0){
    
    busqueda.forEach(Vinilo => {       
        imprimirCards(Vinilo)
    })

}else if (busqueda1 != 0){

    busqueda1.forEach(Vinilo => {      
        imprimirCards(Vinilo)
    })

}else {
    console.log(`No se encontraron resultados`)

    let carritoVacio = document.createElement(`p`);
    
    carritoVacio.innerHTML = `No se encuentra el vinilo que buscas`
    cards[0].appendChild(carritoVacio)
}