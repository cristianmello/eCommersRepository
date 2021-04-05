let comissionPercentage = 0.15; //inicializo la comision con la que se calculara el precio total.
let MONEY_SYMBOL = "$";
let DOLLAR_SYMBOL = "USD";
let DOLLAR_CURRENCY = "Dólares (USD)";
let PESO_CURRENCY = "Pesos Uruguayos (UYU)";
var formInfo = document.forms['formModal'];


function showTable() {
    fetch('https://japdevdep.github.io/ecommerce-api/cart/654.json')
        .then(res => res.json())  //Hace la concexion y definimos como quiere que nos la devolviese.
        .then(res => { //Capturamos ese json y ejecutamos una funcion.

            //Mostramos los datos en la primer tabla.
            document.getElementById("tableContainerOne").innerHTML += ` 
        
                <td><img src="` + res.articles[0].src + `" width="100" height="100" class="img-thumbnail"></td>

                <td>${res.articles[0].name}</td>

                <td>${res.articles[0].unitCost} ${res.articles[0].currency}</td>

                <!--Con oninput ejecutamos la funcion especificada cada vez que haya alguna modificacion en el input.-->
                <td><input class="form-control" type="number" style="width:60px;" min="0" max="${res.articles[0].count}" id="countProduct" value="0" oninput="updateAllCosts()"></td>
             
                <!--Espacio en html en el que se mostrara el subtotal en la tabla-->
                <th id="subtotalPrizeTable">${MONEY_SYMBOL}</th> 

                               
                `
            //Mostramos los datos en la segunda tabla.
            document.getElementById("tableContainerTwo").innerHTML += `
            
                <td><img src="` + res.articles[1].src + `" width="100" height="100" class="img-thumbnail"></td>

                <td>${res.articles[1].name}</td>

                <td>${res.articles[1].unitCost} ${res.articles[1].currency}</td>

                <!--Con oninput ejecutamos la funcion especificada cada vez que haya alguna modificacion en el input-->
                <td><input class="form-control" type="number" style="width:60px;" min="0" max="${res.articles[1].count}" id="countProductTwo" value="0" oninput="updateAllCosts()"></td>

                <!--Espacio en html en el que se mostrara el subtotal en la tabla-->
                <th id="subtotalPrizeTwoTable">${DOLLAR_SYMBOL}</th>
                
                                   
                    `
        });

}
showTable();

//Función que se utiliza para actualizar los costos de la publicación
function updateAllCosts() {
    //Obtengo el valor del input con el id correspondiente y lo parseo.
    var count = parseInt(document.getElementById("countProduct").value) || 0;
    var countTwo = parseInt(document.getElementById("countProductTwo").value) || 0;
    //Calculo y muestro el subtotal y el simbolo de la moneda en la tabla con id correspondiente.
    document.getElementById("subtotalPrizeTable").innerHTML = MONEY_SYMBOL + count * 100;
    document.getElementById("subtotalPrizeTwoTable").innerHTML = DOLLAR_SYMBOL + countTwo * 12500;

    //Condicional en la que obtengo el valor del select selecionado y hago calculos segun la opcion del select seleccionada para luego mostrar en html.
    if ((document.getElementById("articleCurrency")).value == PESO_CURRENCY) {
        document.getElementById("productCostText").innerHTML = MONEY_SYMBOL + Math.round((count * 100) + (countTwo * 40 * 12500));
        document.getElementById("costShipping").innerHTML = MONEY_SYMBOL + Math.round(((count * 100) * comissionPercentage) + ((countTwo * 40 * 12500) * comissionPercentage));
        document.getElementById("totalCostText").innerHTML = MONEY_SYMBOL + Math.round((((count * 100) * comissionPercentage) + (count * 100)) + (((countTwo * 40 * 12500) * comissionPercentage) + (countTwo * 40 * 12500)));
    }
    else if ((document.getElementById("articleCurrency")).value == DOLLAR_CURRENCY) {
        document.getElementById("productCostText").innerHTML = DOLLAR_SYMBOL + Math.round((count * 100 / 40) + (countTwo * 12500));
        document.getElementById("costShipping").innerHTML = DOLLAR_SYMBOL + Math.round(((count * 100 / 40) * comissionPercentage) + ((countTwo * 12500) * comissionPercentage));
        document.getElementById("totalCostText").innerHTML = DOLLAR_SYMBOL + Math.round((((count * 100 / 40) * comissionPercentage) + (count * 100 / 40)) + (((countTwo * 12500) * comissionPercentage) + (countTwo * 12500)));
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    //Ejecuto la funcion especificada cuando este seleccionada esta opcion del radio
    document.getElementById("premiumRadio").addEventListener("change", function () {
        comissionPercentage = 0.15;
        updateAllCosts();
    });
    //Ejecuto la funcion especificada cuando este seleccionada esta opcion del radio
    document.getElementById("expressRadio").addEventListener("change", function () {
        comissionPercentage = 0.07;
        updateAllCosts();
    });

    //Ejecuto la funcion especificada cuando este seleccionada esta opcion del radio
    document.getElementById("standardradio").addEventListener("change", function () {
        comissionPercentage = 0.05;
        updateAllCosts();
    });

});

