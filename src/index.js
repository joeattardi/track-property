module.exports = function trackProperty(obj, property, types = ['get', 'set']) {
  const backingObj = {};
  const history = [];

  Object.defineProperty(obj, property, {
    set(value) {
      if (types.includes('set')) {
        history.push({
          type: 'set',
          timestamp: new Date(),
          previousValue: backingObj[property],
          newValue: value
        });
      }

      backingObj[property] = value;
    },

    get() {
      if (types.includes('get')) {
        history.push({
          type: 'get',
          timestamp: new Date(),
          value: backingObj[property]
        });
      }

      return backingObj[property];
    }
  });

  return history;
};
