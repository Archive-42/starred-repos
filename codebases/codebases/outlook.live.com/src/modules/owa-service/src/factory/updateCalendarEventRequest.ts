// This file is auto-generated by the "tsproxygen.exe" tool. Manual modification is not recommended.
import type UpdateCalendarEventRequest from '../contract/UpdateCalendarEventRequest';

export default function updateCalendarEventRequest(
    data: UpdateCalendarEventRequest
): UpdateCalendarEventRequest {
    let result: UpdateCalendarEventRequest = {
        __type: 'UpdateCalendarEventRequest:#Exchange',
        ...data,
    };

    return result;
}