//Funcion que restringe los valores del select segun el año escogido, año 2020 == value 16 opcion de meses noviembre y diciembre. 
function showMonth2020() {

    let year = document.getElementById("validDateYear").value; // obtengo el valor del select que contiene años.
    let month = document.getElementById("validDateMonth"); // obtengo el select que contiene los meses.

    if (year == 16) { // si se selecciona el año 2020(select tiene value=16), apareceran los meses noviembre y diciembre  en el select de meses.
        month.innerHTML = `
        <option value="11">Noviembre</option>
        <option value="12">Deciembre</option>
        `
    } else {
        //Si se selecciona un año distinto de 2020, apareceran todos los meses del año como opcion en el select de meses.
        month.innerHTML = `
        <option value="01">Enero</option>
        <option value="02">Febrero </option>
        <option value="03">marzo</option>
        <option value="04">Abril</option>
        <option value="05">Mayo</option>
        <option value="06">Junio</option>
        <option value="07">Julio</option>
        <option value="08">Agosto</option>
        <option value="09">Septiembre</option>
        <option value="10">Octubre</option>
        <option value="11">Noviembre</option>
        <option value="12">Deciembre</option>
      `
    }
}

//Funcion que deshabilita o habilita los inputs dependiendo del input radio seleccionado( id=radioCard || id=radioBank)
function check() {
    //Obtengo los inputs del modal
    let card = document.getElementById("radioCard");
    let bank = document.getElementById("radioBank");
    let cardNumber = document.getElementById("targetNumber");
    let securityCode = document.getElementById("cvv");
    let month = document.getElementById("validDateMonth");
    let year = document.getElementById("validDateYear");
    let propietary = document.getElementById("namePropietary");
    let account = document.getElementById("numberAccount");
    let cedula = document.getElementById("ci");
    let calle = document.getElementById("street");
    let numeroCalle = document.getElementById("streetNumber");
    let esquina = document.getElementById("streetCorner");

    //Si se selecciona el radio de tarjeta de credito HABILITA los siguientes inputs.
    if (card.checked) {
        cardNumber.disabled = false;
        securityCode.disabled = false;
        month.disabled = false;
        year.disabled = false;
        propietary.disabled = false;
        calle.disabled = false;
        numeroCalle.disabled = false;
        esquina.disabled = false;
    } else {
        //Si se selecciona el radio de tarjeta de credito DESHABILITA los siguientes inputs.
        cardNumber.disabled = true;
        securityCode.disabled = true;
        month.disabled = true;
        year.disabled = true;
        propietary.disabled = true;
    }
    //Si se selecciona el radio de cuenta bancaria HABILITA los siguientes inputs.
    if (bank.checked) {
        account.disabled = false;
        cedula.disabled = false;
        calle.disabled = false;
        numeroCalle.disabled = false;
        esquina.disabled = false;
    } else {
        //Si se selecciona el radio de cuenta bancaria DESHABILITA los siguientes inputs.
        account.disabled = true;
        cedula.disabled = true;
    }

}
check();

