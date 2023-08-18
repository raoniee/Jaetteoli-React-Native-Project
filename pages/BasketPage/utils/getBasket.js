import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie";

export const getBasket = async (todaymenuIdx = 0, basket = true) => {
    /*
    * status: 0 => 서버 문제
    * status: 1 => 목록 요청
    * status: 2 => 메뉴 중복O
    * status: 3 => 메뉴 중복X or 장바구니 빔
    */
    const apiUrl = baseUrl+"/jat/app/basket";
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
            const basketList = data.result.basketItems;
            if (basket) {
                // 장바구니 페이지에서 요청
                if (!data.result.basketItems)
                    data.result.basketItems = []
                return {status: 1, data: data.result}
            } else {
                if (basketList) {
                    const duplicateItem = basketList.find(item => item.todaymenuIdx === todaymenuIdx);
                    if (duplicateItem)
                        return {status: 2, data: {basketIdx: duplicateItem.basketIdx}}
                    else return {status: 3}
                } else {
                    return {status: 3}
                }
            }
        } else if (data.code === 4000) return {status: 3}
        else return {status: 0}
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}