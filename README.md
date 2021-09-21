# hex-transparency

**From an object that contains hexadecimal color codes, it creates a new object that contains the color codes in the original object and its transparent versions. Only suitable for converting hexadecimal color codes.
The generated scale works well with the [TailwindCss](https://tailwindcss.com/) plugin.**

## Installation:

    npm install hex-transparency

## Usage:
> SomeFile.js
```ruby
const { hexparency }= require('hex-transparency');
const myColors= require('./someLibrary/myColors');
```

 **myColors**  is a custom object that contains hexadecimal color codes
```ruby
exports.myColors = {
	orange: {
		light: '#fef7e7',
		dark: '#f6ae12',
	},
	succsess:  '#4D7B07',
};
```
```ruby
const myNewColorObject = hexparency(myColors,[20, 50], true, 'transparent');
```
## Use with [TailwindCss](https://tailwindcss.com/):
This package works well with [TailwindCss](https://tailwindcss.com/). If [TailwindCss](https://tailwindcss.com/) is installed in our project, you have the option to extend its classes in the configuration file.
> MyTheme.js
```ruby
exports.myColors = {
	orange: {
		100: '#fef7e7',
		500: '#f6ae12',
	},
	succsess:  '#4D7B07',
	info: {
		'done': '#388e3c',
		'fail': '#d32f2f',
	},
};
```
> tailwind.config.js
```ruby
const hexparency = require('hex-transparency');
const myColors= require('./someLibrary/myColors');

module.exports = {
	theme: {
		extend: {
			colors:{
				...hexparency(myColors,[20, 50], true, 'transparent'),
			}
		},
	},
}
```
In the example above, we extended the color class of [Tailwind](https://tailwindcss.com/) with our own generated object. From now on, we can use the key-value pairs generated in the object as a [Tailwind](https://tailwindcss.com/) class.
> SomeComponent.vue
```ruby
<h1 class="text-orange-500 bg-transparent-50-orange-100">Hello  Wolrd!</h1>
```
## Parameters:
```ruby
    hexparency(myColors,[20, 50], true, 'transparent'),
```
**Four parameters can be entered:** 

 1.  object
 2.  values
 3.  merge
 4.  name

### object ( Object | required )

An object with key-value pairs that contains hexadecimal color codes. The method generates transparent versions based on this.
**Only key-value pairs that contain valid hexadecimal color codes and are three or six characters long after the '#' sign will be included in the new object.** 
```ruby
const myColors = {
	orange: {
	  50: '#fef' // good
		100: '#fef7e7',  // good
		500: '#f2',  // bad
		600: '',  // bad
	},
	succsess:  '#4D7B07', // good
	fail: false, // bad
	info: {
		'done': '#388e3c', // good
		'fail': 100, // bad
	},
};
```
**If you specify an invalid object as a parameter, you receive the following error message in the console:** 
```ruby 
Error - ( object parameter ):  must be a valid object!
```
### values ​​( Number | Array | required )

**Its value can be a number between 1 and 100.** This parameter controls what transparency will be generated. Only one number or array of numbers can be entered.
```ruby 
const myNewColorObject = hexparency(myColors , 50, true, 'transparent');
```
```ruby 
const myNewColorObject = hexparency(myColors , [10,50,98], true, 'transparent');
```

 After the second example, the original object and the new generated version look like this:

> the original object

```ruby 
const myColors = { 	
	orange: {
		100: '#fef7e7',
	};
};
```
> the new object
```ruby
const myNewColorObject = { 	
	orange: {
		100: '#fef7e7',
	},
	transparent-10-orange: {
		100: '#fef7e71A',
	},
	transparent-50-orange: {
		100: '#fef7e780',
	},
	transparent-95-orange: {
		100: '#fef7e7FA',
	},
};
```
**If no value is specified or an invalid value is specified, you receive the following error message in the console:** 
```ruby 
Error - ( values parameter ): must be a number between 1 and 100, or valid value !
```
  

### merge ( Boolean | optional )

**Its value can be true or false.** If no value is specified, the true value will be set.

 -  **true** : the new object also contains the values of the original object
 - **false** : the new object contains only the new values

**If an invalid value is specified, you receive the following error message in the console:** 
```ruby 
Error - ( merge parameter ): it can only be true or false !
```
### name ( String | optional )

**Its value can only be a string and cannot be empty.** If no value is specified, the value 'tr' (transparent) will be set.
```ruby 
const myNewColorObject = hexparency(myColors , 10, false, 'myName');
```
```ruby 
const myNewColorObject = { 	
	orange: {
		100: '#fef7e7',
	},
	myName-10-orange: {
		100: '#fef7e71A',
	},
};

```
**If an invalid value is specified, you will receive the following error message in the console:** 
```ruby 
Error - ( merge parameter ): can only be string and cannot be empty !
```

  ## The return value of the method: `Object`

