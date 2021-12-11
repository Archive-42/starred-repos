//
// Created by admin on 2018/10/20.
//
#include <string>
#include <map>
#include <vector>
#include <iostream>
//#include <ntdef.h>
//#include <commctrl.h>

using std::vector;
using std::string;
using std::map;

class Solution {
public:
    int lengthOfLongestSubstring1(string s) {
        int len = static_cast<int>(s.length());

        bool flag = true;
        while (flag) {
            flag = false;
            for (int i = 0; i < len - 1; ++i) {
                if (s[i] == s[i + 1]) {
                    // swap i+1 and last
                    s[i + 1] = s[len - 1];
                    len--;
                    flag = true;
                }//if
            }//for
        }//while
        return len;
    }

    int lengthOfLongestSubstring2(string s){
        vector<int> charIndex(256, -1);
        int len = 0;
        for (int i = 0; i < s.length(); i++){
            if (charIndex[s[i]] == -1){
                charIndex[s[i]] = 1;
                len++;
            }
        }
        return len;
    }

    int lengthOfLongestSubstring(string s) {
        int len = 0, m = 0;
        vector<int> dict(256, -1);
        for (int i = 0; i < s.size(); ++i) {
            m = __max(m, dict[s[i]] + 1);
            dict[s[i]] = i;
            len = __max(len, i - m + 1);
        }
        return len;
    }
};

