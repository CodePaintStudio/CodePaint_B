import request from "../utils/request.js";

export function getLookCountServer () {
    return request.get("/count/getCount");
}
