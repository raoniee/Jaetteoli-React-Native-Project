import {baseUrl, jwt} from "utils/baseUrl";

export const getStoreDetailInfo = async (storeIdx) => {
    const apiUrl = baseUrl+`/jat/app/stores/info/details?storeIdx=${storeIdx}&type=info`;

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