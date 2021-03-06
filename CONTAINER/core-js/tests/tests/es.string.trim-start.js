import { STRICT, WHITESPACES } from '../helpers/constants';

QUnit.test('String#trimLeft', assert => {
  const { trimLeft } = String.prototype;
  assert.isFunction(trimLeft);
  assert.arity(trimLeft, 0);
  assert.name(trimLeft, 'trimStart');
  assert.looksNative(trimLeft);
  assert.nonEnumerable(String.prototype, 'trimLeft');
  assert.same(' \n  q w e \n  '.trimLeft(), 'q w e \n  ', 'removes whitespaces at left side of string');
  assert.same(WHITESPACES.trimLeft(), '', 'removes all whitespaces');
  assert.same('\u200B\u0085'.trimLeft(), '\u200B\u0085', "shouldn't remove this symbols");

  assert.throws(() => trimLeft.call(Symbol()), 'throws on symbol context');

  if (STRICT) {
    assert.throws(() => trimLeft.call(null, 0), TypeError);
    assert.throws(() => trimLeft.call(undefined, 0), TypeError);
  }
});

QUnit.test('String#trimStart', assert => {
  const { trimStart, trimLeft } = String.prototype;
  assert.isFunction(trimStart);
  assert.arity(trimStart, 0);
  assert.name(trimStart, 'trimStart');
  assert.looksNative(trimStart);
  assert.nonEnumerable(String.prototype, 'trimStart');
  assert.same(trimStart, trimLeft, 'same #trimLeft');
  assert.same(' \n  q w e \n  '.trimStart(), 'q w e \n  ', 'removes whitespaces at left side of string');
  assert.same(WHITESPACES.trimStart(), '', 'removes all whitespaces');
  assert.same('\u200B\u0085'.trimStart(), '\u200B\u0085', "shouldn't remove this symbols");

  assert.throws(() => trimStart.call(Symbol()), 'throws on symbol context');

  if (STRICT) {
    assert.throws(() => trimStart.call(null, 0), TypeError);
    assert.throws(() => trimStart.call(undefined, 0), TypeError);
  }
});
