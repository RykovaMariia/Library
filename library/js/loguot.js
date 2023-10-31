const logOut = document.querySelectorAll(".profile__logout");

function clickLogOut() {
  localStorage.setItem("loginStatus", "");
  location.reload();
}

logOut.forEach((el) => el.addEventListener("click", clickLogOut));
