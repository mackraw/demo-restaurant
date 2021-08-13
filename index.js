'use strict';

import { foodItems } from './resources/foodItems.js';

/* 
index.js
*/

// BANNER

// const bannerDiv = document.getElementById('banner');
// const bannerImgs = ['meals2.jpg', 'cheese.jpg', 'bread.jpg', 'coffee.jpg', 'pastahand.jpg'];

// let i = 0;

// const changeBannerImages = () => {
//   if ( i> (bannerImgs.length - 1) ) { i = 0 }
//   bannerDiv.style.backgroundImage = 'url(images/' + bannerImgs[i] + ')';
//   i++;
// }

// const bannerInterval = setInterval("changeBannerImages()", 3000);

window.addEventListener('load', () => {
  const cardsContainer = document.getElementById('cards-container');

  for (var i = 0; i < 3; i++) {
    let card = document.createElement('div');
    card.classList.add('card');

    let imgDiv = document.createElement('div');
    imgDiv.classList.add('foodImg');
    let imgUrl = '../resources/' + foodItems[i].img;
    imgDiv.style.backgroundImage = 'url(' + imgUrl + ')';
    card.appendChild(imgDiv);

    let foodItemContainer = document.createElement('div');
    foodItemContainer.classList.add('food-item-container');

    let foodItemName = document.createElement('h3');
    foodItemName.classList.add('food-item-name');
    foodItemName.textContent = foodItems[i].name;
    foodItemContainer.appendChild(foodItemName);

    let foodItemDesc = document.createElement('p');
    foodItemDesc.classList.add('food-item-desc');
    foodItemDesc.textContent = foodItems[i].desc;
    foodItemContainer.appendChild(foodItemDesc);

    let foodItemPrice = document.createElement('p');
    foodItemPrice.classList.add('food-item-price');
    foodItemPrice.textContent = '$' + foodItems[i].price;
    foodItemContainer.appendChild(foodItemPrice);

    card.appendChild(foodItemContainer);

    let btn = document.createElement('a');
    btn.classList.add('food-item-btn');
    btn.href = '../order/';
    btn.innerText = 'Start Order';
    card.appendChild(btn);

    cardsContainer.appendChild(card);
  }
});



