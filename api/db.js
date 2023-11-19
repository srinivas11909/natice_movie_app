import axios from 'axios';

const baseUrl = 'https://api.themoviedb.org/3';
const secretkey = 'd40e942d9b0fbc3074636dfb68aed4d8';


/*HomePage Api's*/

const trendingMoviesUrl = `${baseUrl}/trending/movie/day?api_key=${secretkey}`;
const upComingMoviesUrl = `${baseUrl}/movie/upcoming?api_key=${secretkey}`;
const topRatedMoviesUrl = `${baseUrl}/movie/top_rated?api_key=${secretkey}`;
const searchMoviesUrl = `${baseUrl}/search/movie?api_key=${secretkey}`;


export const posterImgBig = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w500'+posterPath : null;
export const posterImgMed = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w342'+posterPath : null;
export const posterImgSm = posterPath => posterPath ? 'https://image.tmdb.org/t/p/w185'+posterPath : null;

export const fallbackMoviePoster = 'https://img.myloview.com/stickers/white-laptop-screen-with-hd-video-technology-icon-isolated-on-grey-background-abstract-circle-random-dots-vector-illustration-400-176057922.jpg';

const movieDetailsUrl = id=> `${baseUrl}/movie/${id}?api_key=${secretkey}`;
const castDetailsUrl = movieId=> `${baseUrl}/movie/${movieId}/credits?api_key=${secretkey}`;
const similarMoviesUrl = id => `${baseUrl}/movie/${id}/similar?api_key=${secretkey}`;

export const apiCall = async (url, params) => {
    const options = {
        method: 'GET',
        url: url,
        params: params? params: {}
    };
    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {};
    }
}


// home screen apis
export const fetchTrendingMovies = ()=>{
    return apiCall(trendingMoviesUrl);
}
export const fetchUpcomingMovies = ()=>{
    return apiCall(upComingMoviesUrl);
}
export const fetchTopRatedMovies = ()=>{
    return apiCall(topRatedMoviesUrl);
}
// search screen apis
export const searchMovies = (params)=>{
    return apiCall(searchMoviesUrl, params);
}

export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsUrl(id));
}

export const fetchCastDetails = (movieId)=>{
    return apiCall(castDetailsUrl(movieId));
}

export const fetchSimilarMovies = (movieId)=>{
    return apiCall(similarMoviesUrl(movieId));
}