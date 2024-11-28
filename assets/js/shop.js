// script.js
document.addEventListener("DOMContentLoaded", () => {
  // 读取 JSON 数据
  fetch('products.json')
    .then(response => response.json())
    .then(products => {
      const container = document.querySelector('.products'); // 获取 ul.products

      products.forEach(product => {
        // 根据 JSON 数据生成 HTML
        const productHTML = `
          <li class="product-item wow fadeInUp product-item rows-space-30 col-bg-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-ts-6 style-01 post-30 product type-product status-publish has-post-thumbnail product_cat-light product_cat-bed product_cat-specials product_tag-light product_tag-table product_tag-sock last instock featured downloadable shipping-taxable purchasable product-type-simple"
              data-wow-duration="1s" data-wow-delay="0ms" data-wow="fadeInUp">
            <div class="product-inner tooltip-left">
              <div class="product-thumb">
                 <a class="thumb-link" href="single-product.html?product_id=${product.id}">
                  <img class="img-responsive" src="${product.images[0]}" alt="${product.name}" width="600" height="778">
                </a>
                <div class="flash">
                  <span class="onnew"><span class="text">New</span></span>
                </div>
                <a href="#" class="button yith-wcqv-button" data-product_id="24">Quick View</a>
                <div class="group-button">
                   <!-- 
                  <div class="yith-wcwl-add-to-wishlist">
                    <div class="yith-wcwl-add-button show">
                      <a href="wishlist.html" class="add_to_wishlist">Add to Wishlist</a>
                    </div>
                  </div>
                  <div class="rustrot product compare-button">
                    <a href="compare.html" class="compare button">Compare</a>
                  </div>
                  -->
                  <a href="#" class="button yith-wcqv-button">Quick View</a>
                  <div class="add-to-cart">
                    <a href="cart.html" class="button product_type_simple add_to_cart_button">Add to cart</a>
                  </div>
                </div>
              </div>
              <div class="product-info equal-elem">
                <h3 class="product-name product_title">
                  <a href="${product.product_url}">${product.name}</a>
                </h3>
                <div class="rating-wapper nostar">
                  <div class="star-rating">
                    <span style="width:${product.rating * 20}%">Rated <strong class="rating">${product.rating}</strong> out of 5</span>
                  </div>
                  <span class="review">(${product.reviews})</span>
                </div>
                <span class="price"><span class="rustrot-Price-amount amount"><span
                    class="rustrot-Price-currencySymbol">$</span>${product.price}</span></span>
                <div class="rustrot-product-details__short-description">
                  <p>${product.description}</p>
                  <ul>
                    ${product.details.map(detail => `<li>${detail}</li>`).join('')}
                  </ul>
                </div>
              </div>
              <div class="group-button">
                <div class="group-button-inner">
                  <div class="yith-wcwl-add-to-wishlist">
                    <div class="yith-wcwl-add-button show">
                      <a href="wishlist.html" class="add_to_wishlist">Add to Wishlist</a>
                    </div>
                  </div>
                  <div class="rustrot product compare-button">
                    <a href="compare.html" class="compare button">Compare</a>
                  </div>
                  <a href="#" class="button yith-wcqv-button">Quick View</a>
                  <div class="add-to-cart">
                    <a href="#" class="button product_type_variable add_to_cart_button">Select options</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        `;
        // 添加到容器中
        container.innerHTML += productHTML;
      });
    })
    .catch(error => console.error('Error loading products:', error));
});
