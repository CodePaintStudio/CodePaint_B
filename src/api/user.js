import request from "../utils/request.js";

/** 登录
 * @param data 登录信息
 */
export function loginServer(data) {
    return request.post("/login", data)
}

/** 根据 name 获取用户信息
 * @param data
 */
export function getInfoByNameServer(data) {
    return request.get("/user", data)
}

/** 修改个人信息
 * @param data 信息
 */
export function changePasswordServer(data) {
    return request.patch("/user/NewPassword", data)
}
