import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie";

export const patchModifyBasket = async ({basketIdx, inDecrease = 1, patchStatus = 'count', result = true} = {}) => {
    /*
    * status: 0 => 서버 문제 or 장바구니 빔
    * status: 1 => 성공
    * status: 2 => 성공 and 데이터X
    * */
    const apiUrl = baseUrl + "/jat/app/basket";
    const jwt = await getToken();

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'X-ACCESS-TOKEN': jwt,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            basketIdx: basketIdx,
            inDecrease: inDecrease,
            patchStatus: patchStatus
        })
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        if (data.code === 1000) {
            if (result)
                return {code: 1000, status: 1, data: data.result}
            else return {code: 1000, status: 2}
        }
        else return {code: data.code, status: 0}
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}