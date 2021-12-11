//
// Created by admin on 2018/10/20.
//
#include "TreeNode.h"
#include <queue>
#include <iostream>

using namespace std;
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}
 * };
 */
class Codec {
public:

    // Encodes a tree to a single string.
    string serialize(TreeNode* root) {
        if (!root)
            return "#";
        return to_string(root->val) + serialize(root->left) + serialize(root->right);
    }

    // Decodes your encoded data to tree.
    TreeNode* deserialize(string data) {
        return generator(data);
    }

    TreeNode* generator(string &data){
        if (data.front() == '#'){
            if (data.size() > 1)
                return nullptr;
            data = data.substr(2);
        } else {
            auto node = new TreeNode(getNumber(data));
            node->left = generator(data);
            node->right = generator(data);
        }
    }

private:
    int getNumber(string &data){
        unsigned long long pos = (data.find(','));
        int val = stoi(data.substr(0, pos));
        data = data.substr(pos + 1);
        return val;
    }
};

// Your Codec object will be instantiated and called as such:
// Codec codec;
// codec.deserialize(codec.serialize(root));

