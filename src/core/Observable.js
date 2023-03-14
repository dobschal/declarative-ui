/**
 * @template T
 * @param {T} data
 * @returns {Proxy<T>&{ $on: () => void}}
 */
export default function (data) {
  const listeners = [];
  return new Proxy(data, {
    get(target, key) {
      if (key === "$on") {
        return (key2, callback) => {
          listeners.push({
            key: key2,
            callback
          });
          callback(target[key2]);
        };
      }
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      listeners.forEach((l) => {
        if (l.key === key) l.callback(value);
      });
      return true;
    }
  });
}
