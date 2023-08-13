import {baseUrl, jwt} from "utils/baseUrl";

export const postAddBasket = async (storeIdx, menuIdx, quantity, sameStoreCheck = 0) => {
    /*
    * status: 0 => 서버 문제
    * status: 1 => 성공
    */
    const apiUrl = baseUrl+"/jat/app/basket";

    const requestOptions = {
        method: 'POST',
        headers: {
            'X-ACCESS-TOKEN': jwt,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeIdx: storeIdx,
            todaymenuIdx: menuIdx,
            count: quantity,
            sameStoreCheck: sameStoreCheck
        })
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        if (data.code === 1000) {
            return {code: 1000, status: 1};
        }
        else return {code: data.code, status: 0};
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}