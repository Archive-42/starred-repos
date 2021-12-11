/*Given an integer, the task is to find factorial of the number.
 
Input:
The first line of input contains an integer T denoting the number of test cases.  
The first line of each test case is N,the number whose factorial is to be found
 
Output:
Print the factorial of the number in separate line.
Example:
Input
3
5
10
2
 
Output
120
3628800
2
*/

#include <stdio.h>

int main()
{
    int kases;
    scanf("%d", &kases);
    int kase;
    for(kase = 1; kase <= kases; kase++) {
        int  N;
        scanf("%d", &N);
        int result[1000];
        result[0] = 1;
        int length = 1, i, j, temp, carry = 0;
        for(i = 2; i <= N; i++) {
            for(j = 0; j < length; j++) {
                temp = carry + result[j] * i;
                carry = temp / 10;
                result[j] = temp % 10;
            }
            while(carry) {
                result[j] = carry % 10;
                carry /= 10;
                j++;
            }
            length = j;
        }
        for(int i = length - 1; i >= 0; i--){
            printf("%d", result[i]);
        }
        printf("\n");
    }
    return 0;
}
