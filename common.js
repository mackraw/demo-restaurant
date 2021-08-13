'use strict';

// make nav smaller when scrolling down
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.style.backgroundColor = `hsla(0, 0%, 25%, 0.95)`;
    nav.style.height = `5rem`;
  }
  if (window.scrollY < 100) {
    nav.style.backgroundColor = `hsla(0, 0%, 25%, 0)`;
    nav.style.height = `7rem`;
  }
});

// place current year in the footer copyright notice
const currentYear = document.getElementById('currentYear');
currentYear.textContent = `${new Date().getFullYear()}`;