//Funcion que muestra alert.
$(document).ready(function () {
    $("#alertSI").hide(); // Oculta el alert en el html.
    $("#alertNO").hide();//Oculta el alert escrito en el html.
    $("#formModal").submit(function (e) {
        e.preventDefault(); // Detengo la accion del submit.
        //Obtengo  los valores de los inputs.
        targetNumber = $.trim($("#targetNumber").val()); //trim elimina espacios en blanco.
        cvv = $.trim($("#cvv").val());
        namePropietary = $.trim($("#namePropietary").val());
        street = $.trim($("#street").val());
        streetNumber = $.trim($("#streetNumber").val());
        streetCorner = $.trim($("#streetCorner").val());
        numberAccount = $.trim($("#numberAccount").val());
        ci = $.trim($("#ci").val());
        radioCard = document.getElementById("radioCard")
        radioBank = document.getElementById("radioBank")


        if (radioCard.checked) {
            if (targetNumber.length > 0 && cvv.length > 0 && namePropietary.length > 0 && street.length > 0 && streetNumber.length > 0 && streetCorner.length > 0) { // Cantidad de caracteres en los inputs.
                $("#alertSI").fadeTo(2000, 500).slideUp(500, function () { //Especifica cuanto tiempo en milisegundos se ejecutara la funcion.
                    $("#alertSI").slideUp(500); // Velocidad con la que aparece arriba la animacion en milisegundos
                });
            } else {
                $("#alertNO").fadeTo(2000, 500).slideUp(500, function () {
                    $("#alertNO").slideUp(500);
                });
            }
        }
        if (radioBank.checked) {
            if (numberAccount.length > 0 && ci.length > 0 && street.length > 0 && streetNumber.length > 0 && streetCorner.length > 0) {
                $("#alertSI").fadeTo(2000, 500).slideUp(500, function () {
                    $("#alertSI").slideUp(500);
                });
            } else {
                $("#alertNO").fadeTo(2000, 500).slideUp(500, function () {
                    $("#alertNO").slideUp(500);
                });
            }
        }

    });
});

//Funcion que muestra alert al presionar button de comprar dependiendo de si la cantidad de producto es distinto de 0.
function showAlertButton() {

    countInput1 = document.getElementById("countProduct").value;
    countInput2 = document.getElementById("countProductTwo").value;
    payButton = document.getElementById("payButton");
    showAlert = document.getElementById("alertContainer");


    //Muestra un alert si la cantidad de producto es 0 en ambos productos de la tabla.
    if (countInput1 == 0 && countInput2 == 0) { 
        showAlert.innerHTML = `<div class="alert alert-warning" role="alert" style="width: auto">
    Seleccione una cantidad de productos distinta a CERO
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
    
    `
    //Reescribo el href=#ventana para poder Abrir el modal y finalizar compra.
    } else {
        payButton.innerHTML = `
        <a href=#ventana id="payButton" class="btn btn-primary btn-lg" data-toggle="modal">Comprar</a>
        `
    }
}

//Funcion que se ejecutara en el boton finalizar compra del modal, envia los datos del carrito con el metodo post
function compra(){

    //Hace la peticion a la ruta 
fetch('http://localhost:3000/datosCompra', {
    method: 'POST',
    headers: {
        'content-Type': 'application/json'
    },

    body: JSON.stringify({
        //Creo la estructura JSON que sera convertida en una estructura de cadena de texto.
        datos_De_Compra: {
            //Seobtienen todos los valores necesarios de la validacion de la compra.
            targetNumber:document.getElementById("targetNumber").value,
            codeSecurity:document.getElementById("cvv").value,
            propietaryName:document.getElementById("namePropietary").value,
            numberAccount:document.getElementById("numberAccount").value,
            CI:document.getElementById("ci").value,
  
            street:document.getElementById("street").value,
            streetNumber:document.getElementById("streetNumber").value,
            streetCorner:document.getElementById("streetCorner").value,
  
            countProduct_1:document.getElementById("countProduct").value,
            costProduct_1:document.getElementById("subtotalPrizeTable").innerText,
            
            countProduct_2:document.getElementById("countProductTwo").value,
            costProduct_2:document.getElementById("subtotalPrizeTwoTable").innerText,
            
            totalCost:document.getElementById("totalCostText").innerText
  
        }
    })
    //Promesa que trae la respuesta de compra exitosa y se guarda como json
  }).then(function(res){
      return res.json() 
    //Promesa que muestra el mensaje json
  }).then(respuesta =>{
      console.log(respuesta.msg)
  })
}