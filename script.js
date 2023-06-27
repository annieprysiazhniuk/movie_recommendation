const selectGenre = document.getElementById('genre');
const movieUrl = 'https://api.themoviedb.org/3/';
const genreList = 'genre/movie/list';
const tmdbKey = '83c198968bd731525d5f87a158691968';
let choosenGenre = selectGenre.value;

const getGenresList = async () => {
    const requestParams = `?api_key=${tmdbKey}`;
    const fullUrl = movieUrl + genreList + requestParams;
    try {
        const response = await fetch(fullUrl, {accept: 'application/json'}); 
        if(response.ok) {
            const jsonResponse = await response.json();
            const genres = jsonResponse.genres
            return genres
        }
    } catch (error) {
        console.log(error)
    }
}

const insertGenres = (genre) => {
    genre.forEach(element => {
        let option = document.createElement("option");
        option.value = element.id; 
        option.text = element.name;
        selectGenre.appendChild(option);        
    });
}

const getMoviesByGenre = async () => {
    const discoverMovieEndpoint = 'discover/movie';
    const requestParams = `?api_key=${tmdbKey}&with_genres=${choosenGenre}`;
    const fullUrl = movieUrl + discoverMovieEndpoint + requestParams;
    try {
        const response = await fetch(fullUrl)
        if (response.ok) {
            let movieList = response.json()
            console.log(movieList)
            return movieList
        }
    } catch (error) {
        console.log(error)
    }
}

const showMoviesList = (moviesByGenre) => {
    let moviesListContainer = document.querySelector('.movie-list');
    if (moviesListContainer.hasChildNodes()) {
        moviesListContainer.innerHTML = '';
    } 
    moviesByGenre.results.forEach(movie => {
        let movieElem = document.createElement('li');
        const moviePosterUrl = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        movieElem.className = 'movie-item';
        moviesListContainer.appendChild(movieElem)
    
        movieElem.appendChild(document.createElement('img')).setAttribute('src', moviePosterUrl)
        movieElem.appendChild(document.createElement('h3')).textContent = movie.title
    })


}

getGenresList().then(insertGenres)

selectGenre.addEventListener('change', () => {
    choosenGenre = selectGenre.value;
    getMoviesByGenre().then(showMoviesList)
})
