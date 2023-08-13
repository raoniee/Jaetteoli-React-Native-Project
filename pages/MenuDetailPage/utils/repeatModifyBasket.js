import {patchModifyBasket} from "pages/BasketPage/utils/patchModifyBasket";

export const repeatModifyBasket = async (basketIdx, count, from = '') => {
    /*
    * status: 0 => 서버 문제
    * status: 1 => 가게 상세 경로
    * status: 2 => 그외 경로
    */

    for (let i = 0; i < count; i++) {
        try {
            const response = await patchModifyBasket({basketIdx: basketIdx, result: false});
            if (response.code !== 1000) return response;
        } catch (error) {
            console.error("Error on iteration", i, error);
        }
    }

    if (from === 'StoreDetailPage')
        return {code: 1000, status: 1}
    else return {code: 1000, status: 2}
}