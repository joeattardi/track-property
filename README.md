# track-property

`track-property` lets you keep a history of when a property on an object was set or accessed.

## Installation

```
npm install --save track-property
```

## Usage

The `trackProperty` function takes a JavaScript object, the name of the property, and an optional array of operation types to track. The supported operation types are `set` and `get`.

The function then returns an array. This array will be updated with entries whenever a property is set or accessed.

```javascript
const trackProperty = require('track-property'):

const myObject = {};
const history = trackProperty(myObject, 'name');

myObject.name = 'Joe';
console.log(myObject.name);

console.log(history);
```

After running this code, `history` will contain two entries:

```javascript
[
  {
    type: 'set',
    timestamp: Date, // this is a Date object that represents the timestamp of when the operation took place
    previousValue: undefined,
    newValue: 'Joe'
  },
  {
    type: 'get',
    timestamp: Date,
    value: 'Joe'
  }
]
```

If you only want to track only get or only set operations, pass the desired operation type in an array as the third argument:

```javascript
const trackProperty = require('track-property');

const myObject = {};
const history = trackProperty(myObject, 'name', ['get']);

myObject.name = 'Joe';
console.log(myObject.name);
```

In the above example, the `history` array will contain just one entry:

```javascript
[
  {
    type: 'get',
    timestamp: Date,
    value: 'Joe'
  }
]
```