//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function (e) {
  
  document.getElementById("buttonLogin").addEventListener("click", function () {
    login();
  });

});

function login() {

  let username = document.getElementById("inputUsername").value;
  
  var currentUser =
                    '{' +
                    '"username":"' + username +
                    '"}';
  
  window.localStorage.setItem("currentUser", currentUser);
}

