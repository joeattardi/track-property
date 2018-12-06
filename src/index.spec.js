/* eslint-disable no-unused-vars */
const { expect } = require('chai');
const sinon = require('sinon');

const trackProperty = require('./index');

describe('trackProperty', () => {
  it('should record gets and sets by default', () => {
    const obj = {};
    const history = trackProperty(obj, 'name');

    obj.name = 'Joe';
    let name = obj.name;

    obj.name = 'Bob';
    name = obj.name;

    expect(history).to.have.lengthOf(4);

    expectContains(history[0], {
      type: 'set',
      previousValue: undefined,
      newValue: 'Joe'
    });

    expectContains(history[1], {
      type: 'get',
      value: 'Joe'
    });

    expectContains(history[2], {
      type: 'set',
      previousValue: 'Joe',
      newValue: 'Bob'
    });

    expectContains(history[3], {
      type: 'get',
      value: 'Bob'
    });
  });

  describe('should record only the operations specified', () => {
    it('get', () => {
      const obj = {};
      const history = trackProperty(obj, 'name', ['get']);

      obj.name = 'Joe';
      const name = obj.name;

      expect(history).to.have.lengthOf(1);
      expectContains(history[0], {
        type: 'get',
        value: 'Joe'
      });
    });

    it('set', () => {
      const obj = {};
      const history = trackProperty(obj, 'name', ['set']);

      obj.name = 'Joe';
      const name = obj.name;

      expect(history).to.have.lengthOf(1);
      expectContains(history[0], {
        type: 'set',
        previousValue: undefined,
        newValue: 'Joe'
      });
    });
  });

  it('should call the callback function if specified', () => {
    const callback = sinon.spy();

    const obj = {};
    trackProperty(obj, 'name', ['get', 'set'], callback);

    obj.name = 'Joe';
    let name = obj.name;

    obj.name = 'Bob';
    name = obj.name;

    sinon.assert.callCount(callback, 4);

    expectContains(callback.args[0][0], {
      type: 'set',
      previousValue: undefined,
      newValue: 'Joe'
    });
  });
});

function expectContains(obj, properties) {
  Object.keys(properties).forEach(property => {
    expect(obj[property]).to.equal(properties[property]);
  });
}
