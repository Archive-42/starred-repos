// This file is auto-generated by the "tsproxygen.exe" tool. Manual modification is not recommended.
import type GetConversationItemsJsonRequest from '../contract/GetConversationItemsJsonRequest';

export default function getConversationItemsJsonRequest(
    data: GetConversationItemsJsonRequest
): GetConversationItemsJsonRequest {
    let result: GetConversationItemsJsonRequest = {
        __type: 'GetConversationItemsJsonRequest:#Exchange',
        ...data,
    };

    return result;
}
