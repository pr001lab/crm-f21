import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { API, APIRoute, LoadingStatus } from '../constant.ts';
import { RootState } from './store.ts';
import { IClientProps } from '../types/client.ts';

interface IInitialState {
  items: IClientProps[];
  loadingStatus: LoadingStatus;
  loadingError: string | null;
}

const initialState: IInitialState = {
  items: [],
  loadingStatus: LoadingStatus.Idle,
  loadingError: null,
};

export const getClients = createAsyncThunk<
  IClientProps[],
  void,
  {
    state: RootState;
  }
>('client/getClients', async (_, thunkAPI) => {
  const jwt = thunkAPI.getState().user.jwt;
  try {
    const { data } = await axios.get(`${API}${APIRoute.Clients}`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return data.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message);
    }
  }
});

export const editClient = createAsyncThunk<
  IClientProps,
  { client: IClientProps },
  {
    state: RootState;
  }
>('client/editClient', async ({ client }, thunkAPI) => {
  const jwt = thunkAPI.getState().user.jwt;
  const documentId = client.documentId;
  delete client.documentId;

  const requestParams = {
    data: {
      ...client,
    },
  };

  try {
    const { data } = await axios.put(
      `${API}${APIRoute.Clients}/${documentId}`,
      requestParams,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    return data.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message);
    }
  }
});

export const deleteClient = createAsyncThunk<
  IClientProps,
  { documentId: string },
  {
    state: RootState;
  }
>('client/deleteClient', async ({ documentId }, thunkAPI) => {
  const jwt = thunkAPI.getState().user.jwt;

  try {
    const { data } = await axios.delete(
      `${API}${APIRoute.Clients}/${documentId}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      },
    );

    return data.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw new Error(err.response?.data.message);
    }
  }
});

export const clientSlice = createSlice({
  name: 'client',
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (!action.payload) {
        return;
      }
      const restItems = state.items.filter(
        (item) => item.documentId !== action.payload.documentId,
      );
      state.items = [...restItems, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClients.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(getClients.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        state.items = action.payload;
        state.loadingStatus = LoadingStatus.Successed;
      })
      .addCase(getClients.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.Failed;
        state.loadingError = action.payload ? action.payload.toString() : null;
      });
    builder
      .addCase(editClient.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(editClient.fulfilled, (state, action) => {
        if (!action.payload) {
          return;
        }
        const restItems = state.items.filter(
          (item) => item.documentId !== action.payload.documentId,
        );
        state.items = [...restItems, action.payload];
        state.loadingStatus = LoadingStatus.Successed;
      })
      .addCase(editClient.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.Failed;
        state.loadingError = action.payload ? action.payload.toString() : null;
      });
    builder
      .addCase(deleteClient.pending, (state) => {
        state.loadingStatus = LoadingStatus.Loading;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.documentId !== action.meta.arg.documentId,
        );
        state.loadingStatus = LoadingStatus.Successed;
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.loadingStatus = LoadingStatus.Failed;
        state.loadingError = action.payload ? action.payload.toString() : null;
      });
  },
});

export default clientSlice.reducer;
export const clientActions = clientSlice.actions;
