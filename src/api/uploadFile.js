/**
 * 上传文件的接口
 */
export async function uploadFileServer(file) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch('http://8.137.124.251:4399/upload', {
            method: 'POST',
            body: formData
        });

        return response.json();
    } catch (error) {
        return error;
    }
}
