/*Kadane’s Algorithm
Given an array arr of N integers. Find the contiguous sub-array with maximum sum.

Input:
N = 5
arr[] = {1,2,3,-2,5}
Output:
9
Explanation:
Max subarray sum is 9
of elements (1, 2, 3, -2, 5) which 
is a contiguous subarray
*/

int maxSubarraySum(int arr[], int n) {
    int max_ending = 0, max_till_now = 0;
    for (int i = 0; i < n; i++) {
        max_ending += arr[i];
        if (max_ending < arr[i])
            max_ending = arr[i];
        if (max_till_now < max_ending)
            max_till_now = max_ending;
    }
    return max_till_now;
}
