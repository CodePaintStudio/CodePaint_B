import request from "../utils/request.js";

export function getArticleListServer () {
    return request.get("/article")
}

export function deleteArticleServer (id) {
    return request.delete(`/article/${id}`)
}

/**
 * 获取博客类型
 */
export function getBlogTypeListServer () {
    return request.get("/article/typelist")
}

/**
 * 根据Type获取文章
 */
export function getBlogListByTypeServer (type) {
    return request.get(`/article/type?type=${type}`)
}

/**
 * 根据Id获取博客详情
 */
export function getBlogDetailByIdServer (id) {
    return request.get(`/article/${id}`)
}