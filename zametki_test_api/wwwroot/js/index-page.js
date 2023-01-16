
let productsDOM = null
const modal = { wrapper: null, name: null, content: null };
window.onload = () => {
    modal.wrapper = document.querySelector(".modal__wrapper");
    modal.name = modal.wrapper.querySelector('.modal__name');
    modal.content = modal.wrapper.querySelector('.modal__content')
    modal.wrapper.onclick = hideModalWindow;
    modal.name.addEventListener('input', () => current_editing_product.update({ name: modal.name.innerText, content: modal.content.innerText }), false);
    modal.content.addEventListener('input', () => current_editing_product.update({ name: modal.name.innerText, content: modal.content.innerText }), false);
    productsDOM = document.querySelector(".index-page__products");
    setIndexPageProducts(true);
}

function checkForEmptyProducts(is_cleaning) {
    if (products.length) {
        if (is_cleaning) productsDOM.innerHTML = '';
        productsDOM.classList.remove("index-page__products_empty");
    }
    else {
        productsDOM.classList.add("index-page__products_empty");
        productsDOM.innerHTML = 'Кажется, заметок пока нет'
    }
}

async function setIndexPageProducts() {
    await checkForEmptyProducts();
    products.forEach(product => productsDOM.appendChild(product.DOM));
}

function openModalWindow(product) {
    current_editing_product = product;
    modal.wrapper.classList.add('modal__wrapper_showed');
    modal.wrapper.id = product.id;
    modal.name.innerHTML = product.name;
    modal.content.innerHTML = product.content;
}

function hideModalWindow({ target: elementDOM }) {
    if (elementDOM.classList.contains('modal__wrapper')) elementDOM.classList.remove('modal__wrapper_showed');
}