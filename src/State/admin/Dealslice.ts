import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {DealState } from "../../types/dealTypes";
import { api } from "../../config/Api";

const initialState: DealState = {
  deals: [],
  loading: false,
  error: null,
  dealCreated: false,
  dealUpdated: false,
};

export const createDeal = createAsyncThunk(
  "/deals/createDeal",
  async (deal: any, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals", deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("Deal created", response.data);

      return response.data;
    } catch (error: any) {
      console.log("error-->", error.response);
      return rejectWithValue(
        error.response.data.message || "Failed to create deal"
      );
    }
  }
);

export const getAllDeals = createAsyncThunk(
  "deals/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/deals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("Get all deals", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Error-->", error);
      return rejectWithValue(error.response.data.message || "Failed get deals");
    }
  }
);



const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {
    resetDealState: (state) => {
      state.dealCreated = false;
      state.dealUpdated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Deal
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.dealCreated = false;
        state.error = null;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals.push(action.payload);
        state.dealCreated = true;
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.dealCreated = false;
      })

      // Get All Deals
      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetDealState } = dealSlice.actions;
export default dealSlice.reducer;