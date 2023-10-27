//Registration

const formRegister = document.querySelector(".register-form");

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
    if (el === numberCard) {
      numberCard = generateCardNumber();
    }
  }

  return numberCard;
}

function registering() {
  
    const numberCard = generateCardNumber();

    const user = new newUser(
      formRegister.firstName.value,
      formRegister.lastName.value,
      formRegister.email.value,
      formRegister.password.value,
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

formRegister.addEventListener("submit", () => {
  localStorage.setItem("loginStatus", registering());
});

//Login

const formLogin = document.querySelector(".login-form");

function searchUser() {
  let numberCard = "";

  for (let el of Object.keys(localStorage)) {
    if (el === formLogin.login.value) {
      numberCard = el;
      break;
    }
    if (JSON.parse(localStorage.getItem(el)).email === formLogin.login.value) {
      numberCard = el;
      break;
    }
  }

  if (
    JSON.parse(localStorage.getItem(numberCard)).password ==
    formLogin.password.value
  ) {
    return numberCard;
  } else {
    return "";
  }
}

formLogin.addEventListener("submit", (e) => {
  console.log(e);
  localStorage.setItem("loginStatus", searchUser());
});

if (localStorage.getItem("loginStatus")) {
  const userId = localStorage.getItem("loginStatus");
  const userFirstName = JSON.parse(localStorage.getItem(userId)).firstName;
  const userLastName = JSON.parse(localStorage.getItem(userId)).lastName;

  changeIcon(userFirstName, userLastName);
  changeMenu(userId);
  addMyProfile(userId, userFirstName, userLastName);
}
