/* You are given two integer arrays nums1 and nums2 both of the same length. The advantage of nums1 with respect to nums2 is the number of indices i for which nums1[i] > nums2[i].

Return any permutation of nums1 that maximizes its advantage with respect to nums2.


Input: nums1 = [2,7,11,15], nums2 = [1,10,4,11]
Output: [2,11,7,15]
*/

const SWAP = (a, b) => b - a;
var advantageCount = function(a, B) {
  const LEN = a.length;
  const ret = new Uint32Array(LEN);
  const b = [...B];
  const map = {};
  b.sort(SWAP);
  a.sort(SWAP);
  for (let i = 0, left = 0, right = LEN - 1; i < LEN; ++i) {
    const value = a[left] > b[i] ? a[left++] : a[right--];
    map[b[i]] ? map[b[i]].push(value) : (map[b[i]] = [value]);
  }
  for (let i = 0; i < B.length; ++i) {
    ret[i] = map[B[i]].pop();
  }
  return ret;
};
