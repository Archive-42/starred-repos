//
// Created by admin on 2018/10/27.
//
#include <iostream>
#include <vector>
using namespace std;

class BinarySearch {
public:
    int template1(vector<int> nums, int target){
        if (nums.empty())
            return -1;
        int left = 0, right = nums.size() - 1;
        while (left <= right){
            int mid = left + (left + right) / 2;
            if (nums[mid] == target)
                return mid;
            if (nums[mid] > target){
                right = mid - 1;
            } else{
                left = mid + 1;
            }
        }
        return -1;
    }

    int template2(vector<int> nums, int target){
        if (nums.empty())
            return -1;
        int left = 0, right = nums.size();
        while (left < right){
            int mid = left + (left + right) / 2;
            if (nums[mid] == target)
                return mid;
            if (nums[mid] > target){
                right = mid;
            } else{
                left = mid + 1;
            }
        }
        if (left != nums.size() && nums[left] == target)
            return left;
        return -1;
    }

};

class Solution {
public:

//        sorted in ascending order
//        You may assume no duplicate exists in the array.
//        Find the minimum element.
    int findMin(vector<int>& nums) { //correct
        if (nums.front() <= nums.back())
            return nums.front();
        int l = 0, r = nums.size() - 1;
        while (l < r){
            int mid = l + (r - l) / 2;
            if (nums[mid] > nums[r])
                l = mid + 1;
            else
                r = mid;
        }
        return l;
    }

    int findPeakElement(vector<int>& nums) { //iterative solution
        int l = 0, r = nums.size() - 1;
        while (l < r){
            int mid = l + (r - l) / 2;
            if (nums[mid] < nums[mid + 1])
                l = mid + 1;
            else
                r = mid;
        }
        return l;
    }
    int findPeakElement2(vector<int>& nums) { //cursive solution
        return search(nums, 0, nums.size() - 1);
    }
    int search(vector<int> nums, int l, int r){
        if (l == r)
            return l;
        int mid = l + (r - l) / 2;
        if (nums[mid] < nums[mid + 1]) //ascending
            return search(nums, mid + 1, r);
        else
            return search(nums, l, mid);
    }

    bool isIncrease(vector<int> nums, int any, int mid){
        /* if input left and return true, then you should change right to mid */
        return nums[mid] <= nums[(any + mid) / 2];
    }
    int findPeakElement1(vector<int>& nums) { //wrong
        int left = 0, right = nums.size() - 1;
        while (left < right){
            int mid = left + (right - left) / 2;
            if (isIncrease(nums, left, mid)){
                right = mid;
                cout << "set right = " << mid << endl;
            }
            else{
                left = mid + 1;
                cout << "set left = " << mid << endl;
            }

        }
        return left;
    }


    bool isBadVersion(int version);
    int firstBadVersion(int n) { //use template2;
        if (n == 0)
            return 0;
        int left = 1, right = n;
        while (left < right){
            int mid = left + (right - left) / 2;
            if (isBadVersion(mid))
                right = mid;
            else
                left = mid + 1;
        }
        if (left != n && isBadVersion(left))
            return left;
        return -1;
    } //correct


    vector<int> searchRange1(vector<int>& nums, int target) {
        vector<int> res{-1, -1};
        if (nums.empty())
            return res;
        return help(nums, target);
    } //wrong
    int binarySearch1(vector<int> nums, int target, int left, int right){
        int mid = left + (right - left)/2;
        while (left <= right){
            if (nums[mid] == target)
                return mid;
            if (nums[mid] > target){
                right = mid - 1;
            } else {
                left = mid + 1;
            }
            mid = left + (right - left)/2;
        }
        return -1;
    }
    vector<int> help(vector<int> nums, int target){
        vector<int> res(2, -1);
        int left = 0, right = nums.size() - 1;
        int mid = binarySearch1(nums, target, left, right);
        if (mid == -1)
            return res;

        int temp = mid;
        do{
            temp = binarySearch1(nums, target, left, temp);
            if (res[0] != temp)
                res[0] = temp;
            else
                break;
        } while (true);

        temp = mid;
        do{
            temp = binarySearch1(nums,target, temp, right);
            if (res[1] != temp)
                res[1] = temp;
            else
                break;
        } while (true);

        cout << res[0] << res[1];
        return res;
    }
    int binarySearchLeft(vector<int> nums, int target){
        int left = 0, right = nums.size() - 1;
        int mid;

        while (left != right){
            mid = left + (right - left)/2;
            if (nums[mid] >= target){
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        return nums[left] == target ? left : -1;
    }
    int binarySearchRight(vector<int> nums, int target){
        int left = 0, right = nums.size() - 1;
        int mid;

        while (left != right){
            mid = left + (right - left)/2;
            if (nums[mid] > target){
                right = mid - 1;
            } else {
                left = mid;
            }
        }
        return nums[left] == target ? left : -1;
    }


//    sorted in ascending order
//    find the starting and ending position of a given target value.
//    If the target is not found in the array, return [-1, -1]
    vector<int> searchRange(vector<int>& nums, int target) {
        if (nums.empty())
            return vector<int>{-1, -1};
        int l = 0, r = nums.size() - 1;
        int left = searchLeft(nums, target, l, r);
        int right = searchRight(nums, target, left, r);
        cout << left << " " << right;
        return vector<int>{left, right};
    }
    int searchLeft(vector<int> nums, int target, int left, int right){
        while (left < right){
            int mid = left + (right - left)/2;
            if (nums[mid] < target)
                left = mid + 1;
            else
                right = mid;
        }
        return nums[left] == target ? left : -1;
    }
    int searchRight(vector<int> nums, int target, int left, int right){
        while (left + 1 < right){
            int mid = left + (right - left)/2;
            if (nums[mid] <= target)
                left = mid;
            else
                right = mid;
        }
        if (nums[right] == target)  //the order of these comparision can't be changed!!
            return right;
        else if (nums[left] == target)
            return left;
        else
            return -1;
    }

};

int main(){
    Solution s;
    vector<int> a{5,7,8};
    vector<int> b{1,2,5,4,3,2};
    vector<int> c{2,2,2,2,2};
//    cout << s.binarySearchLeft(b, 6);
//    cout << s.findPeakElement(b);
//    cout << s.searchRight(c, 2, 0, 4);
    s.searchRange(a, 9);
//    s.help(c, 5);
    return 0;
}