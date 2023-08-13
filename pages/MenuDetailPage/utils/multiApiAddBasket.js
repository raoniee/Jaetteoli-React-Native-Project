import {getMenuDetailInfo} from "./getMenuDetailInfo";
import {postCheckSameStore} from "./postCheckSameStore";
import {getBasket} from "../../BasketPage/utils/getBasket";
import {repeatModifyBasket} from "./repeatModifyBasket";
import {postAddBasket} from "./postAddBasket";

export const multiApiAddBasket = async (storeIdx, todaymenuIdx, quantity, from) => {
    /*
    * status: 0 => 실패
    * status: 1 => 매진
    * status: 2 => 가게 다름
    * status: 3 => (가게 상세) 개수 추가 성공
    * status: 4 => (그외 경로) 개수 추가 성공
    * status: 5 => 메뉴 추가 성공
    */

    const data = await getMenuDetailInfo(todaymenuIdx, true); // err: 1
    if (data.status === 1) {
        // 매진 모달리스창 띄우기
        return {status: 1}
    } else if (data.status === 2) {
        const data = await postCheckSameStore(storeIdx); // err: 2
        if (data.status === 1) {
            // 다른 가게
            return {status: 2};
        } else if (data.status === 2) {
            // 같은 가게
            const data = await getBasket(todaymenuIdx, false); // err: 3
            const basketIdx = data.data ? data.data.basketIdx : 0;
            if (data.status === 2) {
                // 메뉴 중복 O
                const data = await repeatModifyBasket(basketIdx, quantity, from) // err: 4
                // 개수 추가 성공
                if (data.status === 1) {
                    // 가게 상세 경로
                    return {status: 3}
                }
                else if (data.status === 2) {
                    // 그외 경로
                    return {status: 4}
                } else return {status: 0, err: 4}
            }
            else if (data.status === 3) {
                // 메뉴 중복 X
                const data = await postAddBasket(storeIdx, todaymenuIdx, quantity) // err: 5
                if (data.status === 1) {
                    // 메뉴 추가 성공
                    return {status: 5}
                } else return {status: 0, err: 5}
            } else return {status: 0, err: 3}
        } else return {status: 0, err: 2}
    } else return {status: 0, err: 1}
}