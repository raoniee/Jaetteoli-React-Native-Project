import { createSlice } from "@reduxjs/toolkit";

const basketAddSlice = createSlice({
  name: "basketAdd",
  initialState: {
      add: false,
  },
  reducers: {
    basketAddAction: (state, action) => ({
      add: action.payload.add,
    }),
  },
});

export const basketAddAction = basketAddSlice.actions.basketAddAction;
export default basketAddSlice.reducer;
