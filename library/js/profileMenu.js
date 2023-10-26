const profileIcon = document.querySelector(".header__icon");
const profileMenu = document.querySelector(".profile_no-auth");
const profileAuthMenu = document.querySelector(".profile_auth");

profileIcon.addEventListener("click", (e) => {
    if(localStorage.getItem('loginStatus')){
        profileAuthMenu.classList.toggle("profile_open");
    } else{
        profileMenu.classList.toggle("profile_open");
    }
  
  e._isClickWithIn = true;
});

profileMenu.addEventListener("click", (e) => (e._isClickWithIn = true));
profileAuthMenu.addEventListener("click", (e) => (e._isClickWithIn = true));

document.body.addEventListener("click", (e) => {
  if (!e._isClickWithIn) {
    profileMenu.classList.remove("profile_open");
    profileAuthMenu.classList.remove("profile_open");
  }
});

