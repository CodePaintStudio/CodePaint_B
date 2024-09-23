import request from "../utils/request.js";

/** 获取互动列表
 * @param data 分页信息
 */
export function getActivitiesServer(data) {
    return request.get('/activity', {
        page: data?.page,
        pageSize: data?.pageSize,
    });
}

/** 根据ID删除活动
 * @param id 要删除的作品的id
 */
export function deleteActivitiesServer (id) {
    return request.delete(`/activity?id=${id}`)
}

/** 根据ID获取文章详情
 * @param id
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getActivityByIdServer (id) {
    return request.get(`/activity/detail?id=${id}`)
}
