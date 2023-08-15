import { configureStore } from '@reduxjs/toolkit'
import mapAddress from './mapAddress'
import basketAdd from "./basketAdd";
import myAddress from './myAddress';

export const store = configureStore({
    reducer: {
        mapAddress: mapAddress,
        basketAdd:  basketAdd,
        myAddress: myAddress
    }
})
