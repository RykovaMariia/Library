//Registration

const formRegister = document.querySelector(".register-form");
const formLogin = document.querySelector(".login-form");
const inputEmail = formRegister.querySelector(".input-email");

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

  for (let el of Object.keys(localStorage)) {
    if (el.includes("user")) {
      if (JSON.parse(localStorage.getItem(el)).card === numberCard) {
        numberCard = generateCardNumber();
      }
    }
  }

  return numberCard;
}

function isEmailUnique() {
  let isUnique = true;
  for (let el of Object.keys(localStorage)) {
    if (el.includes("user")) {
      if (
        JSON.parse(localStorage.getItem(el)).email &&
        JSON.parse(localStorage.getItem(el)).email === formRegister.email.value
      ) {
        isUnique = false;
        break;
      }
    }
  }
  return isUnique;
}

function registering(e) {
  e.preventDefault();

  if (isEmailUnique()) {
    const numberCard = generateCardNumber();
    const user = new newUser(
      formRegister.firstName.value,
      formRegister.lastName.value,
      formRegister.email.value,
      formRegister.password.value,
      numberCard
    );

    const userName = "user" + Object.keys(localStorage).length;

    localStorage.setItem("loginStatus", userName);
    localStorage.setItem(userName, JSON.stringify(user));

    location.reload();
  } else {
    formRegister.email.value = "";
    inputEmail.classList.add("input-cancel");
  }
}

function changeIcon(userFirstName, userLastName) {
  const icon = document.querySelector(".header__icon");
  const twoLetter =
    userFirstName.toUpperCase().slice(0, 1) +
    userLastName.toUpperCase().slice(0, 1);

  icon.classList.add("header__icon_user");
  icon.querySelector(".header__icon__userName").innerText = twoLetter;
  icon.setAttribute("title", "value");
  icon
    .querySelector("div")
    .setAttribute("title", userFirstName + " " + userLastName);
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
  document.querySelector(".my-profile__left__userName").innerText =
    userFirstName + " " + userLastName;
}

formRegister.addEventListener("submit", registering);

//Login

function searchUser(e) {
  e.preventDefault();

  let userName = "";

  for (let el of Object.keys(localStorage)) {
    if (el.includes("user")) {
      if (
        JSON.parse(localStorage.getItem(el)).card === formLogin.login.value ||
        JSON.parse(localStorage.getItem(el)).email === formLogin.login.value
      ) {
        userName = el;
        console.log(userName);
        break;
      }
    }
  }

  if (userName) {
    if (
      JSON.parse(localStorage.getItem(userName)).password ===
      formLogin.password.value
    ) {
      console.log("hi");
      localStorage.setItem("loginStatus", userName);
      location.reload();
    } else {
      formLogin.password.value = "";
    }
  } else {
    formLogin.login.value = "";
    inputEmail.classList.add("input-cancel");
    console.log(userName);
  }
}

formLogin.addEventListener("submit", searchUser);

if (localStorage.getItem("loginStatus")) {
  const userId = localStorage.getItem("loginStatus");
  const userCard = JSON.parse(localStorage.getItem(userId)).card;
  const userFirstName = JSON.parse(localStorage.getItem(userId)).firstName;
  const userLastName = JSON.parse(localStorage.getItem(userId)).lastName;

  changeIcon(userFirstName, userLastName);
  changeMenu(userCard);
  addMyProfile(userCard, userFirstName, userLastName);
}
