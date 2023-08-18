import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie";

export const getStoreInfo = async (storeIdx, userLocation) => {
    const apiUrl = baseUrl+`/jat/app/stores/info?storeIdx=${storeIdx}&longitude=${userLocation.longitude ? userLocation.longitude : 0}&latitude=${userLocation.latitude ? userLocation.latitude : 0}`;
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