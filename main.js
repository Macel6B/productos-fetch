const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";

function getData(){
    fetch(URLMain)
    .then((response) => {
        console.log(response);
        response.json().then((res)=>{
             // console.log(res.length);
             // console.log(res[0].rating)
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

function createCards(products) {
    products.forEach(product => {
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
                        </div>
                    </div>
                    <div>
                        <!-- Button trigger modal -->
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        ${product.title}
                        </button>

                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel"><h1>${product.title}</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                ${product.description}<br>
                                $${product.price}
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
getData();