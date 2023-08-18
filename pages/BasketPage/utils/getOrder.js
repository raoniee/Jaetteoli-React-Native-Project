import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie";

export const getOrder = async () => {
    const apiUrl = baseUrl+"/jat/app/basket/order";
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
            if (data.result.storeIdx === 0)
                return {code: data.code, status: 2}
            else
                return {code: data.code, status: 1, data: data.result}
        }
        else return {code: data.code, status: 0}
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}