import { GLOBAL, TYPED_ARRAYS } from '../helpers/constants';

QUnit.test('ArrayBuffer.isView', assert => {
  const { isView } = ArrayBuffer;
  assert.isFunction(isView);
  assert.arity(isView, 1);
  assert.name(isView, 'isView');
  assert.looksNative(isView);
  assert.nonEnumerable(ArrayBuffer, 'isView');
  for (const name in TYPED_ARRAYS) {
    if (GLOBAL[name]) {
      assert.true(isView(new GLOBAL[name]([1])), `${ name } - true`);
    }
  }
  assert.true(isView(new DataView(new ArrayBuffer(1))), 'DataView - true');
  assert.false(isView(new ArrayBuffer(1)), 'ArrayBuffer - false');
  const examples = [undefined, null, false, true, 0, 1, '', 'qwe', {}, [], function () { /* empty */ }];
  for (const example of examples) {
    assert.false(isView(example), `${ example } - false`);
  }
});
