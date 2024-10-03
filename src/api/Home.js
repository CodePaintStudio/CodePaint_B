import request from "../utils/request.js";

export function getLookCountServer () {
    return request.get("/count/getCount");
}


export function getBlogCountServer () {
    return  request.get("/count/articleCount");
}
export function getActivityCountServer () {
    return request.get("/count/activityCount");
}

export function getWorkCountServer () {
    return request.get("/count/workCount");
}
