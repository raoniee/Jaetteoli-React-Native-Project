import { configureStore } from '@reduxjs/toolkit'
import mapAddress from './mapAddress'

export const store = configureStore({
    reducer: {
        mapAddress: mapAddress
    }
})