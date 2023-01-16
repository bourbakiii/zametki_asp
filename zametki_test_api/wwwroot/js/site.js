class Product {
    constructor({ name, content, date = Date()}) {
        this.id = Math.random();
        this.name = name;
        this.content = content;
        this.date = date;
        console.log(1123);
        this.DOM = generateDOMProduct(this);
    }
    delete() {
        products.splice(products.findIndex(element => element.id != this.id),1);
        this.DOM.remove();
        checkForEmptyProducts(false);
        localStorage.setItem('products', JSON.stringify(products));
    }
    update({ name, content }) {
        this.name = name;
        this.content = content;
        this.updateDOM({name, content});
        localStorage.setItem('products', JSON.stringify(products));
    }
    updateDOM({name,content}) {
        let elementDOM = document.getElementById(`product-${this.id}`);
        elementDOM.querySelector('.index-page__products__item__name').innerHTML = name;
        elementDOM.querySelector('.index-page__products__item__content').innerHTML = content;
    }
    click({ target }) {
        if (!target.classList.contains('index-page__products__item')) return;
        openModalWindow(this);
    }
}
const getProducts = () => JSON.parse(localStorage.getItem('products') || '[]').map(product => new Product(product));
const products = getProducts();
let current_editing_product = null;

function parseDate(date)  {
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(date[4] + date[5] + date[6]);
    return `${date[16] + date[17]}:${date[19] + date[20]} ${date[8]}${date[9]}.${month + 1}.${date[11] + date[12] + date[13] + date[14]}`;
}

function generateDOMProduct(product) {
    console.log('GENERATING');
    const wrapper = document.createElement('a'),
        name = document.createElement('p'),
        content = document.createElement('span'),
        date = document.createElement('span'),
        close = document.createElement('button');

    wrapper.id = `product-${product.id}`;
    wrapper.onclick = (event) => product.click(event);
    close.onclick = () => product.delete();

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
