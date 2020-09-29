import store from 'store';
import { Adapter } from './Adapter';

/**
 * LocalStorage Adapter
 */
class LocalStorageAdapter extends Adapter {
  /**
   * @param {string} key The storage key.
   * @param {Object|string|Array} value The value to store.
   * @param {Function} callback Gets called when the action is done.
   * @return {Object|string|Array|undefined} The stored value, or undefined in case of an error.
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
   * @return {Object|undefined}
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

export const adapter = new LocalStorageAdapter(store);
