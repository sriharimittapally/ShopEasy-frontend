import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Wishlist, WishlistState } from "../../types/wishlistTypes";
import { api } from "../../config/Api";




const initialState  : WishlistState={
    wishlist:null,
    loading:false,
    error:null,
}

export const getWishlistByUserId = createAsyncThunk(
    "wishlist/getWishlistByUserId",
    async(_, {rejectWithValue})=>{
        try {
            const response = await api.get(`/api/wishlist`,{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("jwt")}`,
                }
            })
            console.log("wishlist fetched", response.data);
            return response.data;
            
        } catch (error:any) {
            console.log("error", error);
            return rejectWithValue(
                error.response?.data.message || "Failed to fetch wishlist"
            );
        }
    }
)


export const AddProductToWishlist = createAsyncThunk(
    "wishlist/addProductToWishlist",
    async(productId:number, {rejectWithValue})=>{
        try {
            const response = await api.post(`/api/wishlist/add-product/${productId}`,{

            },{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("jwt")}`
                }
            })
            console.log("wish list Added product:", response.data);
            return response.data;
            
        } catch (error:any) {
            return rejectWithValue(
                error.response?.data.message || "Failed to ad product to wishlist"
            )
            
        }
    }
)


const wishlistSlice = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        resetWishlistState:(state)=>{
            state.wishlist = null;
            state.loading = false;
            state.error = null
        }

    },
    extraReducers:(builder)=>{
        builder.addCase(getWishlistByUserId.pending,(state)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getWishlistByUserId.fulfilled,(state, action:PayloadAction<Wishlist>)=>{
            state.wishlist= action.payload;
            state.loading = false;
        });
        builder.addCase(getWishlistByUserId.rejected,(state)=>{
            state.loading = true;
            state.error = null;
        });


        builder.addCase(AddProductToWishlist.pending,(state)=>{
            state.loading = true;
            state.error = null;
        });
        builder.addCase(AddProductToWishlist.fulfilled,(state, action:PayloadAction<Wishlist>)=>{
            state.wishlist= action.payload;
            state.loading = false;
        });
        builder.addCase(AddProductToWishlist.rejected,(state, action:PayloadAction<any>)=>{
            state.loading =false;
            state.error = action.payload;
        });
    }
})


export const {resetWishlistState} = wishlistSlice.actions;

export default wishlistSlice.reducer;
