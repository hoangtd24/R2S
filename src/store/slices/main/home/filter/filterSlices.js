import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASEURL = process.env.REACT_APP_API;

const filterSlices = createSlice({
    name: "filter",
    initialState: {
        id : 1,
        index: 0,
        jobFilter: [],
        jobPage: [],
        page : 1,
    },
    reducers: {
        idFilterChange : (state, action) => {
            state.id = action.payload
        },
        indexFilterChange: (state, action) => {
            state.index = action.payload
        },
        pageFilterChange : (state, action) => {
            state.page = action.payload
        }

    },
    extraReducers: (builder) => {
        builder.addCase(jobFilters.fulfilled, (state, { payload }) => {
            state.jobFilter = payload.contents;
            state.jobPage = payload
        });
    },
});

export const jobFilters = createAsyncThunk(
    "filter/jobFilter",
    async (dataFilter) => {
        return axios.get(`${BASEURL}${dataFilter[1].link}`, {
            params: dataFilter[0]
        }).then((res) => {
            return res.data
        }).catch((err) => {
            return err.response.data
        })
    })
export const {
    indexFilterChange,
    idFilterChange,
    pageFilterChange
} = filterSlices.actions;
export default filterSlices;