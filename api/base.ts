import axios from 'axios'
import config from '@/nuxt.config'
import { SuccessResponse, FailResponse, success, fail } from './response'

axios.defaults.withCredentials = true

interface RequestParams {
    slug: string
    payload?: any
    config?: any
    headers?: any
    success: (data: any) => void
    fail: (error: any) => void
}

class Request {
    static async POST<T>(
        params: RequestParams
    ): Promise<SuccessResponse<T> | FailResponse<T>> {
        const url = `${config.host.api_host}/${params.slug}`
        return new Promise((resolve, reject) => {
            axios.post(url, params.payload, {
                ...params.config
            })
            .then(response => {
                const result: SuccessResponse<T> = success(response.data);
                resolve(result);
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    const errorCode = err.response.status;
                    const errorResult: FailResponse<T> = fail(err.response.data, errorCode);
                    resolve(errorResult);
                } else {                    
                    const networkError: FailResponse<string> = fail<string>('Network error or no response from server.', 500);
                    reject(networkError);
                }
            });
        });
    }

    static async GET<T>(params: RequestParams): Promise<SuccessResponse<T> | FailResponse<any>> {
        const queryString = new URLSearchParams(params.payload).toString();
        const url = `${config.host.api_host}/${params.slug}?${queryString}`;
        return new Promise((resolve, reject) => {
            axios.get(url, {...params.config})
            .then(response => {
                const result: SuccessResponse<T> = success(response.data);
                resolve(result);
            })
            .catch(err => {
                if (err.response && err.response.data) {
                    const errorCode = err.response.status;
                    const errorResult: FailResponse<T> = fail(err.response.data, errorCode);
                    resolve(errorResult);
                } else {                    
                    const networkError: FailResponse<string> = fail<string>('Network error or no response from server.', 500);
                    reject(networkError);
                }
            });
        });
    }
}

export default Request
