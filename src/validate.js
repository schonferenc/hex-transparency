/* VALIDATE-OBJECT */

// removes invalid values for the object 
exports.validateObject = (obj) => {
  if(typeof obj !== 'object' || Object.keys(obj).length === 0) return false;

  Object.keys(obj).forEach(key =>
    (obj[key] && typeof obj[key] === 'object') && this.validateObject(obj[key]) ||
    (obj[key] === undefined || obj[key] === null || obj[key] === '' || !hexIsValid(obj[key])) && delete obj[key]
  );

  return clean(obj);
};


// removes null values from the array 
const clean = (obj) => {

  Object.keys(obj).forEach((key) => {
    Array.isArray(obj[key]) 
      ? obj[key] = obj[key].filter(x => x!==null) 
      : null

  });

  return obj;
}

// returns true if the expression is a valid hex color code (for example: #fff or #ffffff) 
function hexIsValid(value) {
  const regex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return regex.test(value);
}

/* VALIDATE-TRANSPARENT VALUE */

exports.validateValues = (value) => {
  // if the value is a number or an array
  if (typeof value === 'number' || Array.isArray(value)) {
    // Numbers between 1 and 100
    const regex = /^[1-9][0-9]?$|^100$/;

    // if the value is an array
    if (Array.isArray(value)) {
      const valid = [];
      for (let i = 0; i < value.length; i += 1) {
        // if the element of the array contains an invalid value, exits 
        if (regex.test(value[i]) === false) return false;
        valid.push(value[i]);
      }
      return valid;
    }
    // if only one value needs to be checked
    if (!regex.test(value)) return false;
    return [value];
  }
  return false;
};

/* VALIDATE-MERGE */
// only boolean type allowed 
exports.validateMerge = (value) => {
  if (typeof value === 'boolean') {
    return value;
  }
  return null;
};


/* VALIDATE-NAME */
// only string type is allowed and its length must be greater than zero 
exports.validateName = (name) => {
  if (typeof name === 'string' && name.trim().length > 0) {
    // trim the empty spaces 
    return name.trim();
  }
  return false;
};

/* ERROR CHECKING */
exports.errors = (obj, transparentValue, merge, name) => {
  if (obj === false) {
    return (
      '\x1b[31m'
      + 'Error - ( object parameter ): '
      + '\x1b[0m'
      + 'must be a valid object!'
    );
  }
  if (transparentValue === false) {
    return (
      '\x1b[31m'
      + 'Error - ( values parameter ): '
      + '\x1b[0m'
      + 'must be a number between 1 and 100, or valid value  !'
    );
  }
  if (merge === null) {
    return (
      '\x1b[31m'
      + 'Error - ( merge parameter ): '
      + '\x1b[0m'
      + 'it can only be true or false !'
    );
  }
  if (name === false) {
    return (
      '\x1b[31m'
      + 'Error - ( name parameter ): '
      + '\x1b[0m'
      + 'can only be string and cannot be empty  !'
    );
  }
  return true;
};
