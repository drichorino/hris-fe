import Request from '../base'
import { SuccessResponse, FailResponse, success, fail } from '../response'

class AccountAPI {
    static async login<T>(payload: any): Promise<SuccessResponse<T> | FailResponse<T>> {
        return Request.POST({
            slug: 'user/auth/',
            payload: payload,
            headers: {},
            success: data => success(data),
            fail: err => fail(err)
        });
    }
}

export default AccountAPI