import { getMovies } from "./tmdb.js";

const carousel = document.querySelector(".carousel");
const movies = await getMovies();

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

const truncateText = (text, length) => {
  if (text.length <= length) {
    return text;
  }
  let subString = text.substr(0, length - 1);
  return subString.substr(0, subString.lastIndexOf(" ")) + "...";
};
const getSlide = async (movie, isLast) => {
  const img = await loadImage(
    `https://image.tmdb.org/t/p/w300${movie.poster_path}`
  );
  const colorThief = new ColorThief();
  const color = colorThief.getColor(img);

  const slide = document.createElement("div");
  slide.classList.add("carousel-item");
  slide.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
  slide.style.color =
    color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114 > 186
      ? "black"
      : "white";
  slide.innerHTML = `
      ${isLast ? '<i class="bi bi-arrow-bar-up"></i>' : ""}
      <img src="https://image.tmdb.org/t/p/w300${movie.poster_path}" 
          alt= "Affiche du film ${movie.title}"/>
      <div><h1>${movie.title}</h1>
      <p>${truncateText(movie.overview, 200)}</p></div>
  `;
  return slide;
};

for (let i = 0; i < movies.length; i++) {
  const movie = movies[i];
  try {
    const slide = await getSlide(movie, i === movies.length - 1);
    carousel.appendChild(slide);
  } catch (error) {
    console.error(`Failed to create slide for movie: ${movie.title}`, error);
  }
}
