import axios from 'axios';

const API_KEY = '060d5e1e50f049be3e01f09d9d9a7b1c';
const BASE_URL = 'https://api.themoviedb.org/3';
axios.defaults.baseURL = BASE_URL;

function fetchTrendingMovies(page = 1) {
  return axios
    .get(`/trending/movie/week?api_key=${API_KEY}&language=ru&page=${page}`)
    .then(res => res)
    .catch(err => alert(err));
}

function fetchMovieBySearch(searchQuery, page = 1) {
  return axios.get(
    `/search/movie?query=${searchQuery}&page=${page}&api_key=${API_KEY}&language=ru`,
  );
}
function fetchMovieById(id) {
  return axios
    .get(`/movie/${id}?api_key=${API_KEY}&language=ru`)
    .then(res => res.data)
    .catch(err => console.log(err.message));
}
function fetchCast(id) {
  return axios
    .get(`/movie/${id}/credits?api_key=${API_KEY}`)
    .then(res => res)
    .catch(err => console.log(err));
}
function fetchReviews(id) {
  return axios
    .get(`/movie/${id}/reviews?api_key=${API_KEY}`)
    .then(res => res)
    .catch(err => console.log(err));
}
export {
  fetchTrendingMovies,
  fetchMovieBySearch,
  fetchMovieById,
  fetchCast,
  fetchReviews,
};
