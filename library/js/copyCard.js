const buttonCopyCard = document.querySelector(".copy__card-number");

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

  buttonCopyCard.addEventListener("click", copyCard);