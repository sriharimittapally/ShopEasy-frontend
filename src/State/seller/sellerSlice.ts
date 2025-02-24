import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Seller } from "../../types/SellerTypes";

export const fetchSellerProfile = createAsyncThunk(
  "/sellers/fetchSellerProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/sellers/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Fetch seller Profile", response.data);
      return response.data;
    } catch (error) {
      rejectWithValue("Error")
      console.log("error - - ", error);
    }
  }
);

export const createSeller = createAsyncThunk(
  "/sellers/createSeller",
  async (seller: Seller, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers", seller);
      console.log(response.data);
      console.log("Seller account created Succesfully");
      return response.data;
    } catch (error) {
      rejectWithValue("Error")
      console.log("Error-->", error);
    }
  }
);

export const verifySeller = createAsyncThunk(
  "/sellers/verify-seller/",
  async (otp: string, { rejectWithValue }) => {
    try {
      const response = await api.post(`/sellers/verify-seller/${otp}`);

      console.log(response.data);
      console.log("Email verified");
      return response.data;
    } catch (error) {
      rejectWithValue("Error")
      console.log("Error-->", error);
    }
  }
)

interface SellerState {
  sellers: any[];
  selectedSeller: any;
  profile: any;
  report: any;
  loading: boolean;
  error: any;
}

const initialState: SellerState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};
const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;
