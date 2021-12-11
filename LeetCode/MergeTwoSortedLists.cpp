//
// Created by admin on 2018/10/17.
//
#include "TreeNode.h"
#include <string>
using namespace std;

class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        auto *root = new ListNode(0), *p = root;
        while (l1 && l2){

            if (l1->val < l2->val){
                p->next = new ListNode(l1->val);
                p = p->next;
                l1 = l1->next;
            } else {
                l2 = l2->next;
                p->next = new ListNode(l2->val);
                p = p->next;
            }
        }//while

        while (l1){
            p->next = new ListNode(l1->val);
            p = p->next;
            l1 = l1->next;
        }//while

        while (l2){
            p->next = new ListNode(l2->val);
            p = p->next;
            l2 = l2->next;
        }//while

        return root->next;
    }

    int strStr(string haystack, string needle) {
        if (haystack.empty() || needle.empty())
            return -1;
        int h = haystack.length(), n = needle.length();
        for (int i = 0; i < h - n; ++i) {
            if (haystack[i] == needle.front()){
                int j = 0;
                for (; j < n && haystack[i + j] == needle[j]; ++j)
                    ;
                if (j == n)
                    return i;
            }
        }
        return -1;
    }
};