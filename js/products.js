const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_ASC_BY_COST = "costUp";
const ORDER_DESC_BY_COST = "costDown";
const ORDER_DESC_BY_PROD_SOLD_COUNT = "soldCount";
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;
var currentProductsArray = [];


//Funcion en la que se usara para mostrar los productos
function showProductsList(array) {

    let htmlContentToAppend = "";
    //Recorro array, planteo las condiciones para mostrar la lista de productos, creo div para cada imagen y las expreso en el documento html.
    for (let i = 0; i < array.length; i++) {
        let product = array[i];

        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))) {

            htmlContentToAppend += `
            
            <div class="col-lg-6 col-sm-12">
                <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail card-img-top">
                    <div class="card-body">
                        <div>
                            <h4 class="mb-1">`+ product.name + `</h4>
                        </div>
                        <div>
                            <p class="card-text">` + product.description + `</p>
                        </div>
          
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                              <h3>` + product.cost + ` ` + product.currency + `</h3>
                            </div>
                            <small class="text-muted">` + product.soldCount + ` vendidos</small>
                        </div>
                    </div>
                </a>       
            </div>    
            `
        }
        document.getElementById("products-list-container").innerHTML = htmlContentToAppend;
    }
}

//Obtengo los datos del objeto y le asigno a currentProductsArray
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            sortAndShowProducts(ORDER_ASC_BY_NAME, currentProductsArray); //Al cargar la pagina se ordenara segun el criterio de ORDER_ASC_BY_NAME
        }
    });

    //Si se hace click en el boton que se asigno el id correspondiente se ordenara y mostrara los productos segun sus criterios definidos
    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_NAME);
    });

    //Si se hace click en el boton que se asigno el id correspondiente se ordenara y mostrara los productos segun sus criterios definidos
    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_NAME);
    });

    //Si se hace click en el boton que se asigno el id correspondiente se ordenara y mostrara los productos segun sus criterios definidos
    document.getElementById("sortByCostAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    //Si se hace click en el boton que se asigno el id correspondiente se ordenara y mostrara los productos segun sus criterios definidos
    document.getElementById("sortByCostDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    //Si se hace click en el boton que se asigno el id correspondiente se ordenara y mostrara los productos segun sus criterios definidos
    document.getElementById("sortBySoldCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PROD_SOLD_COUNT);
    });

    //Se filtraran los productos haciendo click en el boton filtrar
    document.getElementById("rangeFilterCost").addEventListener("click", function () {

        //Se obtienen los valores de los campos de costo minimo y maximo.
        minCost = document.getElementById("rangeFilterCostMin").value;
        maxCost = document.getElementById("rangeFilterCostMax").value;

        //Se va parsear el valor obtenido anteriormente
        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
            minCost = parseInt(minCost); //Parseo el valor a entero
        }
        else {
            minCost = undefined; //Inicializo a su valor inicial.(Es decir ningun valor)
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
            maxCost = parseInt(maxCost);
        }
        else {
            maxCost = undefined;
        }

        showProductsList(currentProductsArray); // muestro los productos dependiendo de los valores escritos

    });

    // Si se hace click en el boton limpiar los valores se borraran
    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCostMin").value = "";
        document.getElementById("rangeFilterCostMax").value = "";

        //necesario inicializar para que se distribuyan los productos cuando no hay valores escritos
        minCost = undefined;
        maxCost = undefined;

        showProductsList(currentProductsArray); //Se ejecuta la funcion para mostrar los productos como estaban incialmente.

    });

});

// Funcion donde establezco Los criterios de orden 
function sortProducts(criteria, array) {
    let result = [];

    //Criterios para orden ascendente de ABCdario
    if (criteria === ORDER_ASC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        });

        //Criterios de orden descendente de ABCdario.
    } else if (criteria === ORDER_DESC_BY_NAME) {
        result = array.sort(function (a, b) {
            if (a.name > b.name) { return -1; }
            if (a.name < b.name) { return 1; }
            return 0;
        });

        //criterior de orden descendente segun relevancia del producto
    } else if (criteria === ORDER_DESC_BY_PROD_SOLD_COUNT) {
        result = array.sort(function (a, b) {
            let aSoldCount = parseInt(a.soldCount);
            let bSoldCount = parseInt(b.soldCount);

            if (aSoldCount > bSoldCount) { return -1; }
            if (aSoldCount < bSoldCount) { return 1; }
            return 0;
        });

        //criterior de orden ascendente segun valor del producto
    } else if (criteria === ORDER_ASC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost > bCost) { return 1; }
            if (aCost < bCost) { return -1; }
            return 0;
        });

        //criterior de orden descendente segun valor del producto
    } else if (criteria === ORDER_DESC_BY_COST) {
        result = array.sort(function (a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if (aCost > bCost) { return -1; }
            if (aCost < bCost) { return 1; }
            return 0;
        });
    }
    return result;
}


//Funcion que ordenara la lista de productos segun los criterios establecidos anteriormente y llamara a la funcion de mostrar productos.
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList(currentProductsArray);
}