//
// Created by admin on 2018/10/30.
//
#include <utility>
#include "TreeNode.h"
#include <algorithm>
#include <queue>

using namespace std;

class Solution {
public:
    int minDepth_dfs(TreeNode *root) {
        if (!root)
            return 0;
        if (!root->left)
            return 1 + minDepth_dfs(root->right);
        if (!root->right)
            return 1 + minDepth_dfs(root->left);
        return min(minDepth_dfs(root->left), minDepth_dfs(root->right)) + 1;
    }

    int minDepth_bfs(TreeNode *root){
        if (!root)
            return 0;
        queue<pair<TreeNode*, int>> q;
        q.push(pair<TreeNode*, int>{root, 1});
        while (!q.empty()){
            TreeNode* node = q.front().first;
            int dep = q.front().second;
            q.pop();
            if (!node->left && !node->right)
                return dep;
            if (node->left)
                q.push(pair<TreeNode*, int>{node->left, dep + 1});
            if (node->right)
                q.push(pair<TreeNode*, int>{node->right, dep + 1});
        }
    }
};