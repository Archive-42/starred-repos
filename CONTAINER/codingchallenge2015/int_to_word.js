/**
 * @author Kristian Muñiz <kristian.muniz@upr.edu> (http://www.krismuniz.com)
 */

/**
 * int_to_word() {function} takes integer as an input parameter
 * and returns the associated English word(s).
 * @param {number} int - It must be an integer || Otherwise, it throws an error.
 * @returns {string}
 * @example int_to_word(1000) => 'one thousand'
 */
function int_to_word(int) {
  'use strict';
  if (int === 0) {
    return 'zero';
  } else if (typeof int !== 'number' || Math.round(int) !== int) {
    throw new TypeError('Argument must be an integer.');
  }

  const beforeTwenty = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
    'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen',
    'seventeen', 'eighteen', 'nineteen'
  ];
  const tens = [
    '', 'ten', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy',
    'eighty', 'ninety'
  ];
  const magnitude = [
    '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion'
  ];
  const sign = int >= 0 ? '' : 'minus '; // Prepend 'minus' if [int] is negative

  return sign +
    Math.abs(int)
      // Convert [int] to string
      .toString()
      // Split the string in groups of at most 3 digits
      .split(/(?=(?:...)*$)/)
      // Reverse to match beforeTwenty[x], tens[x], and magnitude[x]
      .reverse()
      // Process each element; << Array[i] = n >>
      .map((n, i) => {
        if (n !== '000' & n !== '00' & n !== '0') {
          const last = n[n.length - 1];
          const secondLast = n[n.length - 2];
          const thirdLast = n[n.length - 3];
          const lastDigits = secondLast > 0 ? n.slice(-2) : n.slice(-1);
          let result = '';

          if (n.length === 3 && thirdLast >= 1) {
            result += beforeTwenty[thirdLast] + ' hundred ';
          }

          if (n.length >= 2 && secondLast > 1) {
            result += tens[secondLast] + ' ' + beforeTwenty[last];
          } else if (last !== '0' || lastDigits === '10') {
            result += beforeTwenty[lastDigits];
          }

          return result.trim() + ' ' + magnitude[i];
        }
      })
      // Get rid of empty elements to avoid extra spaces between words
      // Boolean {function} helps filter out falsy values – like empty strings ;)
      .filter(Boolean)
      // Reverse the result array back to natural (human) order
      .reverse()
      // Merge the array of strings to a single string
      .join(' ')
      // Remove trailing spaces
      .trim();
}

module.exports = int_to_word;
