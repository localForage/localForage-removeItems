localForage-removeItems
====================
[![npm](https://img.shields.io/npm/dm/localforage-removeitems.svg)](https://www.npmjs.com/package/localforage-removeitems)  
Adds removeItems method to [localForage](https://github.com/mozilla/localForage).

## Requirements

* [localForage](https://github.com/mozilla/localForage) v1.4.0+

## Installation
`npm i localforage-removeitems`

## API
Just like `removeItem()` but you can pass an array with the keys that need to be removed.
```js
localforage.removeItems(['asdf','asap','async']);
```
