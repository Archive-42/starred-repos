// This file is auto-generated by the "tsproxygen.exe" tool. Manual modification is not recommended.
import type TokenRequest from '../contract/TokenRequest';

export default function tokenRequest(data: TokenRequest): TokenRequest {
    let result: TokenRequest = {
        __type: 'TokenRequest:#Exchange',
        ...data,
    };

    return result;
}
