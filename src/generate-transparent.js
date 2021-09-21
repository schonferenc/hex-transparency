module.exports.generateTransparent = (
  obj,
  transparentValue,
  merge,
  name,
  valuesObj,
) => {
// if the value of merge is true, it merges the new values with the old ones, if it is false, only the new values are returned 
  return merge
    ? Object.assign(obj, create(obj, transparentValue, name, valuesObj))
    : create(obj, transparentValue, name, valuesObj);
};
// create values 
const copy = (value, valuesObj) => {
  let result = '';
  if (typeof value === 'object') result = Object.fromEntries(Object.entries(value).map(([k, v]) => [k, copy(v, valuesObj)]));
  if (typeof value === 'string') result = `${value}${valuesObj}`;

  return result;
};

// create headers 
const create = (object, values, header, valuesObj) => Object.fromEntries(Object
  .entries(object)
  .reduce((r, [k, v]) => [...r, ...values.map((i) => [[header, i, k].join('-'), copy(v, valuesObj.data[i])])], []));