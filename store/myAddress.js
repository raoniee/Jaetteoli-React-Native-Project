import { createSlice } from "@reduxjs/toolkit";

const myAddressSlice = createSlice({
  name: "myAddress",
  initialState: {
      longitude: 0.0,
      latitude: 0.0,
      isChanged: false,
  },
  reducers: {
    myChangeAddress: (state, action) => ({
      ...state,
      longitude: action.payload.longitude,
      latitude: action.payload.latitude,
      isChanged: true,
    }),
  },
});

export const myChangeAddress = myAddressSlice.actions.myChangeAddress;
export default myAddressSlice.reducer;
