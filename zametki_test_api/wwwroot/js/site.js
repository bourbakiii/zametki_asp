// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

const getProducts = () => JSON.parse(localStorage.getItem('products') || '[]');

function deleteProduct(id) {
    console.log(`product-${id}`)
    console.log(document.getElementById(`product-${id}`));


    const products = getProducts().filter(element => element.id != id);
    localStorage.setItem('products', JSON.stringify(products));

    document.getElementById(`product-${id}`).remove();
    checkForEmptyProducts(false);
}

