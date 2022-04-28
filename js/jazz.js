//---------------------------------------- LOGICA DE EJECUCION AL INICIAR EL SCRIPT -------------------------------------//

//----------- FILTRO POR CATEGORIA

vinilos = vinilos.filter(e => e.cat == "Jazz")

//-------- IMPRESION DE CARDS EN EL CATALOGO FILTRADO POR CATEGORIA 

imprimirCardsCat()

//--------------------- EJECUCION DE EVENTO ORDENAR POR... -----------//

order[0].addEventListener('change',ordenar)
