/** 加密展示
 * @param str 原始字符串
 * @returns {*|string} 加密后的字符串
 */
export function maskMiddle(str) {
    if (str.length <= 2) {
        return str;
    }

    const firstChar = str[0];
    const lastChar = str[str.length - 1];

    const stars = '*'.repeat(str.length - 2);

    return firstChar + stars + lastChar;
}

/** 延时函数
 * @param ms 延迟的时间
 */
export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/** 清除对象中的空键值对
 * @param values
 */
export function clearObj(values) {
    return Object.fromEntries(
        Object.entries(values).filter(([key, value]) => value)
    );
}

/**
 * 转换为本地时间
 * @param date
 * @returns {string}
 */
export function toLocalDate(date) {
    return new Date(date).toLocaleString();
}

/** 获取格式化的时间
 * @returns {string}
 */
export function getTime() {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    minute = minute < 10 ? '0' + minute : minute;
    second = second < 10 ? '0' + second : second;

    return `${year}-${month}-${day}-${hour}:${minute}:${second}`;
}
