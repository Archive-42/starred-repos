//
// Created by admin on 2018/10/13.
//
#include <iostream>
#include <vector>
#include <algorithm>
#include "TreeNode.h"

using namespace std;

class Codec {
public:

    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        if (!root)
            return "[]";
        string a{};
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {

    }
};


class Solution{
public:
    int maxDepth(TreeNode* root) {
        if (!root)
            return 0;
        return std::max(maxDepth(root->right), maxDepth(root->left)) + 1;
    }

    bool isSymmetric(TreeNode* root) {
        if (!root)
            return true;
        else
            return isMirror(root->left, root->right);
    }

    bool hasPathSum(TreeNode* root, int sum) {
        if (root == nullptr){
            return false;
        }
        if (root->val == sum && !root->right && !root->left)
            return true;
        bool left = hasPathSum(root->left, sum - root->val);
        bool right = hasPathSum(root->right, sum - root->val);
        return left || right;
    }

    TreeNode* buildTree(vector<int>& inorder, vector<int>& postorder) {
        return helper(inorder, 0, inorder.size(), postorder, 0, postorder.size());
    }

    TreeNode* buildTree2(vector<int>& preorder, vector<int>& inorder) {
        if (preorder.empty() || inorder.empty())
            return nullptr;
        return helper2(preorder, 0, preorder.size(), inorder, 0, inorder.size());
    }

    void connect(TreeLinkNode *root) {
        if (!root)
            return;
        linker(root->left, root->right);
    }
    void connect2(TreeLinkNode *root) {
        if (!root)
            return;
        TreeLinkNode *head = nullptr; //leader of next level
        TreeLinkNode *pre = nullptr;
        TreeLinkNode *cur = root;
        while (cur){

            while (cur){
                if (cur->left){
                    if (!pre){
                        head = cur->left;
                    } else {
                        pre->next = cur->left;
                    }//else
                    pre = cur->left;
                }//if

                if (cur->right){
                    if (!pre){
                        head = cur->right;
                    } else {
                        pre->next = cur->right;
                    }//else
                    pre = cur->right;
                }//if
                cur = cur->next;
            }//while
            cur = head;
            head = nullptr;
            pre = nullptr;
        }//while
    }

    TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
        if (!root || root == p || root == q)
            return root;
        TreeNode* left = lowestCommonAncestor(root->left, p, q);
        TreeNode* right = lowestCommonAncestor(root->right, p, q);
        return !left ? right : !right ? left : root;
    }
    TreeNode* lowestCommonAncestor2(TreeNode* root, TreeNode* p, TreeNode* q){
        TreeNode *res = nullptr;
        helper(root, p, q, &res);
        return res;
    }

private:
    vector<TreeLinkNode*> children;
    int i{};
    bool helper(TreeNode* root, TreeNode *p, TreeNode *q, TreeNode **res);
    TreeNode* helper2(vector<int> & preorder, int pi, int pj, vector<int>& inorder, int ii, int ij);
    TreeNode* helper(vector<int> &inorder, int infront, int intail, vector<int> &postorder, int posfront, int postail);
    bool isMirror(TreeNode* left, TreeNode* right);
    void linker(TreeLinkNode* left, TreeLinkNode* right);
    void linker2(TreeLinkNode* lf, TreeLinkNode* rt);

};



TreeNode* Solution::helper2(vector<int> & preorder, int pi, int pj, vector<int>& inorder, int ii, int ij){
    cout << "prehead, pretail = " << pi << "    " << pj << endl;
    cout << "inhead, intail = " << ii  << "    "<< ij << endl;

    if ( pi == pj || ii == ij)
        return nullptr;

    int head = preorder[pi];
    cout << "head = " << head << endl;
    auto* root = new TreeNode(head);

    if (pi == pj - 1 || ii == ij - 1){
        cout << "pi = pj - 1, so return node: " << head << endl;
        return root;
    }
    auto index = find(inorder.begin() + ii, inorder.begin() + ij, head);
    auto span = index - inorder.begin() - ii;
    cout << "span = " << span << endl;

    cout << head << "'s left node" << endl;
    root->left = helper2(preorder, pi + 1, span + pi + 1, inorder, ii, ii + span);
    cout << head << "'s right node" << endl;
    root->right = helper2(preorder, pi + span + 1, pj, inorder, ii + span + 1, ij);
    cout << "return root: " << head << endl;
    return root;
}


TreeNode* Solution::helper(vector<int> &inorder, int infront, int intail, vector<int> &postorder, int posfront, int postail){
    if (infront == intail || posfront == postail)
        return nullptr;
    int mid = postorder[postail - 1]; //the last node is root
    auto index = find(inorder.begin() + infront, inorder.begin() + intail, mid); //find index of root
    auto dis = index - inorder.begin() - infront;
    auto* root = new TreeNode(mid);

    root -> left = helper(inorder, infront, static_cast<int>(infront + dis), postorder, posfront,
                          static_cast<int>(posfront + dis));
    root -> right = helper(inorder, static_cast<int>(infront + dis + 1), intail, postorder,
                           static_cast<int>(posfront + dis), postail - 1);
    return root;
}

bool Solution::isMirror(TreeNode* left, TreeNode* right){
    if (left == nullptr && right == nullptr)
        return true;
    if (!left || !right)
        return false;

    if (left->val == right->val){
        bool inPair = isMirror(left->right, right->left);
        bool outPair = isMirror(right->right, left->left);
        return inPair && outPair;
    } else {
        return false;
    }
}

void Solution::linker(TreeLinkNode *left, TreeLinkNode *right) {
    if (!left || !right)
        return;
    left->next = right;
    linker(left->left, left->right);
    linker(left->right, right->left);
    linker(right->left, right->right);
}

void Solution::linker2(TreeLinkNode *lf, TreeLinkNode *rt){

    if (!lf && !rt) //both empty
        return;
    if (!lf){ //left is empty
        linker2(rt->left, rt->right);
        return;
    }
    if (!rt){ //right is empty
        linker2(lf->left, lf->right);
        return;
    }
    // lf and rt neither empty now
    lf->next = rt;
    linker2(lf->left, lf->right);
    linker2(lf->right, rt->left);
    linker2(rt->left, rt->right);

    children.clear();
    children.push_back(lf->left);
    children.push_back(lf->right);
    children.push_back(rt->left);
    children.push_back(rt->right);
    for (i = 0; i < 4; ++i) {

        if (children[i]){
            for (int j = i; j < 4; ++j){
                if (children[j]){
                    children[i]->next = children[j];
                    i = j;
                }//if
            }//for
        }//if
    }//for

}

bool Solution::helper(TreeNode *root, TreeNode *p, TreeNode *q, TreeNode **res) {
    if (!root)
        return false;
    if (res)
        return false;
    int fount = (root == q || root == p);
    fount += helper(root->left, p, q, res);
    fount += helper(root->right, p, q, res);
    if (fount == 2){
        *res = root;
        return false;
    } else {
        return fount > 0;
    }
}

int main() {
//    TreeNode c(2), d(3), e(1);
//    TreeNode b(2, &c, &d);
//    TreeNode a(4, &c, &e);
    Solution s;
//    cout << s.maxDepth(&a) << endl;
//    cout << s.isSymmetric(&a) << endl;
//    cout << s.hasPathSum(&a, 6) << endl;
    vector<int> a {1,2};
    vector<int> b {2, 1};
    s.buildTree2(a, b);
    return 0;
}