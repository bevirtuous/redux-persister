import Adapter from './Adapter';

/**
 * LocalStorage Adapater
 */
class LocalStorageAdapater extends Adapter {
  /**
   * @param {string} key The storage key.
   * @param {Object} value The svalue to store.
   * @param {Function} callback Gets called when the action is done.
   */
  set(key, value, callback) {
    try {
      const serializedValue = JSON.stringify(value);
      callback(null, this.storage.setItem(key, serializedValue));
    } catch (error) {
      callback(error);
    }
  }

  /**
   * @param {string} key The storage key.
   * @param {Function} callback Gets called when the action is done.
   */
  get(key, callback) {
    const value = this.storage.getItem(key);

    try {
      const deserializedValue = JSON.parse(value);
      callback(null, deserializedValue);
    } catch (error) {
      callback(null, {});
    }
  }
}

export default new LocalStorageAdapater(window.localStorage);
