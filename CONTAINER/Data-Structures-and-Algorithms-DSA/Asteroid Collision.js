/* We are given an array asteroids of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). 
Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. 
Two asteroids moving in the same direction will never meet.

Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
*/

var asteroidCollision = function(asteroids) {
    const s = [];
    for (let i = 0; i < asteroids.length; i++) {
        const a = asteroids[i];
      
        if ((s.length === 0 || s[s.length -1] < 0) && a < 0 ) {
            s.push(a);
     
        } else if (a > 0) {
            s.push(a);
        } else {
            const pop = s.pop();
            if (Math.abs(pop) > Math.abs(a)) {
                s.push(pop);
            } else if (Math.abs(pop) < Math.abs(a)) {
                i--;
            } else { 
                continue;
            }
        }
    }
    return s;
};
