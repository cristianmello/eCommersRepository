const CATEGORIES_URL = "http://localhost:3000/categoria";
const PUBLISH_PRODUCT_URL = "http://localhost:3000/publicarProducto";
const CATEGORY_INFO_URL = "http://localhost:3000/infoCategoria";
const PRODUCTS_URL = "http://localhost:3000/productos";
const PRODUCT_INFO_URL = "http://localhost:3000/infoProducto";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/comentarioProducto";
const CART_INFO_URL = "http://localhost:3000/infoCarrito";
const CART_BUY_URL = "http://localhost:3000/comprarCarrito";

var currentUser;

var showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function (url) {
  var result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}

document.addEventListener("DOMContentLoaded", function (e) {
  //Se obtiene el usuario logueado y se convierte en un objeto
  currentUser = JSON.parse(localStorage.getItem("currentUser"));

  //Si no existe usuario logueado se agrega a la barra de navegacion el link para iniciar sesión
  if (currentUser === null) {
    document.getElementById("navBar").innerHTML += `  
  <a class="py-2 d-none d-md-inline-block" id="sesionlink" href="index.html">Iniciar Sesión</a>
  `;
  } else {
    //Si existe usuario logueado, se agrega a la navBar un botón con el nombre de usuario.
    showNavBar(currentUser);
  }
});

//Funcion que eliminara el usuario logueado y los datos personales de mi perfil.
function signOut() {

  if (currentUser != null) { //chequeo si existe usuario, puede no ser necesario ya que si no hay usuario no hay botón para cerrar sesión.

    localStorage.removeItem("currentUser");
    currentUser = null;
    localStorage.removeItem("currentProfile");
    currentProfile = null;
  }

}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Escribe en html el usuario en forma de menu desplegable

function showNavBar() {
  let user = JSON.parse(localStorage.getItem("currentUser"));
  document.getElementById("navBar").innerHTML +=
    `<div class="dropdown"> <!-- Indico un menu desplegable -->
  <button class="btn btn-secondary dropdown-toggle" type="button" id="userMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
  `+ user.username + `
  </button> <!-- Para abrir un menu desplegable -->
  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> <!-- Creo el menu desplegable. -->
    <a class="dropdown-item" href="cart.html">Mi carrito</a>
    <a class="dropdown-item" href="my-profile.html">Mi perfil</a>
    <a class="dropdown-item" onclick="signOut();" href="index.html">Cerrar sesión</a>
  </div>
</div> `

}






