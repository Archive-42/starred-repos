// This file is auto-generated by the "tsproxygen.exe" tool. Manual modification is not recommended.
import type UpdateUserConfigurationJsonRequest from '../contract/UpdateUserConfigurationJsonRequest';

export default function updateUserConfigurationJsonRequest(
    data: UpdateUserConfigurationJsonRequest
): UpdateUserConfigurationJsonRequest {
    let result: UpdateUserConfigurationJsonRequest = {
        __type: 'UpdateUserConfigurationJsonRequest:#Exchange',
        ...data,
    };

    return result;
}
