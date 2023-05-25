const items = document.querySelectorAll(".carousel-item");

window.addEventListener(
  "wheel",
  (e) => {
    const direction = e.deltaY < 0 ? -1 : 1;
    const currentElement = e.target.closest(".carousel-item");

    if (direction > 0 && currentElement.nextElementSibling) {
      e.preventDefault();
      currentElement.nextElementSibling.scrollIntoView({ behavior: "smooth" });
    } else if (direction < 0 && currentElement.previousElementSibling) {
      e.preventDefault();
      currentElement.previousElementSibling.scrollIntoView({
        behavior: "smooth",
      });
    }
  },
  { passive: false }
);
