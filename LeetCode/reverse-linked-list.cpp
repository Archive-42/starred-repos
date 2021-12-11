//
// Created by admin on 2018/10/25.
//

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
#include "TreeNode.h"
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        if (!head)
            return nullptr;
        ListNode *pre = nullptr, *cur = head, *nxt;

        while (cur){
            nxt = cur->next;
            cur->next = pre;
            pre = cur;
            cur = nxt;
        }
        return pre;
    }

    ListNode* reverseList2(ListNode* head) {
        if (!head || !head->next)
            return head;
        ListNode* tail = head->next;
        head->next = nullptr;
        return help(head, tail);
    }

    ListNode* help(ListNode* head, ListNode* tail){
        ListNode* next = tail->next;
        tail->next = head;
        if (!next)
            return tail;
        return help(tail, next);
    }

    ListNode* reverseList3(ListNode* head) {
        if (!head || !head->next)
            return head;
        ListNode* p = reverseList(head->next);
        head->next->next = head;
        head->next = nullptr;
        return p;
    }
};