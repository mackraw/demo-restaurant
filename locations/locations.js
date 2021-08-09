'use strict';

/* 
Filename:   locations.js
*/

const locToken = 'pk.0ae9557ee132ce75bcb7fa0418ca38df';
const findLocationBtn = document.querySelector('#findCurrentLocation');
const yourLocation = document.querySelector('#yourLocation');



const getLocationName = async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${locToken}&lat=${lat}&lon=${lon}&format=json`);
      const data = await response.json();
      const a = data.address;
    const address = `Showing our locations near ${a.house_number} ${a.road} in ${a.city}, ${a.state}`;
    yourLocation.innerText = address;

  } catch (error) {
    console.error(error);
  }
}

const error = (err) => {
  console.log(err);
}

window.addEventListener('load', () => {
  navigator.geolocation.getCurrentPosition(getLocationName, error);
  
});

findLocationBtn.addEventListener(
  'click',
  navigator.geolocation.getCurrentPosition(getLocationName, error)
);

// const getLocationName = new Promise((resolve, reject) => {
//   resolve(`Party up`);
//   reject(`Not today Partner!`);
// });


// getLocationName.then(() => {
//   console.log('Got data, yep');
  
// })
// console.log(getLocationName);