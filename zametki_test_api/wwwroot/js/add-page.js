function addProduct(event) {
    const form_data = new FormData(document.querySelector('.form'));
    const [name, content, date] = [form_data.get('name'), form_data.get('content'), Date()];
    if (!name || !content) {
        event.preventDefault();
        return alert("Название или содержимое пусты");
    }
    const products = getProducts();

    products.push({ id: Math.random(), name, content, date });

    localStorage.setItem('products', JSON.stringify(products));
}

