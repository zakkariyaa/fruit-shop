const fruits = [
    'apple', 'avocado', 'banana', 'cherry', 'coconut', 'grapes', 'guava', 'kiwi',
    'mango', 'orange', 'papaya', 'pear', 'pineapple', 'strawberry', 'watermelon'
];
const fruitGallery = document.querySelector('.fruit-gallery');

// Populate the fruit gallery section
for (let i = 0; i < fruits.length; i++) {
    const article = document.createElement('article');
    const image = document.createElement('img');
    const h3 = document.createElement('h3');
    const button = document.createElement('button');

    image.src = `./images/${fruits[i]}.jpg`;
    image.alt = `an image of ${fruits[i]} fruit`
    h3.textContent = fruits[i].toUpperCase();
    button.textContent = '🛒';

    const div = document.createElement('div');

    const decreaseBtn = document.createElement('button');
    decreaseBtn.classList.add = 'decrase-btn';
    decreaseBtn.textContent = '➖';

    const increaseBtn = document.createElement('button');
    increaseBtn.classList.add = 'increase-btn'
    increaseBtn.textContent = '➕';

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add = 'delete-btn'
    deleteBtn.textContent = '🗑️';

    div.append(decreaseBtn);
    div.append(increaseBtn);
    div.append(deleteBtn);

    article.append(image);
    article.append(h3);
    article.append(button);
    article.append(div);


    fruitGallery.append(article);
}


// FRUIT BASKET
const fruitBasket = document.querySelector('.fruit-basket');
const totalDiv = document.querySelector('.total-div');
const basket = {};
fruits.forEach(el => basket[el] = 0);


// Iterate over the article elements and listen for click event
// on each of the buttons, then update appropriately
Array.from(fruitGallery.children).forEach(article => {
    const fruitName = article.children[1].textContent.toLowerCase();
    const addToBasketBtn = article.children[2];
    const decrementBtn = article.children[3].children[0];
    const incrementBtn = article.children[3].children[1];
    const deleteBtn = article.children[3].children[2];

    addToBasketBtn.addEventListener('click', () => {
        addToBasket(fruitName);
    });

    decrementBtn.addEventListener('click', () => {
        decrementInBasket(fruitName);
    });

    incrementBtn.addEventListener('click', () => {
        addToBasket(fruitName);
    });

    deleteBtn.addEventListener('click', () => {
        deleteFromBasket(fruitName);
    });
});


const addToBasket = (fruitName) => {
    basket[fruitName] += 1;
    updateBasket();
};

const decrementInBasket = (fruitName) => {
    basket[fruitName] = basket[fruitName] > 0 ? basket[fruitName] -= 1 : 0;
    updateBasket();
};

const deleteFromBasket = (fruitName) => {
    basket[fruitName] = 0;
    updateBasket();
};

const updateBasket = () => {
    const purchasedFruits = Object.keys(basket).filter(el => basket[el]);
    const fruitQuantity = Object.values(basket).filter(num => num);
    const sumFruitQuantity = fruitQuantity.reduce((accum, current) => accum + current, 0);
    const ul = document.createElement('ul');

    purchasedFruits.forEach(el => {
        const li = document.createElement('li');

        const h3 = document.createElement('h3');
        h3.textContent = el;

        const span = document.createElement('span');
        span.textContent = basket[el];



        li.append(h3);
        li.append(span);

        ul.append(li);
    });

    fruitBasket.replaceChildren(ul);

    // Total div section
    const totalDiv2 = document.createElement('div');

    const total = document.createElement('h3');
    total.textContent = 'Total';

    const totalFruits = document.createElement('span');
    totalFruits.textContent = `Fruits: ${purchasedFruits.length}`;

    const totalQuantity = document.createElement('span');
    totalQuantity.textContent = `Quantity: ${sumFruitQuantity}`;

    totalDiv2.append(total);
    totalDiv2.append(totalFruits);
    totalDiv2.append(totalQuantity);

    totalDiv.replaceChildren(totalDiv2);
};
