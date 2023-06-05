// selector
const showModalBtn = document.querySelector(".show-btn");
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".backdrop");
// event
showModalBtn.addEventListener("click", showModal);
backdrop.addEventListener("click", closeModal);
// function
function showModal() {
  modal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  showModalBtn.classList.add("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
  backdrop.classList.add("hidden");
  showModalBtn.classList.remove("hidden");
}
