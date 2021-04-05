//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
    //Al hacer click al boton guardar se debera ejecutar la funcion saveForm.
    document.getElementById("btnSavePerfil").addEventListener("click", function () {
        saveForm();
    });
});

//Funcion que almacenara los datos del formulario con localstorage.
function saveForm() {

    //obtengo los valores de los inputs
    let nombrePerfil = document.getElementById("nombrePerfil").value;
    let apellidoPerfil = document.getElementById("apellidoPerfil").value;
    let edadPerfil = document.getElementById("edadPerfil").value;
    let emailPerfil = document.getElementById("emailPerfil").value;
    let telephonePerfil = document.getElementById("telephonePerfil").value;
    let imagePerfil = document.getElementById("imagePerfil").value;

    //Realizo un objeto json con los datos obtenidos del formualario
    var currentProfile = {
        nombrePerfil: nombrePerfil,
        apellidoPerfil: apellidoPerfil,
        edadPerfil: edadPerfil,
        emailPerfil: emailPerfil,
        telephonePerfil: telephonePerfil,
        imagePerfil: imagePerfil
    };
    //Convierto el objeto javascript en una cadena de texto json para luego poder almacenar la misma.
    var myJson = JSON.stringify(currentProfile);
    window.localStorage.setItem("currentProfile", myJson);
}

//Cuando la pagina se recargue los datos del formularios estaran actualizados.
document.addEventListener("DOMContentLoaded", function (e) {
    let userProfile = JSON.parse(localStorage.getItem("currentProfile")); //Convierto la cadena de texto json en un objeto json para luego poder acceder a las propiedades del mismo.
    // Accedo a las propiedades
    document.getElementById("nombrePerfil").value = userProfile.nombrePerfil;
    document.getElementById("apellidoPerfil").value = userProfile.apellidoPerfil;
    document.getElementById("edadPerfil").value = userProfile.edadPerfil;
    document.getElementById("emailPerfil").value = userProfile.emailPerfil;
    document.getElementById("telephonePerfil").value = userProfile.telephonePerfil;
    document.getElementById("imagePerfil").value = userProfile.imagePerfil;
    document.getElementById("showImageProfile").innerHTML = `<div id="showImageProfile"><img src="` + userProfile.imagePerfil + `"border="0" 
    class="img-fluid mx-auto d-block"></div>`
});

