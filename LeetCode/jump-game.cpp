//
// Created by admin on 2018/10/21.
//

#include <stdio.h>
#include <stdbool.h>
#include <intrin.h>
#include <vector>
#include <iostream>
using namespace std;

class Solution2 {
        public:

        bool twoCompare(int *start, int *former, int *latter, int step){
            if (former == start){
                return *former >= latter - former;
            }
            if (*former < step){
                return twoCompare(start, former - 1, latter, step + 1);
            } else {
                return twoCompare(start, former - 1, former, 1);
            }
        }

        bool canJump(int* nums, int numsSize) {
            if (numsSize == 1)
                return true;
            return twoCompare(nums, nums + numsSize - 2, nums + numsSize - 1, 1);
        }
};

bool twoCompare(int *start, int *former, int *latter, int step){
    if (former == start){
//        printf("%d\n", step);
        return *former >= latter - former;
    }
    if (*former < step){
        return twoCompare(start, former - 1, latter, step + 1);
    } else {
        return twoCompare(start, former - 1, former, 1);
    }
}

bool canJump(int* nums, int numsSize) {
    if (numsSize == 1)
        return true;
    return twoCompare(nums, nums + numsSize - 2, nums + numsSize - 1, 1);
}

class Solution {
public:
    bool canJump(vector<int>& nums) {
        int i = 0;
        long long n = nums.size();
        for (int reach = 0; i < nums.size() && i < reach; ++i) {
            reach = max(reach, i + nums[i]);
        }
        return i == n;
    }

    vector<int> plusOne(vector<int>& digits) {
        for (auto i = digits.size() - 1; i >= 0; i--) {
            if (digits[i] == 9){
                digits[i] = 0;
            } else {
                digits[i]++;
                return digits;
            }
        }
        digits[0] = 1;
        digits.push_back(0);
        return digits;
    }
};

//int main(){
//    Solution s;
//    vector<int> a{1, 0};
//    for (auto b: s.plusOne(a))
//        cout << b << endl;
//    return 0;
//}