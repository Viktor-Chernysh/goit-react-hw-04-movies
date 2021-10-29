import axios from "axios";
axios.defaults.baseURL = "https://api.themoviedb.org/3";

const requestedMoviesFetch = async (query) => {
  return await axios
    .get(`/search/movie?api_key=${API_KEY}&query=${query}`)
    .then((response) => response.data.results);
};

const API_KEY = "060d5e1e50f049be3e01f09d9d9a7b1c";
const BASE_URL = "https://developers.themoviedb.org/3";

function fetchTrendingMovies() {
  return axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
}

function fetchMovieBySearch(searchQuery, page = 1) {
  return axios.get(
    `${BASE_URL}/search/movie?query=${searchQuery}&page=${page}&api_key=${API_KEY}`
  );
}
