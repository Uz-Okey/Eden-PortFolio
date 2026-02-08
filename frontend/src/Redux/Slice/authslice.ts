import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import {
  ApiCurrentProfile,
  ApiLogin,
  ApiLogout,
  ApiRegister,
} from "../api/authApiService";

interface registerRequest {
  username: string;
  password: string;
  email: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

interface authState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
  isAdmin: boolean;
}

const initialState: authState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
  isAdmin: false,
};

interface logoutResponse {
  message: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

export const loginThunk = createAsyncThunk<
  User,
  LoginRequest,
  { rejectValue: string }
>("auth/loginThunk", async (data, { rejectWithValue }) => {
  try {
    const res = await ApiLogin(data);
    return res.user;
  } catch (err) {
    const message = (err as { response?: { data?: { message: string } } })
      .response?.data?.message;
    return rejectWithValue(message || "Invalid login details");
  }
});

export const registerThunk = createAsyncThunk<
  User,
  registerRequest,
  { rejectValue: string }
>("auth/registerThunk", async (data, { rejectWithValue }) => {
  try {
    const res = await ApiRegister(data);
    return res.user;
  } catch (err) {
    const message = (err as { response?: { data?: { message: string } } })
      .response?.data?.message;
    return rejectWithValue(message || "Registration failed");
  }
});

export const logoutThunk = createAsyncThunk<
  logoutResponse,
  void,
  { rejectValue: string }
>("auth/logoutThunk", async (_, { rejectWithValue }) => {
  try {
    const res = await ApiLogout();
    return res;
  } catch (err) {
    const message = (err as { response?: { data?: { message: string } } })
      .response?.data?.message;
    return rejectWithValue(message || "Logout failed");
  }
});

export const currentProfileThunk = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/currentProfileThunk", async (_, { rejectWithValue }) => {
  try {
    const res = await ApiCurrentProfile();
    return res;
  } catch (err) {
    const message = (err as { response?: { data?: { message: string } } })
      .response?.data?.message;
    return rejectWithValue(message || "not a user");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.role === "admin";
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Invalid login details";
      })
      // registerThunk
      .addCase(registerThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
          state.isAuthenticated = true;
          state.isAdmin = action.payload.role === "admin";
        },
      )
      .addCase(registerThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      })

      // logoutthunk
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.isAdmin = false;
        state.error = null;
      })
      .addCase(logoutThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      })
      // currentProfileThunk
      .addCase(currentProfileThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(currentProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAdmin = action.payload.role === "admin";
      })
      .addCase(currentProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "not a user";
      });
  },
});
export const { clearError } = authSlice.actions;
export default authSlice.reducer;