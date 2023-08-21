import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie";
import * as Location from "expo-location";

export const getStoreInfo = async (storeIdx) => {
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;
    const apiUrl = baseUrl+`/jat/app/stores/info?storeIdx=${storeIdx}&longitude=${longitude ? longitude : 0}&latitude=${latitude ? latitude : 0}`;
    const jwt = await getToken();

    const requestOptions = {
        method: 'GET',
        headers: {
            'X-ACCESS-TOKEN': jwt,
        },
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        if (data.code === 1000) {
            return data.result;
        }
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}