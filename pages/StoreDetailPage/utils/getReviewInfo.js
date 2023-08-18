import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie";

export const getReviewInfo = async (storeIdx) => {
    const apiUrl = baseUrl+`/jat/app/stores/info/details?storeIdx=${storeIdx}&type=review`;
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