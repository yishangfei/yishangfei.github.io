console.log("common.js 被加载了");
renderCartItems();
document.addEventListener("DOMContentLoaded", function() {
    // 定义新的联系方式
    const newContactInfo = {
        band: "Acclafit",
        bandSite: "https://acclafit.com/",
        phone: "(+987) 654 321",
        email: "newemail@example.com",
        address: "123 Elm Street, Springfield, IL, 62704, USA"
    };
    document.title = newContactInfo.band;
    // 修改电话
    const phoneElement = document.querySelector('.rustrot-listitem.style-01.contact .listitem-list li:nth-child(1) a');
    if (phoneElement) {
        phoneElement.textContent = newContactInfo.phone; // 更新显示的电话号码
        phoneElement.setAttribute('href', `tel:${newContactInfo.phone.replace(/\D+/g, '')}`); // 更新链接
    }
    // 修改电子邮件
    const emailElement = document.querySelector('.rustrot-listitem.style-01.contact .listitem-list li:nth-child(2) a');
    if (emailElement) {
        emailElement.textContent = newContactInfo.email; // 更新显示的电子邮件
        emailElement.setAttribute('href', `mailto:${newContactInfo.email}`); // 更新邮件链接
    }

    // 修改地址
    const addressElement = document.querySelector('.rustrot-listitem.style-01.contact .listitem-list li:nth-child(3) a');
    if (addressElement) {
        addressElement.innerHTML = `<span>Address</span> ${newContactInfo.address}`; // 更新地址内容
    }


    // 获取版权信息的 <p> 标签
    document.querySelector('.section-016 .col-md-6 p').innerHTML = `© 2024 by <a href="${newContactInfo.bandSite}">${newContactInfo.band}</a>. All Rights Reserved.`;
})

// 定义一个函数，根据 cartMap 动态生成购物车列表
async function renderCartItems() {
    // 从本地存储中获取 cartMap 数据
    let cartMap = JSON.parse(localStorage.getItem('cartMap')) || {};
    // 设置为 cartMap 的长度
    document.querySelector('.minicart-number-items').textContent = Object.keys(cartMap).length;
    // 获取包含购物车数量的 <span> 标签
    document.querySelector('.shopcart-dropdown .count').innerHTML = Object.keys(cartMap).length;

    const cartList = document.querySelector('.rustrot-mini-cart.cart_list');

    // 获取 products.json 数据
    let response = await fetch('products.json');
    let products = await response.json();

    // 清空现有的购物车列表
    cartList.innerHTML = '';
    // 遍历 cartMap，生成 <li>
    let total = 0; // 定义一个变量来保存总金额
    for (let productId in cartMap) {
        const product = products[productId - 1];
        const subtotal = cartMap[productId] * product.price; // 计算小计
        total += subtotal; // 将当前小计累加到总金额
        // 打印 name, price, images, quantity
        // console.log('Product Price:', product.price);
        // console.log('Product Images:', product.images);
        // console.log('Product Quantity:', details);
        // 创建列表项 HTML
        const listItem = `
            <li class="rustrot-mini-cart-item mini_cart_item">
               <!-- <a href="#" class="remove remove_from_cart_button">×</a> -->
                <a href="single-product.html?product_id=${product.id}">
                    <img src="${product.images[0]}" class="attachment-rustrot_thumbnail size-rustrot_thumbnail" alt="${product.name}" width="600" height="778">${product.name}&nbsp;
                </a>
                <span class="quantity">${cartMap[productId]} × <span class="rustrot-Price-amount amount"><span class="rustrot-Price-currencySymbol">$</span>${product.price}</span>
                </span>
            </li>
        `;

        // 插入到购物车列表中
        cartList.insertAdjacentHTML('beforeend', listItem);
    }

    document.querySelector('.rustrot-mini-cart__total .rustrot-Price-amount').innerHTML = `<span class="rustrot-Price-currencySymbol">$</span>${total}`;
}