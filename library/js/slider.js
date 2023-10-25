const slider = document.querySelector(".about__slider");
const points = document.querySelectorAll(".about__pointer");
const images = document.querySelectorAll(".about__image");
const carets = document.querySelectorAll(".about__carret");

const classPoints = [, "point_1", "point_2", "point_3", "point_4"];

function moveSlider(index) {
  slider.classList.remove(...classPoints);
  if (index > 0) slider.classList.add(classPoints[index]);

  points.forEach((el) =>
    el.firstElementChild.classList.remove("about__point_checked")
  );
  points[index].firstElementChild.classList.add("about__point_checked");

  points.forEach((el) => (el.disabled = false));
  points[index].disabled = true;

  carets.forEach((el) => (el.disabled = false));
  if (index === 0) {
    carets[0].disabled = true;
  }
  if (index === points.length - 1) {
    carets[1].disabled = true;
  }
}

points.forEach((point, index) => {
  point.addEventListener("click", () => moveSlider(index));
});

carets.forEach((el, ind) => {
  el.addEventListener("click", () => {
    let index = 0;
    points.forEach((p, i) => {
      if (p.firstElementChild.classList.contains("about__point_checked"))
        index = i;
    });

    if (ind === 0) moveSlider(index - 1);
    else moveSlider(index + 1);
  });
});