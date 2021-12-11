//
// Created by admin on 2018/10/17.
//
#include <stack>
#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        stack<char> m;
        for (auto c: s){
            switch (c){
                case '(':
                case '[':
                case '{':
                    m.push(c);
                    break;
                case '}':
                    if (m.empty() || m.top() != '{')
                        return false;
                    m.pop();
                case ']':
                    if (m.empty() || m.top() != ']')
                        return false;
                    m.pop();
                case ')':
                    if (m.empty() || m.top() != ')')
                        return false;
                    m.pop();
                default:break;
            }
            return m.empty();
        }
    }
};