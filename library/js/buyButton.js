const formBuy = document.querySelector(".buy-form");
const buyButton = document.querySelectorAll(".move-to-buy");

buyButton.forEach((el, index) =>
  el.addEventListener("click", (e) => {
    popUpBuy.classList.add("pop-up_opened");
    document.body.classList.add("lock");

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
