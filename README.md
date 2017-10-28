localForage-removeItems
====================
[![npm](https://img.shields.io/npm/dm/localforage-removeitems.svg)](https://www.npmjs.com/package/localforage-removeitems)  
Adds removeItems method to [localForage](https://github.com/mozilla/localForage).

## Requirements

* [localForage](https://github.com/mozilla/localForage) v1.4.0+

## Installation
`npm i localforage-removeitems`

## Importing

### TypeScript

[Include `localforage` with an import statement appropriate for your configuration](https://github.com/localForage/localForage/blob/master/README.md#typescript) and import `localforage-removeitems` right after it.

Normally, `localforage-removeitems` will extend the prototype of `locaforage` to include the `removeItems()` method, but unfortunately the typings can't be updated.
As a result you should use the exported `extendPrototype()` method, which returns the provided localforage instance but with inherited typings that also include the `removeItems()` method.

```javascript
import localForage from 'localforage';
// OR based on your configuration:
// import * as localForage from 'localforage';

import { extendPrototype } from 'localforage-removeitems';

extendPrototype(localforage);

// Keep using localForage as usual.
```

### Known issues with module bundlers

In some ES6 module bundlers `.removeItems()` might not automatically be made available to the `localforage` object on import.
In this case, import the provided `extendPrototype()` method and extend `localforage` manually, as shown in the Typescript section.

## API
Just like `removeItem()` but you can pass an array with the keys that need to be removed.
```js
localforage.removeItems(['asdf','asap','async']);
```
