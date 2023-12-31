import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie";

export const postSubscribe = async (check, storeIdx) => {
    const apiUrl = baseUrl+`/jat/app/subscription`;
    const jwt = await getToken();

    const requestOptions = {
        method: 'POST',
        headers: {
            'X-ACCESS-TOKEN': jwt,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeIdx: storeIdx,
            yn: check
        })
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