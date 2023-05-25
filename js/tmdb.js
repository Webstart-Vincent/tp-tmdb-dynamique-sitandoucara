//https://api.themoviedb.org/3/movie/popular?api_key=f21f9a3af90d3b652b0fefe8ced2e831&language=fr-FR

/*const attendsUnPeu = (callback) => {
  console.log("attends un peu..");
  setTimeout(callback, 3000);
  console.log("...l'attente nest pas terminé");
};

attendsUnPeu(() => console.log("Attente terminé"));
*/

/**
 * Description
 * @returns{Promise<{poster_path: string, title:string, overview:string}[]>}
 */
const getMovies = async () =>
  await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=f21f9a3af90d3b652b0fefe8ced2e831&language=fr-FR"
  )
    .then((res) => res.json())
    .then((json) => json.results)
    .catch((error) => console.error("error >", error));

export { getMovies };
