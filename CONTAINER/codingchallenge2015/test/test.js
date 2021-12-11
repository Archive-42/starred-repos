var int_to_word = require('../int_to_word.js');
var assert = require('assert');

describe('# int_to_word() [Function]', function() {

  describe('Error handling:', function() {
    it('throws a TypeError when the parameter is not an integer', function () {
      assert.throws(
        function() {
          return int_to_word('1');
        },
        /integer/
      );
      assert.throws(
        function() {
          return int_to_word([]);
        },
        /integer/
      );
      assert.throws(
        function() {
          return int_to_word();
        },
        /integer/
      );
    });
  });

  describe('Required functionality: ', function() {
    it('properly converts single-digit integers to words', function () {
      assert.equal(int_to_word(1), 'one');
      assert.equal(int_to_word(4), 'four');
      assert.equal(int_to_word(5), 'five');
      assert.equal(int_to_word(8), 'eight');
      assert.equal(int_to_word(9), 'nine');
    });

    it('properly converts two-digit integers to words', function () {
      assert.equal(int_to_word(10), 'ten');
      assert.equal(int_to_word(13), 'thirteen');
      assert.equal(int_to_word(16), 'sixteen');
      assert.equal(int_to_word(20), 'twenty');
      assert.equal(int_to_word(43), 'forty three');
      assert.equal(int_to_word(99), 'ninety nine');
    });

    it('properly converts three-digit integers to words', function () {
      assert.equal(int_to_word(100), 'one hundred');
      assert.equal(int_to_word(103), 'one hundred three');
      assert.equal(int_to_word(500), 'five hundred');
      assert.equal(int_to_word(256), 'two hundred fifty six');
      assert.equal(int_to_word(384), 'three hundred eighty four');
      assert.equal(int_to_word(900), 'nine hundred');
    });

    it('properly converts four-digit integers to words', function () {
      assert.equal(int_to_word(1000), 'one thousand');
      assert.equal(int_to_word(2015), 'two thousand fifteen');
      assert.equal(int_to_word(5000), 'five thousand');
      assert.equal(int_to_word(2560), 'two thousand five hundred sixty');
      assert.equal(int_to_word(4001), 'four thousand one');
      assert.equal(int_to_word(1124), 'one thousand one hundred twenty four');
    });

    it('properly converts five-digit integers to words', function () {
      assert.equal(int_to_word(10000), 'ten thousand');
      assert.equal(int_to_word(32015), 'thirty two thousand fifteen');
      assert.equal(int_to_word(35000), 'thirty five thousand');
      assert.equal(int_to_word(72560), 'seventy two thousand five hundred sixty');
      assert.equal(int_to_word(14001), 'fourteen thousand one');
      assert.equal(int_to_word(11124), 'eleven thousand one hundred twenty four');
    });

    it('properly converts six-digit integers to words', function () {
      assert.equal(int_to_word(100000), 'one hundred thousand');
      assert.equal(int_to_word(320015), 'three hundred twenty thousand fifteen');
      assert.equal(int_to_word(435000), 'four hundred thirty five thousand');
      assert.equal(int_to_word(372560), 'three hundred seventy two thousand five hundred sixty');
      assert.equal(int_to_word(141001), 'one hundred forty one thousand one');
      assert.equal(int_to_word(111124), 'one hundred eleven thousand one hundred twenty four');
    });

    it('properly converts seven-digit integers to words', function () {
      assert.equal(int_to_word(1000000), 'one million');
      assert.equal(int_to_word(1000250), 'one million two hundred fifty');
      assert.equal(int_to_word(3002061), 'three million two thousand sixty one');
      assert.equal(int_to_word(7654321), 'seven million six hundred fifty four thousand three hundred twenty one');
      assert.equal(int_to_word(9999999), 'nine million nine hundred ninety nine thousand nine hundred ninety nine');
    });

    it('properly converts eight-digit integers to words', function () {
      assert.equal(int_to_word(20000000), 'twenty million');
      assert.equal(int_to_word(10000250), 'ten million two hundred fifty');
      assert.equal(int_to_word(34002061), 'thirty four million two thousand sixty one');
      assert.equal(int_to_word(87654321), 'eighty seven million six hundred fifty four thousand three hundred twenty one');
      assert.equal(int_to_word(99999999), 'ninety nine million nine hundred ninety nine thousand nine hundred ninety nine');
    });
    it('properly converts nine-digit integers to words', function () {
      assert.equal(int_to_word(200000000), 'two hundred million');
      assert.equal(int_to_word(100000250), 'one hundred million two hundred fifty');
      assert.equal(int_to_word(341002061), 'three hundred forty one million two thousand sixty one');
      assert.equal(int_to_word(987654321), 'nine hundred eighty seven million six hundred fifty four thousand three hundred twenty one');
      assert.equal(int_to_word(999999999), 'nine hundred ninety nine million nine hundred ninety nine thousand nine hundred ninety nine');
    });
  });

  describe('Awesome extra functionality: ', function() {
    it('properly converts negative integers to words', function () {
      assert.equal(int_to_word(-2000000000), 'minus two billion');
      assert.equal(int_to_word(-50), 'minus fifty');
      assert.equal(int_to_word(-1000000), 'minus one million');
      assert.equal(int_to_word(-200000000211), 'minus two hundred billion two hundred eleven');
    });

    it('properly converts HUGE integers (more than 9 digits) to words', function () {
      assert.equal(int_to_word(2000000000), 'two billion');
      assert.equal(int_to_word(35100000000), 'thirty five billion one hundred million');
      assert.equal(int_to_word(3333333333333), 'three trillion three hundred thirty three billion three hundred thirty three million three hundred thirty three thousand three hundred thirty three');
      assert.equal(int_to_word(200020000043), 'two hundred billion twenty million forty three');
      assert.equal(int_to_word(200000000211), 'two hundred billion two hundred eleven');
    });

    it('properly converts the MAX SAFE INTEGER to words!', function() {
      assert.equal(int_to_word(9007199254740991), 'nine quadrillion seven trillion one hundred ninety nine billion two hundred fifty four million seven hundred forty thousand nine hundred ninety one');
      assert.equal(int_to_word(Number.MAX_SAFE_INTEGER), 'nine quadrillion seven trillion one hundred ninety nine billion two hundred fifty four million seven hundred forty thousand nine hundred ninety one');
    });
  });

  after(function() {
    console.log('\n Boom! Test completed.', '\n * Drops mic and walks away *');
  });

});
