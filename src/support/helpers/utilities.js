/**
 * Gets the value of an environment variable.
 * @param {string} key
 * @param {*} defaultVal
 * @return {*}
 */
export const env = (key, defaultVal = null) => {
  const val = process.env[key];

  if (typeof val === 'undefined' || val === null) {
    return defaultVal;
  }

  switch(val.toLowerCase()) {
    case 'true':
    case '(true)':
      return true;
    case 'false':
    case '(false)':
      return false;
    case 'empty':
    case '(empty)':
      return '';
    case 'null':
    case '(null)':
      return;
    default:
      break;
  }

  if (val.length > 1 && val.startsWith('"') && val.endsWith('"')) {
    return val.substr(1, -1);
  }

  return val;
};

/**
 * Builds sorter queries for back end data sorting.
 * @param {object|array} sorters
 * @return {array}
 */
export const buildSortersQuery = (sorters) => {
  let query = [];

  for (const sorter in sorters) {
    if (!sorters.hasOwnProperty(sorter)) continue;
    query.push(`${sorter}:${sorters[sorter]}`);
  }

  return query;
};

/**
 * @return {string}
 */
export const randomId = () =>  {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
};

/**
 * @param {Function} fn
 * @param {number} delay
 * @return {Function}
 */
let timer = null;
export const debounce = (fn, delay = 0) => {
  return function () {
    let context = this, args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

/**
 * Smashes multidimensional object to one dimensional.
 * Stops when the stopper callback returns true.
 * @param {object} object
 * @param {Function} stopper
 * @param {string} prepend
 * @returns {object}
 */
export const objectSmashCallback = (object, stopper, prepend = '') => Object.keys(object).reduce((result, key) => {
  let prefix = '';
  if (prepend === '') {
    prefix = key;
  } else {
    prefix = `${prepend}[${key}]`;
  }

  if (typeof object[key] === 'object' && !stopper(key, object[key])) {
    result = {
      ...result,
      ...objectSmashCallback(object[key], stopper, prefix)
    }
  } else {
    result[prefix] = object[key];
  }
  return result;
}, {});

/**
 * Smashes multidimensional object to one dimensional.
 * Stops on undefined, null values and JS File API objects.
 * @param {object} object
 * @param {string} prepend
 * @returns {object}
 */
export const objectSmash = (object, prepend = '') => objectSmashCallback(
  object,
  (key, value) => typeof value === 'undefined' || value === null || value instanceof FileList || value instanceof File,
  prepend
);

/**
 * Creates a FormData equivalent of javascript object.
 * @param {object} object
 * @return {FormData}
 */
export const objectToFormData = (object) => {
  object = objectSmash(object);
  return Object.keys(object).reduce((formData, key) => {
    if (object[key] instanceof FileList) {
      for (let i = 0; i < object[key].length; i++) {
        let item = object[key].item(i);
        formData.append(`${key}[${i}]`, item, item.name);
      }
    } else {
      formData.append(key, object[key]);
    }
    return formData;
  }, new FormData())
};