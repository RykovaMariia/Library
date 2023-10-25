const buttonBurger = document.querySelector(".header__burger");
const burger = document.querySelector(".navigation");
const x = document.querySelector(".header");
const nav = document.querySelectorAll(".navigation-menu li a");

buttonBurger.addEventListener("click", (e) => {
  burger.classList.toggle("navigation_open");
  x.classList.toggle("open");

  e._isClickWithInMenu = true;
});

nav.forEach((el) => {
  el.addEventListener("click", () => {
    x.classList.remove("open");
    burger.classList.remove("navigation_open");
  });
});

burger.addEventListener("click", (e) => {
  e._isClickWithInMenu = true;
});

document.body.addEventListener("click", (e) => {
  if (!e._isClickWithInMenu) {
    x.classList.remove("open");
    burger.classList.remove("navigation_open");
  }
});
