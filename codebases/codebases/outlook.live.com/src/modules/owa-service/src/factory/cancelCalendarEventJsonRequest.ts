// This file is auto-generated by the "tsproxygen.exe" tool. Manual modification is not recommended.
import type CancelCalendarEventJsonRequest from '../contract/CancelCalendarEventJsonRequest';

export default function cancelCalendarEventJsonRequest(
    data: CancelCalendarEventJsonRequest
): CancelCalendarEventJsonRequest {
    let result: CancelCalendarEventJsonRequest = {
        __type: 'CancelCalendarEventJsonRequest:#Exchange',
        ...data,
    };

    return result;
}
