'use strict';

/* 
Filename:   locations.js
*/

import { LOC_TOKEN } from '../dotenv.js';

const locToken = LOC_TOKEN;
const yourLocation = document.querySelector('#yourLocation');
const searchResults = document.querySelector('.searchResults');
const findLocationSection = document.getElementById('find-location-section');
const resultsSection = document.querySelector('.results');
const searchCurrentLocationBtn = document.querySelector('#findCurrentLocation');
const searchInputLocationBtn = document.getElementById('locationSearchBtn');
const locationSearchInput = document.getElementById('locationSearchInput');

const displayLocationName = (data) => {
  const a = data.address;
  const address = `Showing results ${
    a.house_number == undefined ? '' : 'near ' + a.house_number
  } ${a.road == undefined ? '' : a.road}${
    a.city == undefined ? '' : ' in ' + a.city
  }, ${a.state == undefined ? '' : a.state}`;
  yourLocation.innerText = address;
};

const searchName = async () => {
  const searchString = locationSearchInput.value;
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=${locToken}&q=${searchString}&limit=1&addressdetails=1&format=json`
    );
    const data = await response.json();
    displayLocationName(data[0]);
    const obj = {
      coords: {
        latitude: `${data[0].lat}`,
        longitude: `${data[0].lon}`,
      },
    };
    getRestaurants(obj);
  } catch (error) {
    console.error(error.message);
    yourLocation.innerText = `Something went wrong...`;
  }
};

searchInputLocationBtn.addEventListener('click', searchName);
locationSearchInput.addEventListener('keyup', (e) => {
  if (e.code == 'Enter') {
    searchName();
  }
});

const getLocationName = async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse.php?key=${locToken}&lat=${lat}&lon=${lon}&format=json`
    );
    const data = await response.json();
    displayLocationName(data);
  } catch (error) {
    console.error(error);
  }
};

const error = (err) => {
  console.log(err.message);
};

searchCurrentLocationBtn.addEventListener('click', () => {
  navigator.geolocation.getCurrentPosition(getRestaurants, error);
});

const getRestaurants = async (pos) => {
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  getLocationName(pos);
  try {
    const response = await fetch(
      `https://us1.locationiq.com/v1/nearby.php?key=${locToken}&lat=${lat}&lon=${lon}&tag=restaurant&radius=50000&format=json`
    );
    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error(error.message);
  }
};

function displayResults(arr) {
  const htmlArr = arr.map((item) => {
    const a = item.address;
    const div = document.createElement('div');
    div.classList.add('result-item');
    if (item.name === 'Empty') {
      return null;
    } else {
      div.innerHTML = `<h3 class="result-title">${item.name}</h3>
      <p class="result-distance">Approximately ${
        Math.round((item.distance / 1609) * 10) / 10
      } miles away</p>
      <p class="result-address">${
        a.house_number == undefined ? '' : a.house_number
      } ${a.road == undefined ? '' : a.road}, ${
        a.city == undefined ? '' : a.city
      }</p>
      <a class="result-link" href="https://www.google.com/maps/?q=${item.lat} ${
        item.lon
      }">Find directions on Google Maps</a>`;
      return div;
    }
  });

  findLocationSection.style.height = '25rem';
  resultsSection.classList.remove('hidden');
  searchResults.innerHTML = '';
  for (let i = 0; i < htmlArr.length; i++) {
    if (htmlArr[i] == null) {
    } else {
      searchResults.append(htmlArr[i]);
    }
  }
}
