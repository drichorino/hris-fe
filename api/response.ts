export interface SuccessResponse<T> {
    payload: T
}

export interface FailResponse<T> {
    error_code: number
    payload: T
}

export const success = <T>(payload: T): SuccessResponse<T> => {
    return {
        payload: payload
    }
}

export const fail = <T>(
    payload: T,
    error_code: number = 400
): FailResponse<T> => {
    return {
        error_code: error_code,
        payload: payload
    }
}
