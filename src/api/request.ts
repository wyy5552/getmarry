import userUserStore from '@/store/modules/user/useUserStore';


// 封装uni-app的网络请求
const baseUrl = 'http://localhost:3000/';
type RspType<T extends any> = {
    code: number,
    message: string,
    data: T
}
const request = <T extends any>(url: string, data: any = null, method: any = "GET"): Promise<RspType<T>> => {
    const userStore = userUserStore();
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + url,
            method,
            header: {
                token: userStore.token
            },
            data,
            success: (res) => {
                if (res.statusCode != 200) {
                    reject(res);
                } else {
                    resolve(res.data as RspType<T>);
                }
            },
            fail: (fail) => {
                reject(fail);
            },
        });
    });
}
const get = <T extends any>(url: string, data: any = null) => {
    return request<T>(url, data, "GET");
}
const post = <T extends any>(url: string, data: any = null) => {
    return request<T>(url, data, "POST");
}
export default {
    get,
    post
}