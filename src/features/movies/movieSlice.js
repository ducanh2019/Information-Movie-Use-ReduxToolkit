import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/"
import movieApi from '../../common/apis/movieApi'
import { APIKey } from '../../common/apis/MovieApiKey'


export const fetchAsyncMovies = createAsyncThunk(
    // Tên action
    'movie/fetchAsyncMovies',
    async (term) => {

        const response = await movieApi.get(
            `?apikey=${APIKey}&s=${term}&type=movie`
        )
        return response.data
    })

export const fetchAsyncShows = createAsyncThunk('movie/fetchAsynShows',
    async (term) => {

        const response = await movieApi.get(
            `?apikey=${APIKey}&s=${term}&type=series`
        )
        return response.data
    })

export const fetchAsyncMoviesOrShowDetail = createAsyncThunk('movie/fetchAsyncMoviesOrShowDetail',
    async (id) => {
        const response = await movieApi.get(
            `?apikey=${APIKey}&i=${id}&Plot=full`
        )
        return response.data
    })
export const fetchAsyncSearch = createAsyncThunk('search/fetchAsyncSearch',
    async (term) => {
        const response = await movieApi.get(
            `?apikey=${APIKey}&t=${term}&plot=full`
        )
        return response.data
    }
)

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
    search: {}
}

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {}
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("Pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, movies: payload };
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected!");
        },
        [fetchAsyncShows.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, shows: payload };
        },
        [fetchAsyncMoviesOrShowDetail.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, selectMovieOrShow: payload };
        },

    }
})

export const searchSlice = createSlice({
    name: "search",
    initialState,
    extraReducers: {
        [fetchAsyncSearch.pending]: () => {
            console.log("Pending");
        },
        [fetchAsyncSearch.fulfilled]: (state, { payload }) => {
            console.log("Fetched Successfully!");
            return { ...state, search: payload };
        },
        [fetchAsyncSearch.rejected]: () => {
            console.log("Rejected!");
        }
    }
})


export const { removeSelectedMovieOrShow } = movieSlice.actions
export const getAllMovies = state => state.movies.movies
export const getAllShows = state => state.movies.shows
export const getSelectedMovieOrShow = state => state.movies.selectMovieOrShow
export const getAllSearch = state => state.search.search
export default movieSlice.reducer