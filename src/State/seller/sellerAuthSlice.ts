import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const sellerLogin = createAsyncThunk<any, any>(
    "/auth/signin",
    async ({loginRequest, navigate}, { rejectWithValue }) => {
      try {
        const response = await api.post("/sellers/login", loginRequest);
        console.log("Login Successful ", response.data);
        const jwt = response.data.jwt;
        localStorage.setItem("jwt", jwt);
        navigate("/seller")
      } catch (error) {
        rejectWithValue("Error")
        console.log("error - - -", error);
      }
    }
  );

