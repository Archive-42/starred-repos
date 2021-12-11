/* We have two special characters:

    The first character can be represented by one bit 0.
    The second character can be represented by two bits (10 or 11).

Given a binary array bits that ends with 0, return true if the last character must be a one-bit character.


Input: bits = [1,0,0]
Output: true
Explanation: The only way to decode it is two-bit character and one-bit character.
So the last character is one-bit character.
*/

var isOneBitCharacter = function(bits) {
    const length = bits.length;
    let isValid = true;

    for (let i = 0; i < length - 1; i++) {
        if (bits[i] === 0) {
            isValid = true;
            continue;
        }

        isValid = !isValid;
    }

    return isValid;
};
