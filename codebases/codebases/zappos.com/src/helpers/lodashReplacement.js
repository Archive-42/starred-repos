export const head = arr => (arr && arr.length ? arr[0] : undefined);
export const last = arr => (arr && arr.length ? arr[arr.length - 1] : undefined);
export const filter = (arr, fun) => (arr ? arr.filter(fun) : []);

/**
 * Given an array returns an object each entry in the array being keyed by the provided property. See Also lodash#keyBy
 * @param {Array} arr array to parse
 * @param {Function|String} fnOrString property name or function computing the key
 */
export const keyBy = (arr, fnOrString) => {
  if (Array.isArray(arr)) {
    const result = {};
    arr.forEach(value => {
      const key = typeof fnOrString === 'string' ? value[fnOrString] : fnOrString(value);
      if (key) {
        result[key] = value;
      }
    });
    return result;
  }
  return {};
};

/**
 * Poor man's lodash.orderBy() for our use keys (e.g show primary payment/address first in a list)
 * @param {Array} arr array to sort (will not be mutated)
 * @param {String} prop boolean field name to sort on.
 */
export const orderByBooleanPropFirst = (arr, prop) => {
  if (Array.isArray(arr)) {
    const arrCopy = arr.slice();
    arrCopy.sort((val1, val2) => {
      const val1Prop = val1[prop], val2Prop = val2[prop];
      if (val1Prop === val2Prop) {
        return 0;
      } else if (val1Prop === true) {
        return -1;
      } else if (val2Prop === true) {
        return 1;
      } else {
        // both are some variant of not true.
        return 0;
      }
    });
    return arrCopy;
  } else {
    return [];
  }
};

/**
 * Returns a shallow of copy of the given object with the provided fields removed. See lodash.omit()
 * @param {Object} object
 * @param {String|Array} fields field or list of fields to exclude from the result.
 */
export const omit = (object, fields) => {
  const newObject = Object.assign({}, object);
  if (typeof fields === 'string') {
    delete newObject[fields];
  } else if (Array.isArray(fields)) {
    fields.forEach(field => {
      delete newObject[field];
    });
  }
  return newObject;
};

/**
 * Returns an object with the given fields shallowly copied from input object. See lodash.pick().
 * @param {Object} object
 * @param {String|Array} fields field name or list of field names to include in result
 */
export const pick = (object, fields) => {
  const newObject = {};
  if (typeof fields === 'string') {
    fields = [fields];
  }

  fields.forEach(val => {
    newObject[val] = object[val];
  });
  return newObject;
};

/**
 * Creates an object with the same keys as the input object with the value generated by running the iteratee through the provided function. See lodash.mapValues().
 * @param {Object} object
 * @param {String|Function} keyOrFunction
 */
export const mapValues = (object, keyOrFunction) => {
  const result = {};
  Object.keys(object).forEach(key => {
    if (typeof keyOrFunction === 'string') {
      result[key] = object[key][keyOrFunction];
    } else {
      result[key] = keyOrFunction(object[key], key);
    }
  });
  return result;
};

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru iteratee. The order of grouped values is determined by the order they occur in collection. The corresponding value of each key is an array of elements responsible for generating the key. See lodash#groupBy https://lodash.com/docs/4.17.4#groupBy
 */
export const groupBy = (list, func) => {
  const result = {};
  if (list) {
    list.forEach(val => {
      const functionResult = func(val);
      if (functionResult in result) {
        result[functionResult].push(val);
      } else {
        result[functionResult] = [val];
      }
    });
  }
  return result;
};

/**
 * Converts value to an array.
 * @param {*} object
 */
export const toArray = object => {
  if (Array.isArray(object)) {
    return object;
  } else if (typeof object === 'string') {
    return object.split('');
  } else if (typeof object === 'number') {
    return [];
  } else if (object && typeof object === 'object') {
    const result = [];
    Object.keys(object).forEach(key => result.push(object[key]));
    return result;
  } else {
    return [];
  }
};
