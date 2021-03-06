QUnit.test('Math.sign', assert => {
  const { sign } = Math;
  assert.isFunction(sign);
  assert.name(sign, 'sign');
  assert.arity(sign, 1);
  assert.looksNative(sign);
  assert.nonEnumerable(Math, 'sign');
  assert.same(sign(NaN), NaN);
  assert.same(sign(), NaN);
  assert.same(sign(-0), -0);
  assert.same(sign(0), 0);
  assert.same(sign(Infinity), 1);
  assert.same(sign(-Infinity), -1);
  assert.same(sign(13510798882111488), 1);
  assert.same(sign(-13510798882111488), -1);
  assert.same(sign(42.5), 1);
  assert.same(sign(-42.5), -1);
});
