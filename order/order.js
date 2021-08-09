'use strict';

/* 
order.js
*/

import { foodItems } from '../resources/foodItems.js';

// Create and populate the menu
window.addEventListener('load', () => {
  const orderForm = document.getElementById('orderForm');
  //const finish creating form order headings 

  for (var i = 0; i < foodItems.length; i++) {
    let row = document.createElement('div');
    row.classList.add('row');

    // Create HTML for the image
    let imgContainer = document.createElement('div');
    imgContainer.classList.add('imgContainer');
    let imgDiv = document.createElement('div');
    imgDiv.classList.add('foodImg');
    let imgUrl = '../resources/' + foodItems[i].img;
    imgDiv.style.backgroundImage = 'url(' + imgUrl + ')';
    imgContainer.append(imgDiv)
    row.appendChild(imgContainer);

    // Create HTML for the item name
    let itemName = document.createElement('div');
    itemName.classList.add('item-name');
    itemName.textContent = foodItems[i].name;
    row.appendChild(itemName);

    // Create HTML for the price
    let price = document.createElement('div');
    price.classList.add('price');
    price.textContent = '$' + foodItems[i].price;
    row.appendChild(price);

    // Create HTML for quantity
    let qtyContainer = document.createElement('div');
    qtyContainer.classList.add('qty-container');
    let selectQty = document.createElement('select');
    selectQty.classList.add('qtyNum');
    selectQty.onchange = populateOrder; //create a live preview of the order
    for (let k = 0; k < 7; k++) {
      let qtyOption = document.createElement('option');
      qtyOption.innerText = k;
      qtyOption.value = k;
      selectQty.appendChild(qtyOption);
    }
    qtyContainer.appendChild(selectQty);
    row.appendChild(qtyContainer);

    // Insrt row into form
    orderForm.appendChild(row);
  }

  // Create a button to place the order
  const button = document.createElement('button');
  button.innerText = 'Place Your Order';
  button.classList.add('placeOrderBtn');
  button.onclick = calculate;
  orderForm.appendChild(button);

});

// Calculate the order according to the number of items sold
const calculate = function () {

  // Initialize variables needed for calculation
  const selectElements = document.querySelectorAll('.qtyNum');
  let subtotal = 0;
  let taxRate = 0.0825;
  let message = '';

  // Loop over each menu item
  for (let j = 0; j < selectElements.length; j++) {    

    // Get quantity, price, and item name from the filled out form
    let orderedQty = parseInt(selectElements[j].value);
    let priceStr = selectElements[j].parentNode.previousSibling.innerText;
    let itemPrice = parseFloat(priceStr.slice(1));
    let orderedItemName = selectElements[j].parentNode.previousSibling.previousSibling.innerText;
    
    // Calculate line price based on number of items sold
    // and add to the subtotal
    if (orderedQty !== 0) {
      let linePrice = orderedQty * itemPrice;
      subtotal += linePrice;
      message +=
        orderedQty + 'x ' + orderedItemName + ' = $' + linePrice.toFixed(2) + '\n';
    }
  }
  
  // Calculate tax and final amount to be charged
  const taxAmount = subtotal * taxRate;
  const finalBalance = subtotal + taxAmount;
  message +=
  'Subtotal: $' + subtotal.toFixed(2) + '\n' +
    'Total Tax: $' + taxAmount.toFixed(2) + '\n' +
    'Total Balance Due: $' + finalBalance.toFixed(2);
    
  alert(message);
  
}

// Function to create a live preview of the order
let order = []; // will store info about items added to the order
const populateOrder = (e) => {

  // Get the necessary variables
  let qty = parseInt(e.target.value);
  let name = e.target.parentNode.previousSibling.previousSibling.innerText;
  let price = parseFloat(
    e.target.parentNode.previousSibling.innerText.slice(1)
  );

  // Check if item has already been added to the order
  let isPresent = false;
  if (!isPresent) {
    for (let i = 0; i < order.length; i++) {
      if (order[i].indexOf(name) !== -1) {
        // if item is in the array
        isPresent = true;
      }
    }
  }

  if (!isPresent) {
    // if item hasn't been added, add it
    order.push([qty, name, price]);
  } else {
    // if item has been added to the order
    for (let j = 0; j < order.length; j++) {
      if (order[j][1] === name) {
        if (qty === 0) {
          // delete the item if qty is zero
          order.splice(j, 1);
        } else {
          // update quantity if qty is other than zero
          order[j][0] = qty;
        }
      }
    }
  }

  // Display currently ordered items
  updateOrder(order);
}

// Display array created in populateOrder()
const updateOrder = (arr) => {
  const yourOrder = document.getElementById('yourOrder');
  if (arr.length === 0) {
    // If there are no items in the array
    yourOrder.innerHTML = '<span class="yourOrderIntro">Your order is empty.</span>';
  } else {
    yourOrder.innerHTML = ''; // reset the HTML
    let subtotal = 0;

    // Create Heading HTML
    let yourOrderHeading = document.createElement('div');
    yourOrderHeading.classList.add('yourHeading');
    let itemHead = document.createElement('div');
    itemHead.classList.add('itemCol');
    itemHead.innerText = 'Item';
    let qtyHead = document.createElement('div');
    qtyHead.classList.add('qtyCol');
    qtyHead.innerText = 'Qty';
    yourOrderHeading.appendChild(itemHead);
    yourOrderHeading.appendChild(qtyHead);
    yourOrder.appendChild(yourOrderHeading);

    // loop over array of ordered items and display each item
    for (let i = 0; i < arr.length; i++) {
      let qty = arr[i][0];
      let name = arr[i][1];
      let unitPrice = arr[i][2];
      let itemTotal = unitPrice * qty;
      // console.log('qty: ', qty, 'name: ', name, 'unitPrice: ', unitPrice, 'subtotal: ', subtotal);
      subtotal += itemTotal;

      let row = document.createElement('div');
      row.classList.add('yourRow');
      let itemName = document.createElement('div');
      itemName.classList.add('itemCol');
      let itemQty = document.createElement('div');
      itemQty.classList.add('qtyCol');
      itemName.innerText = name;
      itemQty.innerText = qty;
      row.appendChild(itemName);
      row.appendChild(itemQty);
      yourOrder.appendChild(row);
    }

    // Create subtotal footer to preview abutotal amount due
    let subtotalRow = document.createElement('div');
    subtotalRow.classList.add('subtotalRow');
    let subtotalTitle = document.createElement('div');
    subtotalTitle.classList.add('itemCol');
    subtotalTitle.innerText = 'Subtotal';
    let subtotalAmount = document.createElement('div');
    subtotalAmount.classList.add('qtyCol');
    subtotalAmount.innerText = '$' + subtotal.toFixed(2);
    subtotalRow.appendChild(subtotalTitle);
    subtotalRow.appendChild(subtotalAmount);
    yourOrder.appendChild(subtotalRow);

  }
}
