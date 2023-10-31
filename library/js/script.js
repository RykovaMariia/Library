//Registration

const formRegister = document.querySelector(".register-form");
const formLogin = document.querySelector(".login-form");
const formLibraryCards = document.querySelector(".library-cards__form");
const formCard = document.querySelector(".library-cards__form");

const inputEmail = formRegister.querySelector(".input-email");

class newUser {
  constructor(
    firstName,
    lastName,
    email,
    password,
    card,
    visits,
    books,
    ownBooks,
    libraryCard
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.card = card;
    this.visits = visits;
    this.books = books;
    this.ownBooks = ownBooks;
    this.libraryCard = libraryCard;
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
        JSON.parse(localStorage.getItem(el)).email ===
        formRegister.email.value.toLowerCase()
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
      formRegister.firstName.value.toLowerCase(),
      formRegister.lastName.value.toLowerCase(),
      formRegister.email.value.toLowerCase(),
      formRegister.password.value,
      numberCard,
      1,
      [],
      [],
      []
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

formRegister.addEventListener("submit", registering);

//Login

function searchUser(e) {
  e.preventDefault();

  let userName = "";

  for (let el of Object.keys(localStorage)) {
    if (el.includes("user")) {
      if (
        JSON.parse(localStorage.getItem(el)).card.toLowerCase() ===
          formLogin.login.value.toLowerCase() ||
        JSON.parse(localStorage.getItem(el)).email ===
          formLogin.login.value.toLowerCase()
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
      let user = JSON.parse(localStorage.getItem(userName));
      user.visits += 1;
      localStorage.setItem(userName, JSON.stringify(user));

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

function searchCard(e) {
  e.preventDefault();

  function remove() {
    buttonSbm.classList.remove("library-cards__submit-button_none");
    status.classList.remove("my-profile__status__card_visible");
    formLibraryCards.name.value = "";
    formLibraryCards.cardNumber.value = "";
  }

  let userName = "";
  const buttonSbm = document.querySelector(".library-cards__submit-button");
  const status = document.querySelector(".my-profile__status__card");

  for (let el of Object.keys(localStorage)) {
    if (el.includes("user")) {
      if (
        JSON.parse(localStorage.getItem(el)).firstName +
          " " +
          JSON.parse(localStorage.getItem(el)).lastName ===
        formLibraryCards.name.value.toLowerCase()
      ) {
        userName = el;
        break;
      }
    }
  }

  if (userName) {
    if (
      JSON.parse(localStorage.getItem(userName)).card.toLowerCase() ===
      formLibraryCards.cardNumber.value.toLowerCase()
    ) {
      buttonSbm.classList.add("library-cards__submit-button_none");
      status.classList.add("my-profile__status__card_visible");
      setTimeout(remove, 10000);
    } else {
      formLogin.password.value = "";
    }
  } else {
    formLogin.login.value = "";
    inputEmail.classList.add("input-cancel");
    console.log(userName);
  }
}

//change before login

function changeIcon(userFirstName, userLastName, userFullName) {
  const icon = document.querySelector(".header__icon");
  const twoLetter =
    userFirstName.toUpperCase().slice(0, 1) +
    userLastName.toUpperCase().slice(0, 1);

  icon.classList.add("header__icon_user");
  icon.querySelector(".header__icon__userName").innerText = twoLetter;
  icon.setAttribute("title", "value");
  icon
    .querySelector("div")
    .setAttribute("title", userFullName);
}

function changeMenu(userId) {
  const profileMenu = document.querySelector(".profile_auth");

  profileMenu.querySelector(".profile__name").innerText = userId;
}

function addMyProfile(userId, userFirstName, userLastName, countVisits, books) {
  const number = document.querySelector(".my-profile__card-number");
  const userTag = document.querySelector(".my-profile__userTag");
  const userName = document.querySelector(".my-profile__left__userName");
  const visits = document.querySelectorAll(".count-visits");
  const countBooks = document.querySelectorAll(".count-books");

  number.innerText = userId;
  userTag.innerText =
    userFirstName.toUpperCase().slice(0, 1) +
    userLastName.toUpperCase().slice(0, 1);
  userName.innerText = userFirstName + " " + userLastName;

  visits.forEach((visit) => (visit.innerText = countVisits));
  countBooks.forEach((count) => (count.innerText = books.length));

  books.forEach((book) => {
    const newLi = document.createElement("li");
    newLi.append(book);
    document.querySelector(".rented-books__list").append(newLi);
  });
}

function changeBuy() {
  const buttons = document.querySelectorAll(".book__buy-button");

  buttons.forEach((button) => {
    button.classList.remove("move-to-login");
    button.classList.add("move-to-buy");
  });
}

function changeBuyWithCard() {
  const buttons = document.querySelectorAll(".book__buy-button");

  buttons.forEach((button) => {
    button.classList.remove("move-to-buy");
    button.classList.remove("move-to-login");
  });
}

function changeOwn(ownBooks) {
  const buyButton = document.querySelectorAll(".book__buy-button");

  ownBooks.forEach((el) => {
    buyButton[el].innerText = "Own";
    buyButton[el].classList.add("book__buy-button_own");
    buyButton[el].disabled = "true";
  });
}

function changeOwnWithCard(userId) {
  const buyButton = document.querySelectorAll(".book__buy-button");

  buyButton.forEach((el, index) =>
    el.addEventListener("click", (e) => {
      let book = e.target;

      let bookName = book.parentElement
        .querySelector(".book__name")
        .innerText.split("\n")
        .join(", ")
        .toLowerCase();

      let user = JSON.parse(localStorage.getItem(userId));
      user.books.push(bookName);
      user.ownBooks.push(index);
      localStorage.setItem(userId, JSON.stringify(user));

      location.reload();
    })
  );
}

function changeDigitalLibraryCard(userFullName, userCard) {
  const libraryLeftHeading = document.querySelector(
    ".library-cards__left__heading"
  );
  const buttonSbm = document.querySelector(".library-cards__submit-button");
  const status = document.querySelector(".my-profile__status__card");

  const right = document.querySelector(".library-cards__right");
  const buttonNone = right.querySelector("div").firstElementChild;
  const buttonChange = right.querySelector("div").lastElementChild;

  libraryLeftHeading.innerText = "Your Library card";
  formCard.name.value = userFullName;
  formCard.name.disabled = true;
  formCard.cardNumber.value = userCard;
  formCard.cardNumber.disabled = true;
  buttonSbm.classList.add("library-cards__submit-button_none");
  status.classList.add("my-profile__status__card_visible");

  right.querySelector("h3").innerText = "Visit your profile";
  right.querySelector("p").innerText =
    "With a digital library card you get free access to the Library’s wide array of digital resources including e-books, databases, educational resources, and more.";
  buttonNone.classList.add("library-cards__button_none");
  buttonChange.innerText = "Profile";
  buttonChange.classList.remove("move-to-login");
  buttonChange.classList.add("move-to-profile");
}

if (localStorage.getItem("loginStatus")) {
  const userId = localStorage.getItem("loginStatus");
  const userCard = JSON.parse(localStorage.getItem(userId)).card;
  const userFirstName = JSON.parse(localStorage.getItem(userId)).firstName;
  const userLastName = JSON.parse(localStorage.getItem(userId)).lastName;
  const userFullName =
    userFirstName[0].toUpperCase() +
    userFirstName.slice(1) +
    " " +
    userLastName[0].toUpperCase() +
    userLastName.slice(1);
  const countVisits = JSON.parse(localStorage.getItem(userId)).visits;
  const books = JSON.parse(localStorage.getItem(userId)).books;
  const ownBooks = JSON.parse(localStorage.getItem(userId)).ownBooks;
  const libraryCard = JSON.parse(localStorage.getItem(userId)).libraryCard;

  changeIcon(userFirstName, userLastName, userFullName);
  changeMenu(userCard);
  addMyProfile(userCard, userFirstName, userLastName, countVisits, books);
  if (libraryCard < 1) {
    changeBuy();
  } else {
    changeBuyWithCard();
    changeOwnWithCard(userId);
  }
  changeOwn(ownBooks);
  changeDigitalLibraryCard(userFullName, userCard);
} else {
  formCard.addEventListener("submit", searchCard);
}
