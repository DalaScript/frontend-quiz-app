const toggleButton = document.getElementById("darkmode-switch__btn");
let isToggleOn = false;

toggleButton.addEventListener("click", function() {
  isToggleOn = !isToggleOn;
  this.classList.toggle("is-on");
});