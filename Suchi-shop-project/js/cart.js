// Выбираем элемент корзины
const cartWrapper = document.querySelector('.cart-wrapper');

// Відслідковуємо клік на сторінці
window.addEventListener('click', function(event) {
    if (event.target.hasAttribute('data-cart')) {

        const card = event.target.closest('.card');

        // Збираємо дінні з продукту і записуємо в единий об'єкт
        const productInfo = {
            id: card.getAttribute('data-roll-id'),
            imgSrc: card.querySelector('.product-img').getAttribute('src'),
            title: card.querySelector('.item-title').innerText,
            itemsInBox: card.querySelector('[data-items-in-box]').innerText,
            weight: card.querySelector('.price__weight').innerText,
            price: card.querySelector('.price__currency').innerText,
            counter: card.querySelector('[data-counter]').innerText,
        };

        // Перевіряємо чи є товар в кошику
        const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);

        // Перевіряємо чи є товар в корзині
        if (itemInCart) {
            const counterElement = itemInCart.querySelector('[data-counter]');
            counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
        } else {

            // Дані підставимо в шаблон для товара в кошику
            const cartItemHTML = `
            <div class="cart-item" data-id="${productInfo.id}">
                <div class="cart-item__top">
                    <div class="cart-item__img">
                        <img src="${productInfo.imgSrc}" alt="${productInfo.title}"/>
                    </div>
                    <div class="cart-item__desc">
                        <div class="cart-item__title">${productInfo.title}</div>
                        <div class="cart-item__weight">${productInfo.itemsInBox} / ${productInfo.weight}</div>

                        <!-- cart-item__details -->
                        <div class="cart-item__details">

                            <div class="items items--small counter-wrapper">
                                <div class="items__control" data-action="minus">-</div>
                                <div class="items__current" data-counter="">${productInfo.counter}</div>
                                <div class="items__control" data-action="plus">+</div>
                            </div>

                            <div class="price">
                                <div class="price__currency">${productInfo.price}</div>
                            </div>

                        </div>
                        <!-- // cart-item__details -->

                    </div>
                </div>
            </div>`;

            // Відображаємо товари в кошику
            cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
        }

      card.querySelector('[data-counter]').innerText ='1';
        // Статус товара в корзині
        toggleCartStatus();
//Перераховує всю сумму товарів
        CartPriceAndDelivery();

    }

});
