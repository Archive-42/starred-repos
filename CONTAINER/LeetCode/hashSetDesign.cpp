//
// Created by admin on 2018/11/9.
//
#include <unordered_set>
#include "dependence.h"

class MyHashSet {
public:
    /** Initialize your data structure here. */
    MyHashSet() {
        buckets = 1000;
        size = 1000;
        table = vector<vector<bool>>(buckets, vector<bool>{});
    }

    int hash(int key){
        return key % buckets;
    }

    int pos(int key){
        return key / buckets;
    }

    void add(int key) {
        int hashKey = hash(key);
        if (table[hashKey].empty())
            table[hashKey] = vector<bool>(size, false);
        table[hashKey][pos(key)] = true;
    }

    void remove(int key) {
        int hashKey = hash(key);
        if (table[hashKey].empty())
            return;
        table[hashKey][pos(key)] = false;
    }

    /** Returns true if this set contains the specified element */
    bool contains(int key) {
        return table[hash(key)].empty() ? false : table[hash(key)][pos(key)];
    }

private:
    int buckets, size;
    vector<vector<bool>> table;
};

/**
 * Your MyHashSet object will be instantiated and called as such:
 * MyHashSet obj = new MyHashSet();
 * obj.add(key);
 * obj.remove(key);
 * bool param_3 = obj.contains(key);
 */

class MyHashMap {
public:
    /** Initialize your data structure here. */
    MyHashMap() {

    }

    /** value will always be non-negative. */
    void put(int key, int value) {cout << "put" << endl;
        if (key > table.size() - 1)
            table.resize(key + 1, -1);
        table[key] = value;


    }

    /** Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key */
    int get(int key) {
        if (key > table.size() - 1)
            return -1;
        return table[key];
        cout << "get" << endl;

    }

    /** Removes the mapping of the specified value key if this map contains a mapping for the key */
    void remove(int key) {
        if (key < table.size())
            table[key] = -1;
        cout << "remove" << endl;
    }

private:
    vector<int> table{};
};

/**
 * Your MyHashMap object will be instantiated and called as such:
 * MyHashMap obj = new MyHashMap();
 * obj.put(key,value);
 * int param_2 = obj.get(key);
 * obj.remove(key);
 */
int singleNumber(vector<int>& nums) {
    unordered_set<int> s;
    for (int e : nums){
        if (s.count(e) <= 0)
            s.insert(e);
        else
            s.erase(e);
    }
    return *s.begin();
}

int main(){
    vector<int> a{};
    a.resize(1, -1);
    cout << a.front();
}