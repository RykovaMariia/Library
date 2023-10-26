//Registration

const form = document.querySelector(".register-form");
const submit = document.querySelector(".register_submit");
const inputs = document.querySelectorAll(".input-field");

class newUser {
  constructor(firstName, lastName, email, password, card) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.card = card;
  }
}

function generateCardNumber() {
  const min = parseInt("100000000", 16);
  const max = parseInt("fffffffff", 16);
  const numberCard = Math.floor(min + Math.random() * (max + 1 - min))
    .toString(16)
    .toLocaleUpperCase();

  // for(let el of Object.keys){
  //   if(el === numberCard){
  //     numberCard = generateCardNumber();
  //   }
  // }

  return numberCard;
}

function registering() {
  const numberCard = generateCardNumber();

  const user = new newUser(
    form.firstName.value,
    form.lastName.value,
    form.email.value,
    form.password.value,
    numberCard
  );

  localStorage.setItem(numberCard, JSON.stringify(user));

  return numberCard;
}

function changeIcon(userFirstName, userLastName) {
  const icon = document.querySelector(".header__icon");
  const twoLetter =
    userFirstName.toUpperCase().slice(0, 1) +
    userLastName.toUpperCase().slice(0, 1);

  icon.classList.add("header__icon_user");
  icon.querySelector(".header__icon__userName").innerText = twoLetter;
  icon.setAttribute('title', 'value');
  icon.querySelector('div').setAttribute('title', userFirstName + ' ' + userLastName);
}

function changeMenu(userId) {
  const profileMenu = document.querySelector(".profile_auth");

  profileMenu.querySelector(".profile__name").innerText = userId;
}

function addMyProfile(userId, userFirstName, userLastName) {
  document.querySelector(".my-profile__card-number").innerText = userId;
  document.querySelector(".my-profile__userTag").innerText =
    userFirstName.toUpperCase().slice(0, 1) +
    userLastName.toUpperCase().slice(0, 1);
  document.querySelector(".my-profile__left__userName").innerText = userFirstName + " " + userLastName;
}

form.addEventListener("submit", () => {
  localStorage.setItem("loginStatus", registering());
});

if (localStorage.getItem("loginStatus")) {
  const userId = localStorage.getItem("loginStatus");
  const userFirstName = JSON.parse(localStorage.getItem(userId)).firstName;
  const userLastName = JSON.parse(localStorage.getItem(userId)).lastName;

  changeIcon(userFirstName, userLastName);
  changeMenu(userId);
  addMyProfile(userId, userFirstName, userLastName);
}
