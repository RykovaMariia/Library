const logIn = document.querySelectorAll(".move-to-login");
const register = document.querySelectorAll(".move-to-register");
const myProfile = document.querySelectorAll(".move-to-profile");
const logOut = document.querySelectorAll(".profile__logout");
const buyButton = document.querySelectorAll(".move-to-buy");
const windowPopUp = document.querySelectorAll(".pop-up__window");
const popUpLogin = document.querySelector(".pop-up_login");
const popUpRegister = document.querySelector(".pop-up_register");
const popUpMyProfile = document.querySelector(".pop-up_my-profile");
const popUpBuy = document.querySelector(".pop-up_buy");

const buttonCopyCard = document.querySelector(".copy__card-number");

const popUpClose = document.querySelectorAll(".pop-up__close");

const formBuy = document.querySelector(".buy-form");

function openPopUpLogIn() {
  popUpLogin.classList.add("pop-up_opened");
  document.body.classList.add("lock");
  profileMenu.classList.remove("profile_open");
  popUpRegister.classList.remove("pop-up_opened");
}

function openPopUpRegister() {
  popUpRegister.classList.add("pop-up_opened");
  document.body.classList.add("lock");
  profileMenu.classList.remove("profile_open");
  popUpLogin.classList.remove("pop-up_opened");
}

function openPopUpMyProfile() {
  popUpMyProfile.classList.add("pop-up_opened");
  document.body.classList.add("lock");
  profileAuthMenu.classList.remove("profile_open");
}

function clickLogOut() {
  localStorage.setItem("loginStatus", "");
  location.reload();
}

function clickBy() {
  popUpBuy.classList.add("pop-up_opened");
  document.body.classList.add("lock");
}

function closePopUp() {
  popUpRegister.classList.remove("pop-up_opened");
  popUpLogin.classList.remove("pop-up_opened");
  popUpMyProfile.classList.remove("pop-up_opened");
  popUpBuy.classList.remove("pop-up_opened");
  document.body.classList.remove("lock");
}

function copyCard() {
  const numberCary = document.querySelector(".my-profile__card-number").innerText;
  navigator.clipboard.writeText(numberCary)
  .then(() => {
    alert('Copied the number');
  })
  .catch(err => {
    console.log('Something went wrong', err);
  })
}

logIn.forEach((el) => el.addEventListener("click", openPopUpLogIn));
register.forEach((el) => el.addEventListener("click", openPopUpRegister));
myProfile.forEach((el) => el.addEventListener("click", openPopUpMyProfile));
logOut.forEach((el) => el.addEventListener("click", clickLogOut));

buttonCopyCard.addEventListener("click", copyCard);

buyButton.forEach((el, index) =>
  el.addEventListener("click", (e) => {
    clickBy();

    let book = e.target;

    let bookName = book.parentElement
      .querySelector(".book__name")
      .innerText.split("\n")
      .join(", ")
      .toLowerCase();

    formBuy.addEventListener("submit", (ev) => {
      ev.preventDefault();

      const userId = localStorage.getItem("loginStatus");
      let user = JSON.parse(localStorage.getItem(userId));
      user.books.push(bookName);
      user.ownBooks.push(index);
      user.libraryCard = 1;
      localStorage.setItem(userId, JSON.stringify(user));

      location.reload();
    });
  })
);

popUpClose.forEach((el) => el.addEventListener("click", closePopUp));

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("pop-up")) {
    closePopUp();
  }
});
