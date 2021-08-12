'use strict';

/* 
Filename:   menu.js
Author:     Maciej Krawczyk
Course:     ITSE 1311
Semester:   Spring 2021
*/

// Menu Items, prices, images
const foodItem = ['Lemon Fish with Sundried Tomatoes', ' Spicy Chicken and Steamed Vegetables', 'Italian Meatballs', 'Pasta Italiana in Sauce', 'Oven Baked Pizza'];
const foodPrice = [12.95, 9.95, 10.95, 8.85, 11.95];
const foodImg = ['itemFish.jpg', 'itemChickenVeg.jpg', 'itemMeatballs.jpg', 'itemPastaSauce.jpg', 'itemPizza.jpg'];
const foodDesc = [
  'Wild-caught tilapia pan-fried in olive oil, garlic, and other deliciousness. Served with lemon and sun-dried tomatoes.',
  'Juicy chicken breast pan-fried in olive oil, garlic, and other deliciousness. Served with a healthy helping of steamed vegetables.',
  'Pan-fried meatballs made with grass-fed beef, garlic, and other deliciousness. Served on a bed of healthy greens.',
  'Home-made pasta in refreshing tomato sauce. Served with a side of cold-pressed olive oil, garlic bread.',
  'Authentic pizza from Naples, Italy. Expect an airy dough, crispy on the outside, soft on the inside. A perfect vessel for the tasty toppings you choose.',
];


window.addEventListener('load', () => {
  const menuTable = document.getElementById('menuTable');

  for (var i = 0; i < foodItem.length; i++) {
    let row = document.createElement('tr');

    let imageCell = document.createElement('td');
    let image = new Image;
    image.src = '../resources/' + foodImg[i];
    imageCell.appendChild(image);
    row.appendChild(imageCell);

    let itemName = document.createElement('td');
    itemName.textContent = foodItem[i];
    let itemDesc = document.createElement('p');
    itemDesc.textContent = foodDesc[i];
    itemDesc.classList.add('itemDesc');
    itemName.appendChild(itemDesc);
    row.appendChild(itemName);
    
    let price = document.createElement('td');
    price.textContent = '$' + foodPrice[i].toLocaleString();
    price.classList.add('price');
    row.appendChild(price);

    menuTable.appendChild(row);
  }
});


