module.exports = function trackProperty(obj, property, types = ['get', 'set'], callback = () => {}) {
  let propertyValue = undefined;
  const history = [];

  Object.defineProperty(obj, property, {
    set(newValue) {
      if (types.includes('set')) {
        const record = {
          type: 'set',
          timestamp: new Date(),
          previousValue: propertyValue,
          newValue
        };

        history.push(record);
        callback(record);
      }

      propertyValue = newValue;
    },

    get() {
      if (types.includes('get')) {
        const record = {
          type: 'get',
          timestamp: new Date(),
          value: propertyValue
        };

        history.push(record);
        callback(record);
      }

      return propertyValue;
    }
  });

  return history;
};
