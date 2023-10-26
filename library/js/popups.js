const logIn = document.querySelectorAll(".move-to-login");
const register = document.querySelectorAll(".move-to-register");
const myProfile = document.querySelectorAll('.move-to-profile');
const logOut = document.querySelectorAll('.profile__logout');
const windowPopUp = document.querySelectorAll('.pop-up__window');
const popUpLogin = document.querySelector(".pop-up_login");
const popUpRegister = document.querySelector(".pop-up_register");
const popUpMyProfile = document.querySelector('.pop-up_my-profile');

const popUpClose = document.querySelectorAll('.pop-up__close');

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

function openPopUpMyProfile() {
  popUpMyProfile.classList.add("pop-up_opened");
  document.body.classList.add('lock')
  profileAuthMenu.classList.remove("profile_open");
}

function clickLogOut() {
  localStorage.setItem("loginStatus", '');
  location.reload();
}

function closePopUp() {
  popUpRegister.classList.remove("pop-up_opened");
  popUpLogin.classList.remove("pop-up_opened");
  popUpMyProfile.classList.remove("pop-up_opened");
  document.body.classList.remove('lock')
}

logIn.forEach(el => el.addEventListener("click", openPopUpLogIn));
register.forEach(el => el.addEventListener("click", openPopUpRegister));
myProfile.forEach(el => el.addEventListener("click", openPopUpMyProfile));
logOut.forEach(el => el.addEventListener("click", clickLogOut));
popUpClose.forEach(el => el.addEventListener('click', closePopUp));


document.addEventListener( 'click', (e) => {
	if (e.target.classList.contains('pop-up')) {
		closePopUp();
	}
})



