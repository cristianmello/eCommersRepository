var product = {};
var productsList = {};
const maxRating = 5;
const scores = 4

//Imagenes ilustrativas
function showImagesGallery(array) {

    let htmlImages = "";
    //Recorro array, creo div para cada imagen y las expreso en el documento html
    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        if (i == 0) {
            htmlImages += `
            <div class="carousel-item active">
            <img src="` + imageSrc + `" class="d-block w-100" alt="">
            </div>
            `

        } else {
            htmlImages += `
             <div class="carousel-item">
             <img src="` + imageSrc + `" class="d-block w-100" alt="">
             </div>`
        }

    }
    document.getElementById("productImg").innerHTML = htmlImages;
    
}

//Productos relacionados
function showRelatedProducts(relatedProductsArray) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsList = resultObj.data;

            let htmlRelatedProducts = "";
//Recorro array, creando div para cada elemento y concateno las mismas en el identificador. clases utilizadas de category-info.js
            for (let i = 0; i < relatedProductsArray.length; i++) {

                let imagesRelated = productsList[relatedProductsArray[i]]

                htmlRelatedProducts += `
                <div class= "col-lg-3 col-md-4 col-6 border">
                    <div id="relatedVideogameImg" class= "row">
                        <img class="img-fluid p-2" src="`+ imagesRelated.imgSrc + `">                                              
                    </div>                   
                    <div "relatedProductsInfo" class= "row p-2">
                    <p>`+ imagesRelated.name + `</p> 
                    <p>`+ imagesRelated.description + `</p>
                    </div>
                    <div class= "row p-2">
                    <a href="product-info.html">Ver</a>
                    </div>                     
                </div>`
            }
            document.getElementById("relatedProductsContainer").innerHTML = htmlRelatedProducts;
        }
    })
}
//Para ultimos comentarios
function showComents(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let coments = array[i];
        let stars = ``;

        stars = getStar(coments.score);

        htmlContentToAppend += `
            <div>
            <p class="text-muted">`+ coments.user + ` - ` + coments.dateTime + ` - ` + stars + `</p>            
            </div>
            <div class= "row">
            <p>`+ coments.description + `</p>
            </div>
            <hr>
            `

    }
    document.getElementById("productComents").innerHTML = htmlContentToAppend;
}

//Para ultimos comentarios
function getStar(score) {

    let starRating = ``;

    for (let i = 1; i <= maxRating; i++) {
        if (i <= Math.round(score)) {
            starRating += '<i class="fa fa-star checked"></i>';
        } else {
            starRating += '<i class="fa fa-star"></i>';
        }
    }
    return starRating;
}

//Para ultimos comentarios
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productComent = resultObj.data;
            showComents(productComent);
        }
    });
});

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName")
            let productCostHTML = document.getElementById("productCost");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCategoryHTML = document.getElementById("productCategory");
            let productCountHTML = document.getElementById("productCount");

            productNameHTML.innerHTML = product.name;
            productCostHTML.innerHTML = product.cost;
            productDescriptionHTML.innerHTML = product.description;
            productCategoryHTML.innerHTML = product.category
            productCountHTML.innerHTML = product.soldCount;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            showRelatedProducts(product.relatedProducts)
        }
    });
});



