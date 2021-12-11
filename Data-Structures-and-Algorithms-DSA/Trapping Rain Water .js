/*Given an array arr[] of N non-negative integers representing the height of blocks. 
If width of each block is 1, compute how much water can be trapped between the blocks during the rainy season. 

Input:
N = 4
arr[] = {7,4,0,9}
Output:
10
Explanation:
Water trapped by above 
block of height 4 is 3 units and above 
block of height 0 is 7 units. So, the 
total unit of water trapped is 10 units.
*/

//Code in JavaScript
trappingWater(heights, n) {
    let trapped = 0,
        low = 0,
        high = heights.length - 1;
    let leftMax = 0,
        rightMax = 0;
    while (low < high) {
        if (heights[low] <= heights[high]) {
            if (leftMax > heights[low]) trapped += leftMax - heights[low];
            else leftMax = heights[low];
            low++;
        } else {
            if (rightMax > heights[high]) trapped += rightMax - heights[high];
            else rightMax = heights[high];
            high--;
        }
    }
    return trapped;
}
