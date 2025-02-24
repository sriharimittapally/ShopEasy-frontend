import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Address } from "../../types/userTypes";

// Define the state type
// interface AddressState {
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// // Define initial state
// const initialState: AddressState = {
//   status: "idle",
//   error: null,
// };


export const addAddress = createAsyncThunk(
  "address/saveAddress",
  async ({ address, jwt }: { address: Address; jwt: string }, { rejectWithValue }) => {
    try {
     const respone= await api.post("/api/users/address", address, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Address added succesfully");
      return respone.data;
    } catch (error:any) {
      return rejectWithValue(error.response?.data || "Failed to save address");
    }
  }
);


