console.log('works again');

async function logMovies() {
    const response = await fetch("https://services.grassriots.io/");
    const movies = await response.json();
    console.log(movies);
}