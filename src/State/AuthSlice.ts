import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";

export const sendLoginSignupOtp = createAsyncThunk<any, any>(
  "/auth/sendLoginSignupOtp",
  async ({ email, role }: { email: string; role: string }, { rejectWithValue }) => {
    console.log(email, role);
    
    try {
      const response = await api.post("/auth/send/login-signup-otp", {
      email, role
      });
      console.log("Login otp ", response);
    } catch (error) {
      rejectWithValue("Error")
      console.log("error - - -", error);
    }
  }
);

export const signin = createAsyncThunk<any, any>(
  "/auth/signin",
  async ({loginRequest, navigate },{ rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signin", loginRequest);
      console.log("Login otp ", response.data);
      localStorage.setItem("jwt", response.data.jwt);
      navigate("/account")
      return response.data.jwt;
    } catch (error) {
      rejectWithValue("Error")
      console.log("error - - -", error);
    }
  }
);

export const signup = createAsyncThunk<any, any>(
  "/auth/signup",
  async ({signupRequest,navigate},  { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);
      console.log("Login otp ", response.data);
      localStorage.setItem("jwt", response.data.jwt);
      navigate("/account")
      return response.data.jwt;
    } catch (error) {
      rejectWithValue("Error")
      console.log("error - - -", error);
    }
  }
);


export const fetchUserProfile = createAsyncThunk<any, any>(
  "/api/fetchUserProfile",
  async ({jwt}, { rejectWithValue }) => {
    console.log(jwt);
    
    try {
      const response = await api.get("/api/users/profile",{
        headers:{
          Authorization:`Bearer ${jwt}`
        }
      });
      console.log("user profile ", response.data);
      return response.data;
    } catch (error) {
      rejectWithValue("Error")
      console.log("error - - -", error);
    }
  }
);

export const logout = createAsyncThunk<any, any>(
  "/auth/logout",
  async (navigate, { rejectWithValue }) => {
    try {
      console.log("JWT before logout:", localStorage.getItem("jwt"));

      localStorage.clear();
      console.log("logout successful");
      navigate("/");
    } catch (error) {
      rejectWithValue("Error")
      console.log("error - - - ", error);
    }
  }
);

interface AuthState {
  jwt: string | null;
  otpSent: boolean;
  isLoggedIn: boolean;
  user: any | null;
  loading:boolean;
}

const initialState: AuthState = {
  jwt: null,
  otpSent: false,
  isLoggedIn: false,
  user: null,
  loading:false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(sendLoginSignupOtp.pending,(state)=>{
      state.loading=true
    })
    builder.addCase(sendLoginSignupOtp.fulfilled,(state)=>{
      state.loading=false;
      state.otpSent=true;
    })
    builder.addCase(sendLoginSignupOtp.rejected,(state)=>{
      state.loading=false;
    })
    builder.addCase(signin.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.jwt = action.payload;
      state.isLoggedIn = true;
    });
    builder.addCase(fetchUserProfile.fulfilled,(state, action)=>{
      state.user=action.payload;
      state.isLoggedIn=true;
    })
    builder.addCase(logout.fulfilled,(state,)=>{
      state.jwt=null;
      state.isLoggedIn=false;
      state.user=null;
    })
  },
});


export default authSlice.reducer;