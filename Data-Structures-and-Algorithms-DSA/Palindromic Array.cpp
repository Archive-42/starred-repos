/* Given a Integer array A[] of n elements. Your task is to complete the function PalinArray. 
Which will return 1 if all the elements of the Array are palindrome otherwise it will return 0.

Input:
The first line of input contains an integer denoting the no of test cases. 
Then T test cases follow. Each test case contains two lines. The first line of input contains an integer n denoting the size of the arrays. 
In the second line are N space separated values of the array A[].

Input:
2
5
111 222 333 444 555
3
121 131 20

Output:
1
0

Explanation:
For First test case.
n=5;
A[0] = 111    //which is a palindrome number.
A[1] = 222   //which is a palindrome number.
A[2] = 333   //which is a palindrome number.
A[3] = 444  //which is a palindrome number.
A[4] = 555  //which is a palindrome number.
As all numbers are palindrome so This will return 1.
*/

int PalinArray(int a[], int n) { //add code here
  for (int j = 0; j < n; j++) {
    int n = a[j];
    int rem = 0;
    int rev = 0;
    while (n > 0) {
      rem = n % 10;
      rev = rev * 10 + rem;
      n = n / 10;
    }
    if (rev != a[j])
      return 0;
  }
  return 1;
}
