// This file is auto-generated by the "tsproxygen.exe" tool. Manual modification is not recommended.
import type RespondToCalendarEventJsonRequest from '../contract/RespondToCalendarEventJsonRequest';

export default function respondToCalendarEventJsonRequest(
    data: RespondToCalendarEventJsonRequest
): RespondToCalendarEventJsonRequest {
    let result: RespondToCalendarEventJsonRequest = {
        __type: 'RespondToCalendarEventJsonRequest:#Exchange',
        ...data,
    };

    return result;
}
