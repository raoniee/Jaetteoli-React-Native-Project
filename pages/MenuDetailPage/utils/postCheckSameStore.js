import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie";

export const postCheckSameStore = async (storeIdx) => {
    /*
    * status: 0 => 서버 문제
    * status: 1 => 다른 가게
    * status: 2 => 같은 가게
    */
    const apiUrl = baseUrl+"/jat/app/basket/same-store";
    const jwt = await getToken();

    const requestOptions = {
        method: 'POST',
        headers: {
            'X-ACCESS-TOKEN': jwt,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeIdx: storeIdx
        })
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        if (data.code === 1000) {
            if (data.result.sameStoreCheck === 1) return {code: 1000, status: 1};
            else return {code: 1000, status: 2}
        }
        else return {code: data.code, status: 0}
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}