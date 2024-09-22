import request from "../utils/request.js";

/** 获取UI作品列表
 */
export function getWorkListServer () {
    return request.get("/work")
}
