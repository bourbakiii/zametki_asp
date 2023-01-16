
function addProduct(event) {
    event.preventDefault();
    const form_data = new FormData(document.querySelector('.form'));
    const [name, content] = [form_data.get('name'), form_data.get('content')];
    products.push(new Product({ id: Math.random(), name, content }));
    localStorage.setItem('products', JSON.stringify(products));
}
