document.addEventListener("DOMContentLoaded", function() {
    // 获取 URL 中的 `product_id` 查询参数
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('product_id'));
    const quantity = parseInt(urlParams.get('quantity'));

    // 获取产品数据（假设从本地 JSON 文件加载）
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // 查找匹配的产品
            const product = products.find(p => p.id === productId);
            console.log(product.id); // 输出 product 对象中的 id
            if (product) {
                // 获取 gallery 和 thumbnail 容器
                const galleryWrapper = document.getElementById('product-gallery-wrapper');
                const thumbnailNav = document.getElementById('thumbnail-nav');

                // 动态生成产品图片和缩略图
                if (Array.isArray(product.images) && Array.isArray(product.thumbnail_images)) {
                    // 插入大图
                    product.images.forEach(image => {
                        const imageElement = document.createElement('div');
                        imageElement.classList.add('rustrot-product-gallery__image');
                        imageElement.innerHTML = `<img src="${image}" alt="product image">`;
                        galleryWrapper.appendChild(imageElement);
                    });

                    // 插入缩略图
                    product.thumbnail_images.forEach(thumbnail => {
                        const liElement = document.createElement('li');
                        const imgElement = document.createElement('img');
                        imgElement.src = thumbnail;
                        imgElement.alt = 'img';

                        liElement.appendChild(imgElement);
                        thumbnailNav.appendChild(liElement);
                    });
                }

                // 动态生成 Categories
                populateLinks('.posted_in', 'Categories', product.categories);
                // 动态生成 Tags
                populateLinks('.tagged_as', 'Tags', product.tags);

                // 这里你可以继续填充其他部分，如产品标题、价格等
                document.querySelector('.page-title').textContent = product.name;
                document.getElementById('price').innerHTML = `<span class="rustrot-Price-currencySymbol">$</span>${product.price}`;
                document.querySelector('.stock.in-stock span').textContent = product.availability;
                document.querySelector('.sku').textContent = product.sku;
                document.querySelector('input[name="product_id"]').value = product.id;
                document.querySelector('.single_add_to_cart_button').addEventListener('click', function(event) {
                    event.preventDefault(); // 阻止按钮的默认行为（例如表单提交）
                    // 获取 product_id 和 quantity 值
                    let quantityValue = document.querySelector('input[name="quantity"]').value;
                    if (quantityValue > 0) {
                        // 如果数量大于 0，执行相应的操作
                        let productId = product.id;
                        // 从 LocalStorage 中获取当前的 Map（如果有）
                        let cartMap = JSON.parse(localStorage.getItem('cartMap')) || {};
                        console.log(cartMap);
                        // 更新 Map 数据
                        cartMap[productId] = quantityValue;
                        // 保存回 LocalStorage
                        localStorage.setItem('cartMap', JSON.stringify(cartMap));
                        // 跳转到购物车页面
                        window.location.href = "cart.html"; // 跳转到 cart.html 页面
                    } else {
                        // 如果数量小于或等于 0，执行其他操作
                        alert(`The quantity must be greater than 0`);
                    }
                });
                // 获取描述部分的容器
                const descriptionContainer = document.querySelector('.rustrot-product-details__short-description');
                descriptionContainer.querySelector('p').textContent = product.description;
                // 获取 <ul> 元素
                const featureList = descriptionContainer.querySelector('ul');
                // 清空现有的 <ul> 内容
                featureList.innerHTML = '';
                // 遍历特征列表，生成 <li> 元素并添加到 <ul> 中
                product.details.forEach(detail => {
                    const liElement = document.createElement('li');
                    liElement.textContent = detail;
                    featureList.appendChild(liElement);
                });


                // 加载另一个 JS 文件
                const script = document.createElement('script');
                script.src = 'assets/js/mobilemenu.js'; // 替换为你的 JS 文件路径
                document.body.appendChild(script);
            } else {
                console.log('Product not found');
            }
        })
        .catch(error => console.error('Error loading products:', error));


    function populateLinks(containerSelector, title, items) {
        const container = document.querySelector(containerSelector);

        // 清空容器内容并添加标题
        container.innerHTML = `${title}: `;

        // 遍历 items 数据生成链接
        items.forEach((item, index) => {
            const linkElement = document.createElement('a');
            linkElement.href = "#"; // 动态生成链接地址
            linkElement.rel = "tag";
            linkElement.textContent = item;

            container.appendChild(linkElement);

            // 添加逗号分隔符（最后一个项不加）
            if (index < items.length - 1) {
                container.appendChild(document.createTextNode(', '));
            }
        });
    }

})