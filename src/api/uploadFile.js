import {baseURL} from "../utils/baseURL.js";

/**
 * 上传文件的接口
 */
export async function uploadFileServer(file) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(`${baseURL}/upload/photo`, {
            method: 'POST',
            body: formData
        });

        return response.json();
    } catch (error) {
        return error;
    }
}
