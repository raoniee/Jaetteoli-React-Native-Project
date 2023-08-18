import {baseUrl} from "utils/baseUrl";
import {getToken} from "utils/Cookie";

export const patchReportReview = async (reviewIdx) => {
    const apiUrl = baseUrl + `/jat/app/reviews/report`;
    const jwt = await getToken();

    const requestOptions = {
        method: 'PATCH',
        headers: {
            'X-ACCESS-TOKEN': jwt,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            reviewIdx: reviewIdx
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