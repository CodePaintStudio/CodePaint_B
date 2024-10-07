import request from "../utils/request.js";

/**
 * 提交UI作品
 * @param {Object} uiData 博客数据，包括标题、内容、类型等
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function submitUiServer(uiData) {
    return request.post("/work", uiData)
}

/** 获取UI作品列表
 */
export function getWorkListServer() {
    return request.get("/work")
}

/** 根据ID删除作品
 * @param id
 */
export function deleteWorkServer(id) {
    return request.delete(`/work/${id}`)
}

/** 根据ID获取博客详情
 * @param id
 */
export function getWorkDetailServer(id) {
    return request.get(`/work/${id}`)
}

/** 根据标题关键字和作者搜索
 * @param data
 */
export function searchWorkServer(data) {
    return request.get(`/work/list?workTitle=${data.workTitle || ''}&workAuthor=${data.workAuthor || ''}&page=${data.page || ''}&pageSize=${data.pageSize || ''}`)
}
