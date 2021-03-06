import small from 'core-js-pure/features/string/small';

QUnit.test('String#small', assert => {
  assert.isFunction(small);
  assert.same(small('a'), '<small>a</small>', 'lower case');

  /* eslint-disable es/no-symbol -- safe */
  if (typeof Symbol == 'function') {
    assert.throws(() => small(Symbol()), 'throws on symbol context');
  }
});
