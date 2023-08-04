import { configureStore } from '@reduxjs/toolkit'
import mapAddress from './mapAddress'
import basketAdd from "./basketAdd";

export const store = configureStore({
    reducer: {
        mapAddress: mapAddress,
        basketAdd:  basketAdd
    }
})
