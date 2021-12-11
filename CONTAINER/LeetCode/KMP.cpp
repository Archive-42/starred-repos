//
// Created by admin on 2018/10/25.
//
#include <iostream>
#include <string>
#include <vector>

using namespace std;

class KMP {
public:
    int strStr(string haystack, string needle) {
        vector<int> lps = generator(needle);
        int j = 0;
        for (int i = 0; i < haystack.size(); ) {
            if (haystack[i] == needle[j]){
                i++, j++;
            } else {
                if (j == 0)
                    i++;
                else
                    j = lps[j - 1];
            }
            if (j == needle.size()){
                cout << "i = " << i << "j == " << j << endl;
                return i - j;}
        }//for
        return -1;
    }

    vector<int> generator(string pattern){
        vector<int> lps(pattern.size());
        lps[0] = 0;
        int len = 0;
        for (int i = 1; i < pattern.size(); ) {
            if (pattern[i] == pattern[len]){
                len++;
                lps[i] = len;
                i++;
            } else {
                if (len > 0)
                    len = lps[len - 1];
                else{
                    len = 0; i++;
                }//else
            }//else
        }//for
        for (int a : lps)
            cout << a << " ";
        cout << endl;
        return lps;
    }

};
