/*Given an array A[] of size N, construct a Product Array P (of same size N) such that P[i] is equal 
to the product of all the elements of A except A[i].

Input:
N = 5
A[] = {10, 3, 5, 6, 2}
Output:
180 600 360 300 900
Explanation: 
For i=0, P[i] = 3*5*6*2 = 180.
For i=1, P[i] = 10*5*6*2 = 600.
For i=2, P[i] = 10*3*6*2 = 360.
For i=3, P[i] = 10*3*5*2 = 300.
For i=4, P[i] = 10*3*5*6 = 900.
*/


vector < long long int > productExceptSelf(vector < long long int > & nums, int n) {

  vector < long long int > a;
  long pro = 1;
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      if (i == j)
        continue;
      else
        pro *= nums[j];
    }
    a.insert(a.end(), {
      pro
    });
    pro = 1;
  }
  return a;
}
