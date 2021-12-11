//
// Created by admin on 2018/10/17.
//
#include <stack>
struct ListNode {
    int val;
    ListNode *next;

    explicit ListNode(int x) : val(x), next(nullptr) {}
};

class Solution {
public:
    bool isPalindrome(ListNode* head) {
        if (!head || !head->next){
            return true;
        }
        ListNode *l = head, *r = head->next;
        std::stack<int> s;
        while (l->val != r->val){
            s.push(l->val);
            r = r->next;
            if (!r || r->val == l->val){
                s.pop();
                break;
            }
            l = l->next;
        }//while
        s.push(l->val);
        if (r->next->val == l->val)
            r = r->next;
        return checker(s, r);
    }

    bool checker(std::stack<int>& s, ListNode *p){

        if (p == nullptr && !s.empty())
            return false;
        while (p && !s.empty() && s.top() == p->val){
            p = p->next;
            s.pop();
        }
        return s.empty() && !p;
    }

};
