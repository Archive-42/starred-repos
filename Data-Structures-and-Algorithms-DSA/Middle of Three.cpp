/* Given three distinct numbers A, B and C. Find the number with value in middle (Try to do it with minimum comparisons).

Input:
A = 978, B = 518, C = 300
Output:
518
Explanation:
Since 518>300 and 518<978, so 
518 is the middle element.
*/


int middle(int A, int B, int C) {

  int minimum = min(A, min(B, C));
  int maximum = max(A, max(B, C));
  return (A + B + C) - minimum - maximum;
}
