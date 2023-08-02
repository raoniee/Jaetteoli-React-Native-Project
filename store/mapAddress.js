import { createSlice } from "@reduxjs/toolkit";

const mapAddressSlice = createSlice({
  name: "mapAddress",
  initialState: {
      longitude: 0.0,
      latitude: 0.0,
      isChanged: false,
  },
  reducers: {
    changeAddress: (state, action) => ({
      ...state,
      longitude: action.payload.longitude,
      latitude: action.payload.latitude,
      isChanged: true,
    }),
  },
});

export const changeAddress = mapAddressSlice.actions.changeAddress;
export default mapAddressSlice.reducer;
