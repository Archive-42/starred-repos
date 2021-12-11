//
// Created by admin on 2018/10/19.
//
#include <iostream>
#include <vector>
using namespace std;

int removeDuplicates2(int* nums, int numsSize) { //wrong
    if (numsSize <= 0){
        return 0;
    }

    for (int i = 0; i < numsSize - 1; i++){
        for (int j = i + 1; j < numsSize; ++j) {
            if (nums[i] == nums[j]){
                nums[j] = nums[numsSize - 1];
                printf("put %d to last one, numSize = %d now\n", nums[j], numsSize);
                j--;
                numsSize--;
            } else if (nums[i] < nums[j]){
                continue;
            } else {
                
            }
        }//for
    }//for
    return numsSize;
}

int removeDuplicates1(int* nums, int numsSize) { //wrong
    if (numsSize <= 0) {
        return 0;
    }
    bool flag = true;
    while (flag) {
        flag = false;
        for (int i = 0; i < numsSize - 1; i++) {
            if (nums[i + 1] < nums[i]){ //bubble
                int temp = nums[i + 1];
                nums[i + 1] = nums[i];
                nums[i] = temp;
                printf("swap %d and %d \n", nums[i], nums[i+1]);
                flag = true;
            } else if (nums[i] == nums[i + 1]){
                nums[i + 1] = nums[numsSize - 1];
                numsSize--;
                i--;
                printf("put %d to last one, numSize = %d now\n", nums[i+1], numsSize);
            }
        }//for
    }
    return numsSize;
}

int removeDuplicates3(int* nums, int numsSize){ //wrong
    int count = 0;
    for (int i = 0; i < numsSize - count; ++i) {
        if (nums[i] == nums[1 + count + i]) {
            count++;
            nums[i] = nums[i + count];
        }
    }
    return numsSize - count;
}

int removeDuplicates(int* nums, int numsSize){ //correct
    int count = 0;
    for (int i = 1; i < numsSize; ++i) {
        if (nums[i] == nums[i - 1]){
            count++;
        } else {
            nums[i - count] = nums[i];
        }
    }
    return numsSize - count;
}


class Solution {
public:
    int removeDuplicates1(vector<int>& nums) { //wrong
        int count = 0;
        for (int i = 2; i < nums.size(); ++i) {
            if (nums[i] == nums[i - 1] == nums[i - 2]){ //Oh! Ordered! Just compare the first and third!
                count++;
            } else {
                nums[i - 2 - count] = nums[i - 2];
                nums[i - 1 - count] = nums[i - 1];
                nums[i - count] = nums[i];
            }
        }
        return nums.size() - count;
    }

    int removeDuplicates(vector<int>& nums){
        if (nums.size() <= 2)
            return nums.size();
        int count = 0;
        for (int i = 2; i < nums.size(); ++i) {
            if (nums[i] == nums[i - 2 - count]){
                count++;
            } else {
                nums[i - count] = nums[i];
            }
        }
        for (int j = 0; j < nums.size() - count; ++j) {
            cout << nums[j] << "," ;
        }
        cout << endl;
        return nums.size() - count;
    }
};

//int main(){
//    Solution s;
//    vector<int> a{1,1,1,1,2,2,2,3,3,5};
//    cout << s.removeDuplicates(a) << endl;
//    return 0;
//}