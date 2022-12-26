const parseDate = date => `${date[11] + date[12]}:${date[14] + date[15]} ${date[8]}${date[9]}.${date[5] + date[6]}.${date[0] + date[1] + date[2] + date[3]}`;

window.onload = () => setIndexPageProducts();


function setIndexPageProducts() {
    const parentDOM = document.querySelector(".index-page__products");
    getProducts().forEach(product => parentDOM.appendChild(createDOMProduct(product)));
};

function createDOMProduct(product) {
    const wrapper = document.createElement('a'),
        name = document.createElement('p'),
        content = document.createElement('span'),
        date = document.createElement('span');

    wrapper.className = 'index-page__products__item';
    name.className = 'index-page__products__item__name';
    content.className = 'index-page__products__item__content';
    date.className = 'index-page__products__item__date';

    name.innerHTML = product.name;
    content.innerHTML = product.content;
    date.innerHTML = product.date;
    date.innerHTML = parseDate(product.date);

    wrapper.appendChild(name);
    wrapper.appendChild(content);
    wrapper.appendChild(date);
    console.log("Returned component: ");
    console.log(wrapper);
    return wrapper;
}

