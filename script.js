document.addEventListener('DOMContentLoaded', () => {
    (async () => {
        try {
            const responce = await fetch('data.json');

            if (!responce.ok) {
                throw new Error('Faild from data.json');
            }

            const data = await responce.json();
            const productBox = document.querySelector('.products-list');

            data.forEach(({ id, name, description, price, url }) => {
                const productEl = `
                <li class="products-item"> 
                    <article class="brand-products-item">
                        <div class="products-item-photo-wrp">
                            <a href="#">
                                <img src="${url}" alt="${name}" class="products-item-photo">
                            </a>
                        </div>
                        <div class="products-item-txt-wrp">
                            <h3 class="products-item-title uppercase">${name}</h3>
                            <p class="products-item-txt">${description}</p>
                            <span class="products-item-price">${price}</span>
                        </div>
                        <button class="products-item-btn" type="button" data-product-id="${id}">
                            <svg width="27" height="25" viewBox="0 0 27 25" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.8765 22.2662C21.9215 22.2549 21.9428 22.2339 21.9605 22.2129C21.9683 22.2037 21.9761 22.1946 21.9839 22.1855C22.0204 22.1438 22.0237 22.0553 22.0229 22.0105C22.0097 21.9044 21.9189 21.8315 21.8417 21.8315C21.838 21.8315 21.8341 21.8317 21.8317 21.8318C21.7536 21.8372 21.6658 21.9409 21.6724 22.0625C21.6818 22.1793 21.7679 22.2662 21.8397 22.2662H21.8765ZM8.22003 22.2599C8.31921 22.2599 8.39984 22.1655 8.39984 22.0496C8.39984 21.9341 8.31921 21.8401 8.22003 21.8401C8.12091 21.8401 8.04022 21.9341 8.04022 22.0496C8.04022 22.1655 8.12091 22.2599 8.22003 22.2599ZM21.9999 24.2662C21.9522 24.2662 21.8883 24.2662 21.8397 24.2662C20.7021 24.2662 19.7571 23.3545 19.677 22.198C19.5969 20.9929 20.4942 19.9183 21.6957 19.8364C21.7446 19.8331 21.7933 19.8315 21.8417 19.8315C22.9804 19.8315 23.9418 20.7324 24.0195 21.8884C24.051 22.4915 23.8746 23.0612 23.4903 23.5012C23.106 23.9575 22.5768 24.2177 21.9999 24.2662ZM8.22003 24.2599C7.01581 24.2599 6.04022 23.2709 6.04022 22.0496C6.04022 20.8291 7.01581 19.8401 8.22003 19.8401C9.42419 19.8401 10.3998 20.8291 10.3998 22.0496C10.3998 23.2709 9.42419 24.2599 8.22003 24.2599ZM21.1989 17.3938H9.13354C8.70062 17.3938 8.31635 17.1005 8.2038 16.6775L4.27802 2.24768H1.52222C0.993896 2.24768 0.561035 1.80859 0.561035 1.27039C0.561035 0.733032 0.993896 0.292969 1.52222 0.292969H4.99982C5.43182 0.292969 5.8161 0.586304 5.92859 1.01025L9.85443 15.4391H20.5581L24.1149 7.13379H12.2583C11.7291 7.13379 11.2962 6.69373 11.2962 6.15649C11.2962 5.61914 11.7291 5.17908 12.2583 5.17908H25.5891C25.9095 5.17908 26.2146 5.34192 26.3901 5.61914C26.5665 5.89539 26.5989 6.23743 26.4702 6.547L22.08 16.807C21.9198 17.1653 21.5832 17.3938 21.1989 17.3938Z"/>
                            </svg>
                            <span>Add to Cart</span>
                        </button>
                    </article>
                </li>
                    `
                productBox.insertAdjacentHTML('beforeend', productEl)
            });


            const addBtns = document.querySelectorAll('.products-item-btn');
            const cartItemsSection = document.querySelector('.cart-items');
            const cartItems = [];
            function addToCart(product, productId) {
                const existingItem = cartItems.find((item) => item.id === productId);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    const newItem = { ...product, quantity: 1 };
                    cartItems.push(newItem);
                }
            }

            function updateCartItemsSection() {
                const cartSpan = document.querySelector(".cart-btn-link span");
                const cartItemsBox = document.querySelector('.cart-items-box');
                cartItemsBox.innerHTML = '';
                let cartSpanCounter = 0;

                if (cartItems.length > 0) {
                    cartItems.forEach((item) => {
                        const cartItem = document.createElement('div');
                        cartItem.classList.add('product');
                        cartItem.innerHTML = `
              <button class="btn__del" type="button">удалить</button>
              <div class="product__content">
                <img class="product__img" src="${item.url}" alt="${item.name}">
                <div class="product__desc">
                  <h2 class="product__name">${item.name}</h2>
                  <p class="product__price_label">Price: <span class="product__price">${item.price}</span></p>
                  <p class="product__color">Color: ${item.color}</p>
                  <p class="product__size">Size: ${item.size}</p>
                  <div class="product__qty">
                    <label class="input__label">Quantity:</label>
                    <input class="input__quantity" type="text" value="${item.quantity}">
                  </div>
                </div>
              </div>
          `;

                        cartItemsBox.appendChild(cartItem);
                        cartSpanCounter += item.quantity;
                    });
                    cartSpan.style.display = "flex";
                    cartSpan.textContent = cartSpanCounter;
                } else {
                    cartItemsSection.style.display = 'none';
                    cartSpan.style.display = "none";
                }
                const deleteButtons = document.querySelectorAll('.btn__del');
                deleteButtons.forEach(button => {
                    button.addEventListener('click', (productId) => {
                        const product = button.closest('.product');
                        product.remove();
                        cartItems.splice(productId, 1);
                        updateCartItemsSection();
                    });
                });
            }

            addBtns.forEach((button) => {
                button.addEventListener('click', () => {
                    cartItemsSection.style.display = 'block';
                    const productId = button.dataset.productId;
                    const product = data.find((item) => item.id === productId);

                    if (product) {
                        addToCart(product, productId);
                        updateCartItemsSection();
                    }

                });
            });
        } catch (error) {
            console.error(error);
        }
    }).apply();
});
