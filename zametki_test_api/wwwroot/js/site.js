// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.




function addProduct(event) {
    const form_data = new FormData(document.querySelector('.form'));
    const [name, content, date] = [form_data.get('name'), form_data.get('content'), new Date()];
    if (!name || !content) {
        event.preventDefault();
        return alert("Название или содержимое пусты");
    }
    const products = getProducts();

    products.push({ name, content, date });

    localStorage.setItem('products', JSON.stringify(products));
}

const getProducts = () => JSON.parse(localStorage.getItem('products') || '[]');
