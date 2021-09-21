
// the method that creates the new color codes 
const { generateTransparent } = require('./src/generate-transparent');
// object of transparency values 
const transparencyValues = require('./src/transparency-values');
// validation 
const {
  validateObject,
  validateValues,
  validateMerge,
  validateName,
  errors,
} = require('./src/validate');

// the result to be exported 
module.exports.hexparency = (obj, values, merge = true, name = 'tr') => {
  const Obj = validateObject(obj);
  const Values = validateValues(values);
  const Merge = validateMerge(merge);
  const Name = validateName(name);

  const error = errors(Obj, Values, Merge, Name);

  if (error !== true) {
    return error;
  }

  return generateTransparent(Obj, Values, Merge, Name, transparencyValues);
};
