//Registration

const formRegister = document.querySelector(".register-form");
const formLogin = document.querySelector(".login-form");
const formLibraryCards = document.querySelector(".library-cards__form");

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
      if ( JSON.parse(localStorage.getItem(el)).card.toLowerCase() ===
      formLibraryCards.cardNumber.value.toLowerCase()
      ) {
        userName = el;
        break;
      }
    }
  }

  if (userName) {
    if (
      JSON.parse(localStorage.getItem(userName)).firstName +
          " " +
          JSON.parse(localStorage.getItem(userName)).lastName ===
        formLibraryCards.name.value.toLowerCase()
    ) {
      const visits = document.querySelectorAll(".count-visits");
      const countBooks = document.querySelectorAll(".count-books");

      const countVisits = JSON.parse(localStorage.getItem(userName)).visits;
      const books = JSON.parse(localStorage.getItem(userName)).books;

      visits.forEach((visit) => (visit.innerText = countVisits));
      countBooks.forEach((count) => (count.innerText = books.length));

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
