const logIn = document.querySelectorAll(".move-to-login");
const register = document.querySelectorAll(".move-to-register");
const windowPopUp = document.querySelectorAll('.pop-up__window')
const popUpLogin = document.querySelector(".pop-up_login");
const popUpRegister = document.querySelector(".pop-up_register")

const popUpClose = document.querySelectorAll('.pop-up__close')

function openPopUpLogIn() {
  popUpLogin.classList.add("pop-up_opened");
  document.body.classList.add('lock')
  profileMenu.classList.remove("profile_open");
  popUpRegister.classList.remove("pop-up_opened");
}

function openPopUpRegister() {
  popUpRegister.classList.add("pop-up_opened");
  document.body.classList.add('lock')
  profileMenu.classList.remove("profile_open");
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