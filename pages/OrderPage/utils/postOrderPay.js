import {baseUrl, jwt} from "utils/baseUrl";

export const postOrderPay = async (storeIdx, request, date) => {
    /*
    * status: 1 => 요청 성공
    * status: 2 => 개수 부족
    * status: 3 => 주문 실패
    * */

    const apiUrl = baseUrl+"/jat/app/basket/order";

    const requestOptions = {
        method: 'POST',
        headers: {
            'X-ACCESS-TOKEN': jwt,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            storeIdx: storeIdx,
            request: request,
            pickupTime: date.toLocaleTimeString(undefined, {hour12: false, hour: '2-digit', minute: '2-digit'}),
            paymentStatus: "결제완료"
        })
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        if (data.code === 1000) {
            return {code: 1000, status: 1};
        } else if (data.code === 2061) {
            return {code: 2061, status: 2};
        } else if (data.code === 2062) {
            return {code: 2062, status: 3};
        } else return {code: data.code, status: 0};
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}