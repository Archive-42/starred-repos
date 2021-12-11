//
// Created by admin on 2018/10/23.
//
#include "TreeNode.h"

/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        if (!p && !q)
            return true;
        if (!p)
            return false;
        if (!q)
            return false;

        if (q->val != p->val)
            return false;
        else{
            bool left = isSameTree(p->left, q->left);
            bool right = isSameTree(p->right, q->right);
            return left && right;
        }
    }
};
