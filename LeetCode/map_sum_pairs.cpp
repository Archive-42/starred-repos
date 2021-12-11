
class TrieNode {
public:
    unordered_map<char, TrieNode*> children;
    int score = 0;
    char ch;
    TrieNode(char c, int val): ch(c), score(val) {}
    TrieNode* sub(char ch){
        return children.find(ch) == children.end() ? nullptr : children[ch];
    }
};

class MapSum {
public:
    TrieNode *root;
    unordered_map<string, int> map;
    /** Initialize your data structure here. */
    MapSum() {
        root = new TrieNode(' ', 0);
    }

    void insert(string key, int val) {
        auto cur = root;
        for (char ch : key){
            auto child = cur->sub(ch);
            if (!child){
                child = cur->children[ch] = new TrieNode(ch, 0);
            }
            cur = child;
        }
        cur->score = val;
    }

    int sum(string prefix) {
       auto cur = root;
       int sum = 0;

       for (char ch : prefix){
           auto child = cur->sub(ch);
           if (child == nullptr){
               return 0;
           }
           cur = child;
       }
        sum += traverse(cur);
       return sum;
    }

    int traverse(TrieNode* node){
        if (node == nullptr)
            return 0;
        int sum = 0;
        sum += node->score;
        for (auto it : node->children){
            sum += traverse(it.second);
        }
        return sum;
    }
};

/**
 * Your MapSum object will be instantiated and called as such:
 * MapSum obj = new MapSum();
 * obj.insert(key,val);
 * int param_2 = obj.sum(prefix);
 */
