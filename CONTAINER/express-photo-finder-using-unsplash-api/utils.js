const randomWords = require('random-words');

const randomNum = (n) => Math.round(Math.random() * n) - 1;

const wordsFromPackage = randomWords({exactly: 25, maxLength: 8});

const wordsFromLocal = ['welcome', 'hello world', 'chocolate', 'ice cream', 'sunshine', 'green forest', 'clear blue sky', 'calm sea', 'peaceful sunrise', 'summer breeze', 'relaxing beach', 'swimming pool', 'blue lagoon', 'clouds'];

const words = wordsFromPackage.length ? wordsFromPackage : wordsFromLocal;

const getRandomWord = () => {
  const num = randomNum(words.length);
  return words[num];
}

module.exports = {
  getRandomWord
}