import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export const reduxToolkitSlice = createSlice({
  name: "redux-toolkit",
  initialState: {
    value: 0,
    largeData: undefined as any,
  },
  reducers: {
    increment: (state) => {
      return {
        ...state,
        value: state.value + 1,
      };
    },
    setLargeData: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        largeData: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, setLargeData } = reduxToolkitSlice.actions;

export const store = configureStore({
  reducer: {
    reduxToolkit: reduxToolkitSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
