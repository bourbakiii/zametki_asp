const parseDate = date => {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(date[4] + date[5] + date[6]);
    return `${date[16] + date[17]}:${date[19] + date[20]} ${date[8]}${date[9]}.${month + 1}.${date[11] + date[12] + date[13] + date[14]}`;
}

let parentDOM = null
let modal_wrapperDOM = null;
let modal_product_name = null;
let modal_product_content = null;
window.onload = () => {
    modal_wrapperDOM = document.querySelector(".modal__wrapper");
    modal_product_name = modal_wrapperDOM.querySelector('.modal__name');
    modal_product_content = modal_wrapperDOM.querySelector('.modal__content')
    modal_wrapperDOM.onclick = hideModalWindow;
    modal_product_name.addEventListener('input', updateProduct, false);
    modal_product_content.addEventListener('input', updateProduct, false);

    parentDOM = document.querySelector(".index-page__products");
    setIndexPageProducts(true);
}


function checkForEmptyProducts(is_cleaning) {
    const products = getProducts();
    if (products.length) {
        if (is_cleaning) parentDOM.innerHTML = '';
        parentDOM.classList.remove("index-page__products_empty");
    }
    else {
        parentDOM.classList.add("index-page__products_empty");
        parentDOM.innerHTML = 'Кажется, заметок пока нет'
    }
}


async function setIndexPageProducts() {
    await checkForEmptyProducts();
    getProducts().forEach(product => parentDOM.appendChild(createDOMProduct(product)));
};

function createDOMProduct(product) {
    const wrapper = document.createElement('a'),
        name = document.createElement('p'),
        content = document.createElement('span'),
        date = document.createElement('span'),
        close = document.createElement('button');


    wrapper.id = `product-${product.id}`;
    wrapper.onclick = ({ target: elementDOM }) => {
        if (!elementDOM.classList.contains('index-page__products__item')) return;
        openModalWindow(product);
    }
    close.onclick = () => deleteProduct(product.id);

    wrapper.className = 'index-page__products__item';
    name.className = 'index-page__products__item__name';
    content.className = 'index-page__products__item__content';
    date.className = 'index-page__products__item__date';
    close.className = 'index-page__product__item__close';

    name.innerHTML = product.name;
    content.innerHTML = product.content;
    date.innerHTML = product.date;
    date.innerHTML = parseDate(product.date);
    close.innerHTML = 'Удалить';

    wrapper.appendChild(name);
    wrapper.appendChild(content);
    wrapper.appendChild(date);
    wrapper.appendChild(close);
    return wrapper;
}



function openModalWindow({id}) {
    modal_wrapperDOM.classList.add('modal__wrapper_showed');
    const product = getProducts().find(el => el.id == id);
    if (!product) return alert('ID продукта не передан');
    modal_wrapperDOM.id = product.id;
    modal_product_name.innerHTML = product.name;
    modal_product_content.innerHTML = product.content;
}

function hideModalWindow({ target: elementDOM }) {
    if (elementDOM.classList.contains('modal__wrapper')) elementDOM.classList.remove('modal__wrapper_showed');
}

function log() {
    console.log("some log cuntion");
}

function updateProduct(event) {
    const name = modal_product_name.innerText,
        content = modal_product_content.innerText;

    const products = getProducts();
    const product = products.find(el => el.id == modal_wrapperDOM.id);

    product.name = name;
    product.content = content;

    localStorage.setItem('products', JSON.stringify(products));

    let element_on_page = document.getElementById(`product-${modal_wrapperDOM.id}`);
    if (element_on_page) {
        element_on_page.querySelector('.index-page__products__item__name').innerHTML = name;
        element_on_page.querySelector('.index-page__products__item__content').innerHTML = content;

    }

}
