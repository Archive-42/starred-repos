var matrixScore = function(A) {
     if (A.length == 0 || A[0].length == 0) return 0;
  
  for (let i = 0; i < A.length; i++) {
    if (A[i][0] == 0) {
      for (let j = 0; j < A[i].length; j++) {
        A[i][j] = 1 - A[i][j];
      }
    }
  }
  for (let j = 0; j < A[0].length; j++) {
    let zeros = 0;
    for (let i = 0; i < A.length; i++) {
      if (A[i][j] == 0) zeros += 1;
    }
    if (2 * zeros > A.length) { // switch
      for (let i = 0; i < A.length; i++) {
        A[i][j] = 1 - A[i][j];
      }
    }
  }
  let ans = 0;
  A.forEach(a => ans += parseInt(a.join(''), 2));

  return ans;
};
