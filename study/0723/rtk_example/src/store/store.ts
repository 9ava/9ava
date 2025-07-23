import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import todoReducer from "./slices/todoSlice"; // 아직은 임시, 아래에서 구현

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todo: todoReducer,
  },
});

// RootState, AppDispatch 타입 추출
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
