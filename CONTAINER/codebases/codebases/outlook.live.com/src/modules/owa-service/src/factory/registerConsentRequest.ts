// This file is auto-generated by the "tsproxygen.exe" tool. Manual modification is not recommended.
import type RegisterConsentRequest from '../contract/RegisterConsentRequest';

export default function registerConsentRequest(
    data: RegisterConsentRequest
): RegisterConsentRequest {
    let result: RegisterConsentRequest = {
        __type: 'RegisterConsentRequest:#Exchange',
        ...data,
    };

    return result;
}
