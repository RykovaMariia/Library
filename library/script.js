// burger
const buttonBurger = document.querySelector(".header__burger");
const burger = document.querySelector(".header-nav");
const x = document.querySelector(".header");
const nav = document.querySelectorAll(".header-nav-menu li");

buttonBurger.addEventListener("click", (e) => {
  burger.classList.toggle("header-nav_open");
  x.classList.toggle("open");

  e._isClickWithInMenu = true;
});

nav.forEach((el) => {
  el.addEventListener("click", () => {
    x.classList.remove("open");
    burger.classList.remove("header-nav_open");
  });
});

burger.addEventListener("click", (e) => {
  e._isClickWithInMenu = true;
});

document.body.addEventListener("click", (e) => {
  if (!e._isClickWithInMenu) {
    x.classList.remove("open");
    burger.classList.remove("header-nav_open");
  }
});

// slider
const slider = document.querySelector(".about__slider");
const points = document.querySelectorAll(".about__pointer");
const images = document.querySelectorAll(".about__image");
const carets = document.querySelectorAll(".about__carret");

const classPoints = [, "point_1", "point_2", "point_3", "point_4"];

function moveSlider(index) {
  slider.classList.remove(...classPoints);
  if (index > 0) slider.classList.add(classPoints[index]);

  points.forEach((el) =>
    el.firstElementChild.classList.remove("about__point_checked")
  );
  points[index].firstElementChild.classList.add("about__point_checked");

  points.forEach((el) => (el.disabled = false));
  points[index].disabled = true;

  carets.forEach((el) => (el.disabled = false));
  if (index === 0) {
    carets[0].disabled = true;
  }
  if (index === points.length - 1) {
    carets[1].disabled = true;
  }
}

points.forEach((point, index) => {
  point.addEventListener("click", () => moveSlider(index));
});

carets.forEach((el, ind) => {
  el.addEventListener("click", () => {
    let index = 0;
    points.forEach((p, i) => {
      if (p.firstElementChild.classList.contains("about__point_checked"))
        index = i;
    });

    if (ind === 0) moveSlider(index - 1);
    else moveSlider(index + 1);
  });
});

// seasons

const seasons = document.querySelectorAll(".favorites__seasons__label");
const books = document.querySelectorAll(".books");

seasons.forEach((s, i) => {
  s.addEventListener("click", () => {
    books.forEach((b) => {
      b.classList.add("books_disabled");
    });
    books[i].classList.remove("books_disabled");
  });
});

//profile menu

const profileIcon = document.querySelector(".header__icon");
const profileMenu = document.querySelector(".noAuthProfile");

profileIcon.addEventListener("click", (e) => {
  profileMenu.classList.toggle("noAuthProfile_open");
  e._isClickWithIn = true;
});

profileMenu.addEventListener("click", (e) => (e._isClickWithIn = true));

document.body.addEventListener("click", (e) => {
  if (!e._isClickWithIn) {
    profileMenu.classList.remove("noAuthProfile_open");
  }
});

//log in

const logIn = document.querySelectorAll(".move-to-login");
const register = document.querySelectorAll(".move-to-register");
const windowPopUp = document.querySelectorAll('.pop-up__window')
const popUpLogin = document.querySelector(".pop-up_login");
const popUpRegister = document.querySelector(".pop-up_register")

const popUpClose = document.querySelectorAll('.pop-up__close')

function openPopUpLogIn() {
  popUpLogin.classList.add("pop-up_opened");
  document.body.classList.add('lock')
  profileMenu.classList.remove("noAuthProfile_open");
  popUpRegister.classList.remove("pop-up_opened");
}

function openPopUpRegister() {
  popUpRegister.classList.add("pop-up_opened");
  document.body.classList.add('lock')
  profileMenu.classList.remove("noAuthProfile_open");
  popUpLogin.classList.remove("pop-up_opened");
}

function closePopUp() {
  popUpRegister.classList.remove("pop-up_opened");
  popUpLogin.classList.remove("pop-up_opened");
  document.body.classList.remove('lock')
}


logIn.forEach(el => el.addEventListener("click", openPopUpLogIn));
register.forEach(el => el.addEventListener("click", openPopUpRegister));
popUpClose.forEach(el => el.addEventListener('click', closePopUp))

document.addEventListener( 'click', (e) => {
	if (e.target.classList.contains('pop-up')) {
		closePopUp();
	}
})