import request from "../utils/request.js";

/** 获取博客列表
 * @returns {Promise<axios.AxiosResponse<any>>}
 */
export function getArticleListServer() {
    return request.get("/article")
}

/** 根据ID删除博客
 * @param id 博客ID
 */
export function deleteArticleServer(id) {
    return request.delete(`/article/${id}`)
}

/**
 * 获取博客类型
 */
export function getBlogTypeListServer() {
    return request.get("/article/typelist")
}

/**
 * 根据Id获取博客详情
 * @param id 文章ID
 */
export function getBlogDetailByIdServer(id) {
    return request.get(`/article/${id}`)
}

/** 根据关键字、作者、类型搜索
 * @param data
 */
export function searchBlogServer(data) {
    return request.get(`/article/list/?keyWord=${data.keyWord || ''}&type=${data.type || ''}&author=${data.author || ''}&page=${data.page || ''}&pageSize=${data.pageSize || ''}`)
}
