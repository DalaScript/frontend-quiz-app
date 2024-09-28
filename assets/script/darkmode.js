const toggleButton = document.getElementById("darkmode-switch__btn");

const bodyEl = document.querySelector('body');
// const patternBgLight = document.querySelector('.pattern-bg--light');
const patternBgLight = document.getElementById('pattern-bg__light');
const patternBgDark = document.getElementById('pattern-bg__dark');

const darkIcons = document.querySelectorAll('.darkmode-switch__icon--dark');
const lightIcons = document.querySelectorAll('.darkmode-switch__icon--light');

toggleButton.addEventListener("input", function() {
  bodyEl.classList.toggle('darkmode');

  patternBgLight.classList.toggle('pattern-bg--active');
  patternBgDark.classList.toggle('pattern-bg--active');

  darkIcons.forEach((icon) => {
    icon.classList.toggle('darkmode-switch__icon--active');
  });

  lightIcons.forEach((icon) => {
    icon.classList.toggle('darkmode-switch__icon--active');
  });
});