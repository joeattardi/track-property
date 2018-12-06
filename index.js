const trackProperty = require('./src');

const obj = {};
const history = trackProperty(obj, 'name');

obj.name = 'Joe';
console.log(`Name is ${obj.name}`);

obj.name = 'Bob';
console.log(`Name is ${obj.name}`);

console.log(history);