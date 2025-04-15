const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";
const ulMenu = document.getElementById("ulMenu");

function getData(cat){
    const options = {"method": "GET"};
    fetch(URLMain+ cat, options)
    .then((response) => {
        console.log(response);
        response.json().then((res)=>{
            main.querySelectorAll(".card").forEach(card => card.remove()); 
            createCards(res)
        });
    })
    .catch((err)=>{
        main.insertAdjacentHTML("beforeend",
            `<div class="alert alert-danger" role="alert">
                ${err.message}
            </div>`);
    });
} // getData

function getCategories(){
    const options = {"method": "GET"};
    fetch(URLMain+"categories/", options)
    .then((response) => {
        response.json().then((res)=>{
            //  console.log("Categories: ", res);
            res.forEach((cat)=>{
                ulMenu.insertAdjacentHTML("afterbegin",
                `<li><a class="dropdown-item" onclick="getData('category/${(cat.replace("'", "%27"))}');" >${cat}</a></li>`);
            });
        });
    })
    .catch((err)=>{
        main.insertAdjacentHTML("beforeend",
            `<div class="alert alert-danger" role="alert">
                ${err.message}
            </div>`);
    });
} // getCategories

getCategories();
getData("");

function createCards(products) {
    products.forEach((product, index) => {
        const modalId = `productModal${index}`; 
        main.insertAdjacentHTML("beforeend", `
            <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4 d-flex align-items-center">
                        <img src="${product.image}" class="img-fluid rounded-start p-2" alt="${product.title}" style="object-fit: contain; max-height: 200px;">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <p class="card-text"><strong>$${product.price}</strong></p>

                            <!-- Button trigger modal -->
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modalId}">
                                Ver más
                            </button>

                            <!-- Modal -->
                            <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="${modalId}Label">${product.title}</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            ${product.description}<br>
                                            <strong>$${product.price}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        `);
    });
}
// create cards
// tomar los 20 productos y mandarlos a imprimir en cards dentro del main en html


