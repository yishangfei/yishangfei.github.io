document.addEventListener("DOMContentLoaded", function() {
    // 从本地存储中获取 cartMap 数据
    let cartMap = JSON.parse(localStorage.getItem('cartMap')) || {};
    // 设置为 cartMap 的长度
    document.querySelector('.minicart-number-items').textContent = cartMap.size;
    // 定义一个函数，根据 cartMap 动态生成购物车列表
    async function renderCartItems() {
        const cartList = document.querySelector('#cart-body-1');

        // 获取 products.json 数据
        let response = await fetch('products.json');
        let products = await response.json();

        // 清空现有的购物车列表
        cartList.innerHTML = '';
        // 遍历 cartMap，生成 <li>
        let total = 0; // 定义一个变量来保存总金额
        for (let productId in cartMap) {
            const product = products[productId - 1];
            const subtotal = cartMap[productId] * product.price;; // 计算小计
            total += subtotal; // 将当前小计累加到总金额
            // 打印 name, price, images, quantity
            // console.log('Product Name:', product.name);
            // console.log('Product Price:', product.price);
            // console.log('Product Images:', product.images);
            // console.log('Product Quantity:', details);

            // 创建 <tr> 行的 HTML
            const row = document.createElement('tr');
            row.classList.add('rustrot-cart-form__cart-item', 'cart_item');

            row.innerHTML = `
                <td class="product-remove">
                    <a href="#" class="remove" aria-label="Remove this item" data-product_id="${productId}">×</a>
                </td>
                <td class="product-thumbnail">
                    <a href="single-product.html">
                        <img src="${product.images[0]}" class="attachment-rustrot_thumbnail size-rustrot_thumbnail" alt="${product.name}" width="600" height="778">
                    </a>
                </td>
                <td class="product-name" data-title="Product">
                    <a href="single-product.html?product_id=${productId}">${product.name}</a>
                </td>
                <td class="product-price" data-title="Price">
                    <span class="rustrot-Price-amount amount">
                        <span class="rustrot-Price-currencySymbol">$</span>${product.price}
                    </span>
                </td>
                <td class="product-quantity" data-title="Quantity">
                    <div class="quantity">
                        <span class="qty-label">Quantity:</span>
                        <div class="control">
                            <a class="btn-number qtyminus quantity-minus" href="#" data-product_id="${productId}">-</a>
                            <input type="text" data-step="1" name="quantity" value=${cartMap[productId]} title="Qty" class="input-qty input-text qty text" size="4" pattern="[0-9]*">
                            <a class="btn-number qtyplus quantity-plus" href="#" data-product_id="${productId}">+</a>
                        </div>
                    </div>
                </td>
                <td class="product-subtotal" data-title="Total">
                    <span class="rustrot-Price-amount amount">
                        <span class="rustrot-Price-currencySymbol">$</span>${subtotal}
                    </span>
                </td>
            `;
            // 将生成的行添加到 cartBody
            cartList.appendChild(row);
        }

        // 保留更新购物车的按钮和隐藏字段（这部分始终存在）
        const updateRow = document.createElement('tr');
        updateRow.innerHTML = `
               <td colspan="6" class="actions">
                   <button type="submit" class="button" name="update_cart" value="Update cart" disabled="">Update cart</button>
                   <input type="hidden" id="rustrot-cart-nonce" name="rustrot-cart-nonce" value="f41b5bf554">
                   <input type="hidden" name="_wp_http_referer" value="/rustrot/cart/">
               </td>
           `;
        // 将更新行添加到 cartBody
        cartList.appendChild(updateRow);

        document.querySelector('.order-total .rustrot-Price-amount').innerHTML = `<span class="rustrot-Price-currencySymbol">$</span>${total}`;

        // 删除商品事件监听
        document.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product_id');
                delete cartMap[productId];
                localStorage.setItem('cartMap', JSON.stringify(cartMap));
                loadCommonJs();
                renderCartItems(); // 重新渲染购物车
            });
        });

        // 数量加减事件监听
        document.querySelectorAll('.quantity-minus').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product_id');
                if (cartMap[productId] > 1) {
                    cartMap[productId]--;
                } else {
                    cartMap[productId] = 1;
                }
                localStorage.setItem('cartMap', JSON.stringify(cartMap));
                renderCartItems(); // 重新渲染购物车
                loadCommonJs();
            });
        });

        document.querySelectorAll('.quantity-plus').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const productId = this.getAttribute('data-product_id');
                cartMap[productId]++;
                localStorage.setItem('cartMap', JSON.stringify(cartMap));
                loadCommonJs();
                renderCartItems(); // 重新渲染购物车
            });
        });

    }
    // 调用渲染函数
    renderCartItems();

    function loadCommonJs() {
        let script = document.createElement('script');
        script.src = 'assets/js/common.js';
        script.onload = () => {
            console.log("common.js 已加载并执行");
        };
        document.head.appendChild(script);
    }
})