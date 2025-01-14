import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, APIRoute, AUTH_TOKEN, LoadingStatus } from '../constant.ts';
import { loadState } from '../helpers.ts';
import axios, { AxiosError } from 'axios';
import { RootState } from './store.ts';

export interface IInitialState {
  jwt: string | null | undefined;
  userName: string | null;
  loadingStatus: LoadingStatus;
  loadingError: string | undefined;
}

export interface IUserState {
  jwt?: string | null;
  user: null | { username: string };
}

const initialState: IInitialState = {
  jwt: loadState<IUserState>(AUTH_TOKEN)?.jwt ?? null,
  userName: null,
  loadingStatus: LoadingStatus.Idle,
  loadingError: undefined
};

export const signIn = createAsyncThunk(
  'user/signIn',
  async (params: { identifier: string; password: string }) => {
    try {
      const { data } = await axios.post<IUserState>(
        `${API}${APIRoute.SignIn}`,
        {
          identifier: params.identifier,
          password: params.password
        }
      );
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
    }
  }
);

export const signUp = createAsyncThunk(
  'user/signUp',
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<IUserState>(
        `${API}${APIRoute.SignUp}`,
        {
          email: params.email,
          password: params.password,
          username: params.name
        }
      );
      return data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data.message);
      }
    }
  }
);

export const getProfileUser = createAsyncThunk<
  { username: string },
  void,
  {
    state: RootState;
  }
>('user/getProfileUser', async (_, thunkAPI) => {
  const jwt = thunkAPI.getState().user.jwt;

  try {
    const { data } = await axios.get(`${API}/${APIRoute.getProfileUser}`, {
      headers: { Authorization: `Bearer ${jwt}` }
    });

    return data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message);
    }
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state: IInitialState) => {
      state.jwt = null;
      state.userName = null;
      state.loadingStatus = LoadingStatus.Idle;
      state.loadingError = undefined;
    },
    clearErrorMessage: (state: IInitialState) => {
      state.loadingError = undefined;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        if (!action.payload || !action.payload.user) {
          return;
        }
        state.jwt = action.payload.jwt;
        state.userName = action.payload.user.username;
        state.loadingStatus = LoadingStatus.Successed;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.Failed;
        state.loadingError = action.error.message;
      });
    builder
      .addCase(signUp.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        if (!action.payload || !action.payload.user) {
          return;
        }
        state.jwt = action.payload.jwt;
        state.userName = action.payload.user.username;
        state.loadingStatus = LoadingStatus.Successed;
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.Failed;
        state.loadingError = action.error.message;
      });
    builder
      .addCase(getProfileUser.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        state.userName = action.payload.username;
        state.loadingStatus = LoadingStatus.Successed;
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.Failed;
        state.loadingError = action.error.message;
      });
  }
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
