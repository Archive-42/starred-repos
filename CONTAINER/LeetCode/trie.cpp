#include <iostream>
#include <vector>

using namespace std;// namespace std

class TrieNode {
public:
    char c;
    bool isend;
    vector<TrieNode*> children;

    TrieNode(char x): c(x), isend(false) {}

    TrieNode* subNode(char ch){
        if (!children.empty())
            for (auto child : children)
             if (child->c == ch)
                return child;
        return nullptr;
    }
};


class Trie {
public:
    /** Initialize your data structure here. */
    Trie() {
        root = new TrieNode(' ');
    }

    TrieNode* root;
    /** Inserts a word into the trie. */
    void insert(string word) {
        auto cur = root;
        for (auto c : word){
            auto child = cur->subNode(c);
            if (child != nullptr)
                cur = child;
            else {
                 TrieNode *newNode = new TrieNode(c);
                cur->children.push_back(newNode);
                cur = newNode;
            }
        }
        cur->isend = true;
    }

    /** Returns if the word is in the trie. */
    bool search(string word) {
        TrieNode* cur = root;
        for (int i = 1; i < word.size(); i++){
            cur = cur->subNode(word[i]);
            if (cur == nullptr)
                return false;
        }
        return cur->isend == true;
    }

    /** Returns if there is any word in the trie that starts with the given prefix. */
    bool startsWith(string prefix) {
        auto cur = root;
        for (auto ch : prefix){
            if (cur->subNode(ch) != nullptr){
                cur = cur->subNode(ch);
            } else {
                return false;
            }
        }
        return true;
    }
};

/**
 * Your Trie object will be instantiated and called as such:
 * Trie obj = new Trie();
 * obj.insert(word);
 * bool param_2 = obj.search(word);
 * bool param_3 = obj.startsWith(prefix);
 */
