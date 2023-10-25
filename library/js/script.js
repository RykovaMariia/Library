//LocalStorage

const form = document.querySelector(".register-form");
const submit = document.querySelector('.register_submit')
const inputs = document.querySelectorAll('.input-field')

class newUser{
  constructor(firstName, lastName, email, password, card){
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.card = card;
  }
}

function registering() {
  let numberCard =  Math.floor(100000000 + Math.random() * (999999999 + 1 - 100000000));
  const user = new newUser(form.firstName.value, form.lastName.value, form.email.value, form.password.value, numberCard);
  localStorage.setItem(numberCard, JSON.stringify(user));
  return numberCard;
}

function changeIcon() {
  const icon = document.querySelector('.header__icon');
  let userId = localStorage.getItem('loginStatus');
  
  icon.classList.add('header__icon_user');
  
  let firstLetter = JSON.parse(localStorage.getItem(userId)).firstName.toUpperCase().slice(0,1);
  let secondLetter = JSON.parse(localStorage.getItem(userId)).lastName.toUpperCase().slice(0,1);
  icon.querySelector("div").innerText = firstLetter + secondLetter;
}

function changeMenu() {
const profileMenu = document.querySelector('.profile_auth');
profileMenu.querySelector('.profile__name').innerText = localStorage.getItem('loginStatus');

}

form.addEventListener('submit', () => {
  localStorage.setItem('loginStatus', null);
  localStorage.setItem('loginStatus', registering());
});

if(localStorage.getItem('loginStatus')) {
changeIcon();
changeMenu();

}
