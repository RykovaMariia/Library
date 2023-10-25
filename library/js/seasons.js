const seasons = document.querySelectorAll(".favorites__seasons__label");
const books = document.querySelectorAll(".books");

seasons.forEach((s, i) => {
  s.addEventListener("click", () => {
    books.forEach((b) => {
      b.classList.add("books_disabled");
    });
    books[i].classList.remove("books_disabled");
  });
});


