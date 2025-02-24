import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Transaction } from "../../types/transactionTypes";
import reducer from "./sellerSlice";

const API_URL = "/api/transactions";


interface TransactionState{
    transactions:Transaction[],
    transaction:Transaction | null,
    loading:boolean;
    error:string | null;

}

const initialState:TransactionState={
    transactions:[],
    transaction:null,
    loading:false,
    error:null,
}

export const fetchTransactionBySeller = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>(
  "transactions/fetchTransactionsBySeller",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/seller`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch Transactions By seller", response.data);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch seller transactions");
    }
  }
)

const transactionSlice = createSlice({
    name: "transactions",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchTransactionBySeller.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchTransactionBySeller.fulfilled, (state, action)=>{
            state.loading = false;
            state.transactions= action.payload;
        })
        builder.addCase(fetchTransactionBySeller.rejected,(state, action)=>{
            state.loading = true;
            state.error = action.payload as string;

        })

    }
})


export default transactionSlice.reducer;