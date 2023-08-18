import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie";

export const getMenuDetailInfo = async (todaymenuIdx, check = false) => {
    /*
    * status: 0 => 서버 문제
    * status: 1 => 매진O or 요청 성공
    * status: 2 => 매진X
    */
    const apiUrl = baseUrl+`/jat/app/menus/detail?todaymenuIdx=${todaymenuIdx}`;
    const jwt = await getToken();

    const requestOptions = {
        method: 'GET',
        headers: {
            'X-ACCESS-TOKEN': jwt,
        }
    }

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        if (data.code === 1000) {
            if (!check)
                return {code: 1000, status: 1, data: data.result};
            else if (check){
                // 매진인지 확인
                if (data.result.remain === 0)
                    return {code: 1000, status: 1};
                else
                    return {code: 1000, status: 2};
            }
        }
        else return {code: data.code, status: 0};
    } catch (error) {
        console.log('Error fetching data:', error);
        throw error;
    }
}