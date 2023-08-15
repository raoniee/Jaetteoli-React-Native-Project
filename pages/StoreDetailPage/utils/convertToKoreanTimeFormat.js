export const convertToKoreanTimeFormat = (timeString) => {
    const [hour, minute] = timeString.split(':').map(Number);
    const meridiem = hour <= 12 ? '오전' : '오후';
    const convertHour = hour <= 12 ? hour : hour - 12;
    return `${meridiem} ${convertHour}:${minute < 10 ? '0' + minute : minute}`
}