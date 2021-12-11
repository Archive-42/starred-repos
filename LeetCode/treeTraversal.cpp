#include <iostream>
#include <vector>
#include <stack>
#include <queue>
#include "TreeNode.h"
using std::vector;
using std::stack;
using std::queue;
using std::cout;
using std::endl;

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

    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        vector<int> sub;
        queue<TreeNode*> q;
        if (!root)
            return res;
        q.push(root);
        q.push(nullptr);

        while (!q.empty()){
            TreeNode* cur = q.front();
            if (cur == nullptr){
                res.push_back(sub);
                sub.clear();
                if (q.size() == 1)
                    break;
                q.pop();
                q.push(nullptr);
            } else{
                sub.push_back(cur->val);
//                cout << cur->val << endl;
                q.pop();
                if (cur->left)
                    q.push(cur->left);
                if (cur->right)
                    q.push(cur->right);
            }//else
        }//while
        return res;
    }

    vector<int> postorderTraversal(TreeNode* root){
        vector<int> result;
        TreeNode* p = root;
        TreeNode* last = nullptr;
        stack<TreeNode*> tStack;
        while (p || !tStack.empty()){
            if (p){
                tStack.push(p);
                p = p->left;
            } else {
                TreeNode* top = tStack.top();
                if (top->right != nullptr && top->right != last){ //important
                    p = top->right;
                } else {
                    last = top;
                    result.push_back(top->val);
                    tStack.pop();
                }
            }
        }//while
        return result;
    }


//    sub.push_back(root->val);
//        res.push_back(sub);
//
//        if (cur->left){
//            sub.push_back(cur->left->val);
//            res.push_back(sub);
//        }
//
//        if (cur->right){
//            sub.push_back(cur->right->val);
//            res.push_back(sub);
//        }
//
//        if (cur->left->left){
//            sub.push_back(cur->left->left->val);
//            res.push_back(sub);
//        }
//
//        if (cur->right->right){
//            sub.push_back(cur->right->right->val);
//            res.push_back(sub);
//        }



    //
//            while (p){
//                tStack.push(p);
//                p = p->left;
//            }//while
//            p = tStack.top();
//
//            p = p->right;
//            if (!p){
//                result.push_back(tStack.top()->val);
//                tStack.pop();
//            } else if (p->left == nullptr && p->right == nullptr)
//                while (p == tStack.top()->right || p == tStack.top()->left){
//                    p = tStack.top();
//                    result.push_back(tStack.top()->val);
//                    cout<< tStack.top()->val << endl;
//                    tStack.pop();
//                }


    //
//            if (p == nullptr){
//                result.push_back(tStack.top()->val);
//                tStack.pop();
//            } else if (p == tStack.top()->right){
//                result.push_back(tStack.top()->val);
//                tStack.pop();
//            }else

//    if (p->right == nullptr){
//        result.push_back(p->val);
//        cout << p->val << endl;
//        tStack.pop();
//        if (p == tStack.top()->left){
////                    p = tStack.top()->right;
//        } else {
//            result.push_back(tStack.top()->val);
//            cout << tStack.top()->val << endl;
//            tStack.pop();
//        }
//    }//if

//            if (p->right == nullptr){
//                result.push_back(tStack.top()->val);
//                tStack.pop();
//                while (!tStack.empty() && tStack.top()->right == p){
//                    p = tStack.top();
//                    result.push_back(tStack.top()->val);
//                    tStack.pop();
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> result;
        stack<TreeNode *> tStack;
        TreeNode *p = root;

        while (p || !tStack.empty()) {
            while (p) { //找到左侧子树最下方节点，并把路径节点压入栈
                tStack.push(p);
                p = p->left;
            }
            p = tStack.top();

            result.push_back(p->val);  //中序访问
            tStack.pop();

            p = p->right;

        }
        return result;
    }//inorder


//            if (p->right){
//                p = p->right;
//                tStack.push(p);
//            }else if (tStack.empty()){
//                break;
//            }
//            else if (tStack.top()->right){
//                p = tStack.top()->right;
//                result.push_back(tStack.top()->val);
//                tStack.pop();
//                tStack.push(p);
//            }

    vector<int> inorderTraversal2(TreeNode* root) {
        vector<int> result;
        TreeNode* p;
        stack<TreeNode*> tStack;
        tStack.push(root);

        while (!tStack.empty()){
            p = tStack.top();
//            result.push_back(p->val);
            if (p->right)
                tStack.push(p->right);

            if (p->left){
                tStack.push(p->left);
            } else{
//                p = tStack.top();
                result.push_back(p->val);
//                cout << p->val << endl;
                tStack.pop();
            }

        }
        return result;
    }

    vector<int> preorderTraversal(TreeNode* root){
        vector<int> result;
        if(!root)
            return result;
        TreeNode* p;
        stack<TreeNode*> tp_stack;
        tp_stack.push(root);

        while (!tp_stack.empty()){
            p = tp_stack.top();
            result.push_back(p->val);
            tp_stack.pop();
            if (p->right)
                tp_stack.push(p->right);
            if (p->left)
                tp_stack.push(p->left);
        }
        return result;
    }
};



int main() {
    TreeNode c(1), d(3), e(5);
    TreeNode b(2, &c, &d), a(4, &b, &e);
    Solution s;
    vector<vector<int>> result = s.levelOrder(&a);
    for (auto &n: result)
        for (auto &m: n)
            cout << m << std::endl;
    return 0;
}