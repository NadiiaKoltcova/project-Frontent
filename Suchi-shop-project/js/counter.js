// Додаємо прослужку в вікні
window.addEventListener('click', function (event) {
// Обьявляємо змінну для лічильника
    let counter;

// Перевіряємо клік по кнопкам + або -
    if (event.target.dataset.action === 'plus' || event.target.dataset.action === 'minus') {
        // Знаходимо обгортку лічильника
        const counterWrapper = event.target.closest('.counter-wrapper')

        // Знаходимо div  з числом лічильника
        counter = counterWrapper.querySelector('[data-counter]');
        // Перевіряємо чи є елемент кнопка  коли зроблено клік +
    }

    if (event.target.dataset.action === 'plus') {
        counter.innerText = ++counter.innerText;
    }
    // Перевіряємо чи є елемент кнопка  коли зроблено клік -
    if (event.target.dataset.action === 'minus') {

//Перевіряємо чи являється елемент по якому ми зробили клік кнопкою мінус
        if (parseInt(counter.innerText) > 1) {
            //Зменшуємо лічильник
            counter.innerText = --counter.innerText;

        } else if (event.target.closest('.cart-wrapper') && parseInt(counter.innerText) === 1) {
            //Видалення товара із корзини
            event.target.closest('.cart-item').remove();
            // Статус товара в корзині
            toggleCartStatus();

            CartPriceAndDelivery();


        }
    }


    // Перевіряємо клік на + і -
    if (event.target.hasAttribute('data-action') && event.target.closest('.cart-wrapper')) {
        CartPriceAndDelivery();
    }
})
