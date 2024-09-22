import request from "../utils/request.js";

/** 获取UI作品列表
 */
export function getWorkListServer () {
    return request.get("/work")
}

/** 根据ID删除作品
 * @param id
 */
export function deleteWorkServer (id) {
    return request.delete(`/activity?id=${id}`)
}
