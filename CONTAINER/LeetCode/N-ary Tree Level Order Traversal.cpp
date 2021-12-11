//
// Created by admin on 2018/10/20.
//
#include <vector>
#include <queue>

using namespace std;

class Node {
public:
    int val = 0;
    vector<Node*> children;

    Node() {}

    Node(int _val, vector<Node*> _children) {
        val = _val;
        children = _children;
    }
};

class Solution {
public:
    vector<vector<int>> levelOrder(Node* root) {
        if (!root)
            return vector<vector<int>>();
        queue<Node*> q;
        vector<vector<int>> res;
        q.push(root);

        while (q.front() != nullptr){
            int len = static_cast<int>(q.size());
            vector<int> level;

            for (int i = 0; i < len; ++i) {
                Node* cur = q.front();
                level.push_back(cur->val);
                q.pop();
                for (auto& ch : cur->children)
                    q.push(ch);
            }
            res.push_back(level);
        }
        return res;
    }
};