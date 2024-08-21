function CartPriceAndDelivery() {
    const cartWrapper = document.querySelector('.cart-wrapper');
    const priceElements = cartWrapper.querySelectorAll('.price__currency');
    const totalPriceEl = document.querySelector('.total-price');
    const deliveryCost = document.querySelector('.delivery-cost')
    const cartDelivery = document.querySelector('[data-cart-delivery]')



    let priceTotal = 0;

    priceElements.forEach(function (item) {
        const amountEl = item.closest('.cart-item').querySelector('[data-counter]')
//
        const currencyPrice = parseInt(amountEl.innerText) * parseInt(amountEl.innerText);
        //Додати к-сть товарів вся сума
        priceTotal += parseInt(item.innerText) * parseInt(amountEl.innerText);


    });
//Ціна на сторінці
    totalPriceEl.innerText = priceTotal;

// Скриваємо або відображаємо блок з цінами доставки
    if (priceTotal > 0) {
        cartDelivery.classList.remove('none')
    }else{
        cartDelivery.classList.add('none')
    }
// Ціна доставки товарів
    if(priceTotal >= 600) {
        deliveryCost.classList.add('free');
        deliveryCost.innerText = 'безкоштовно';

    }
    else{
        deliveryCost.classList.add('free');
        deliveryCost.innerText = '100 грн';
    }

}