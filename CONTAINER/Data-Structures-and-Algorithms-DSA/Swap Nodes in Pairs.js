/* Given a linked list, swap every two adjacent nodes and return its head.

Input: head = [1,2,3,4]
Output: [2,1,4,3]
*/

var swapPairs = function(head) {
    if (!head) return null;
    if (!head.next) return head;

    let prev = null;
    const start = head.next;

    while (head && head.next) {
        const next = head.next;
        const secondNext = head.next.next;

        head.next = secondNext;
        next.next = head;

        if (prev)
            prev.next = next;

        prev = head;
        head = secondNext;
    }

    return start;
};
