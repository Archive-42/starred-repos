/* A website domain like "discuss.leetcode.com" consists of various subdomains. At the top level, we have "com", at the next level, we have "leetcode.com", 
and at the lowest level, "discuss.leetcode.com". When we visit a domain like "discuss.leetcode.com", we will also visit the parent domains "leetcode.com" and "com" implicitly.

Now, call a "count-paired domain" to be a count (representing the number of visits this domain received), followed by a space, followed by the address. 
An example of a count-paired domain might be "9001 discuss.leetcode.com".

We are given a list cpdomains of count-paired domains. We would like a list of count-paired domains, (in the same format as the input, and in any order), 
that explicitly counts the number of visits to each subdomain.

Input: 
["9001 discuss.leetcode.com"]
Output: 
["9001 discuss.leetcode.com", "9001 leetcode.com", "9001 com"]
Explanation: 
We only have one website domain: "discuss.leetcode.com". As discussed above, the subdomain "leetcode.com" and "com" will also be visited. So they will all be visited 9001 times.
*/

var subdomainVisits = function(cpdomains) {
  const map = new Map(), ret = [];
  for (let item of cpdomains) {
    const [count, address] = item.split(' ');
    const keys = getKeys(address);
    for (let key of keys) {
      const oldCount = map.get(key) || 0;
      map.set(key, oldCount + parseInt(count));
    }
  }
  map.forEach((value, key) => ret.push(`${value} ${key}`));
  return ret;
}

function getKeys(address) {
  const items = address.split('.');
  const ret = [];
  let combined = '';
  for (let i = items.length - 1; i >= 0; i--) {
    combined = combined ? `${items[i]}.${combined}` : items[i];
    ret.push(combined);
  }
  return ret;
};
