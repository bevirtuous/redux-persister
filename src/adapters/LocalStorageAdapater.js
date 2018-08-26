import store from 'store';
import Adapter from './Adapter';

/**
 * LocalStorage Adapater
 */
class LocalStorageAdapater extends Adapter {
  /**
   * @param {string} key The storage key.
   * @param {Object} value The svalue to store.
   * @param {Function} callback Gets called when the action is done.
   * @return {string}
   */
  set(key, value, callback = () => {}) {
    try {
      const result = this.storage.set(key, value);
      callback(null, result);
      return result;
    } catch (error) {
      callback(error);
      return undefined;
    }
  }

  /**
   * @param {string} key The storage key.
   * @param {Function} callback Gets called when the action is done.
   * @return {Object}
   */
  get(key, callback = () => { }) {
    try {
      const value = this.storage.get(key);
      callback(null, value);
      return value;
    } catch (error) {
      callback(null, {});
      return undefined;
    }
  }
}

export default new LocalStorageAdapater(store);
