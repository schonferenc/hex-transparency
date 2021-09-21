# hex-transparency

**Hexadecimális színkódokat tartalmazó objektumból, egy új objektumot hoz létre, ami tartalmazza az eredeti objektumban lévő színkódokat és annak átlátszó verzióit. Csak hexadecimális színkódok konvertálására alkalmas.
A legenerált skála jól alkalmazható a [TailwindCss](https://tailwindcss.com/) plugin-nal.**

## Telepítés:

    npm install hex-transparency

## Használat:
> SomeFile.js
```ruby
const { hexparency }= require('hex-transparency');
const myColors= require('./someLibrary/myColors');
```

A **myColors** egy saját objektum, ami a hexadecimális színkódokat tartalmazza.
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
## Használat [TailwindCss](https://tailwindcss.com/)-sel:
Ez a csomag jól használható, a [TailwindCss](https://tailwindcss.com/)-el. Ha a [TailwindCss](https://tailwindcss.com/) telepítve van a projektünkben, akkor annak beállításaiban, lehetőségünk van kiterjeszteni annak osztályait.
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
A fenti példában kiterjesztettük a [Tailwind](https://tailwindcss.com/) színek osztályát a saját legenerált objektumunkkal. Innentől [Tailwind](https://tailwindcss.com/) osztályként használhatjuk tovább, az objektumunkban legenerált kulcs-érétk párokat.
> SomeComponent.vue
```ruby
<h1 class="text-orange-500 bg-transparent-50-orange-100">Hello  Wolrd!</h1>
```
## Paraméterek:
```ruby
    hexparency(myColors,[20, 50], true, 'transparent'),
```
**A metódusnak négy paraméter adható meg:** 

 1.  objektum
 2.  értékek
 3.  összeolvaszt
 4.  név

### objektum ( Object | kötelező )

Hexadecimális színkódokat tartalmazó kulcs-érték párokból álló objektum. A metódus ez alapján generálja le az átlátszó változatokat.
**Csak azok a kulcs-érték párok kerülnek az új objektumba, melyek érvényes hexadecimális színkódokat tartalmaznak, és a '#'-jel után, három vagy hat karakter hosszúságúak.** 
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
**Ha nem érvényes objektumot adunk meg paraméternek, a konzolban a következő hibaüzenetet kapjuk:** 
```ruby 
Error - ( object parameter ):  must be a valid object!
```
### értékek ( Number | Array | kötelező )
**Értéke 1 és 100 közötti szám lehet.** Ez a paraméter szabályozza, hogy milyen átlátszóságok lesznek legenerálva. Beírható csak egy szám, vagy számok tömbje is.
```ruby 
const myNewColorObject = hexparency(myColors , 50, true, 'transparent');
```
```ruby 
const myNewColorObject = hexparency(myColors , [10,50,98], true, 'transparent');
```

A második példa után, az eredeti objektum, és az új legenerált változata így néz ki:

> az eredeti objektum

```ruby 
const myColors = { 	
	orange: {
		100: '#fef7e7',
	};
};
```
> az új objektum
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
**Ha nincs megadva érték, vagy nem érvényes érték van megadva, akkor a konzolban a következő hibaüzenetet kapjuk:** 
```ruby 
Error - ( values parameter ): must be a number between 1 and 100, or valid value !
```
  

### összeolvaszt ( Boolean | nem kötelező )

**Értéke igaz vagy hamis lehet.** Ha nincs megadva érték, akkor az igaz érték lesz beállítva.

 -  **true** : az új objektum tartalmazza az eredeti objektum értékeit is
 - **false** : az új objektum csak az új értékeket tartalmazza

**Ha  érvénytelen érték van megadva, akkor a konzolban a következő hibaüzenetet kapjuk:** 
```ruby 
Error - ( merge parameter ): it can only be true or false !
```
### név ( String | nem kötelező )
**Értéke csak string típus lehet és nem lehet üres.** Ha nincs megadva érték, akkor a 'tr', mint transparent érték lesz beállítva.
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
**Ha  érvénytelen érték van megadva, akkor a konzolban a következő hibaüzenetet kapjuk:** 
```ruby 
Error - ( merge parameter ): can only be string and cannot be empty !
```

  ## A metódus visszatérési értéke: `Objektum`

