QUnit.test('String#link', assert => {
  const { link } = String.prototype;
  assert.isFunction(link);
  assert.arity(link, 1);
  assert.name(link, 'link');
  assert.looksNative(link);
  assert.nonEnumerable(String.prototype, 'link');
  assert.same('a'.link('b'), '<a href="b">a</a>', 'lower case');
  assert.same('a'.link('"'), '<a href="&quot;">a</a>', 'escape quotes');

  if (typeof Symbol == 'function' && !Symbol.sham) {
    assert.throws(() => link.call(Symbol(), 'b'), 'throws on symbol context');
    assert.throws(() => link.call('a', Symbol()), 'throws on symbol argument');
  }
});
