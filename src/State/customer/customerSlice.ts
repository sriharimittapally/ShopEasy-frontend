import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeCategory, HomeData } from "../../types/homeCategoryTypes";
import { api } from "../../config/Api";


// export const fetchHomePageData = createAsyncThunk<HomeData>(
//   "home/fetchHomePageData",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await api.get("/home-page");
//       console.log("Home page", response.data);
//       return response.data;
//     } catch (error: any) {
//       const errorMessage =
//         error.response.data.message ||
//         error.message ||
//         " Failed to fetch home page data";
//       console.log("error-->", error);

//       return rejectWithValue(errorMessage);
//     }
//   }
// );

export const createHomeCategories = createAsyncThunk<HomeData, HomeCategory[]>(
  "/home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
    try {
      const response = await api.post("/home/categories", homeCategories);
      console.log("Home categories created--- ", response.data);
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response.data.message ||
        error.message ||
        "Failed to cretae home categories";
      console.log("Error -->", errorMessage.error);
      return rejectWithValue(errorMessage);
    }
  }
);

interface HomeState{
    homePageData:HomeData |  null;
    homeCategories:HomeCategory[];
    loading:boolean;
    error:string | null;
}


const initialState :HomeState = {
    homePageData:null,
    homeCategories:[],
    loading:false,
    error:null,

}

const homeSlice = createSlice({
    name:"home",
    initialState,
    reducers:{},
    extraReducers: (builer)=>{
        // builer.addCase(fetchHomePageData.pending,(state)=>{
        //     state.loading = true;
        //     state.error = null;
        // })
        // builer.addCase(fetchHomePageData.fulfilled,(state, action:PayloadAction<HomeData>)=>{
        //     state.loading = false;
        //     state.homePageData = action.payload;
        // })
        // builer.addCase(fetchHomePageData.rejected,(state, action)=>{
        //     state.loading = false;
        //     state.error = action.error.message || "Failed to load home page data";
        // })

        builer.addCase(createHomeCategories.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builer.addCase(createHomeCategories.fulfilled,(state, action:PayloadAction<HomeData>)=>{
            state.loading = false;
            state.homePageData = action.payload;
        })
        builer.addCase(createHomeCategories.rejected,(state, action)=>{
            state.loading = false;
            state.error = action.error.message || "Failed to load home page data";
        })



    }
})


export default homeSlice.reducer;