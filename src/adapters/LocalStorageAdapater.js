import Adapter from './Adapter';
import { jsonStringify, jsonParse } from '../helpers';

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
    jsonStringify(value)
      .then(serializedValue => callback(null, this.storage.setItem(key, serializedValue)))
      .catch(error => callback(error));
  }

  /**
   * @param {string} key The storage key.
   * @param {Function} callback Gets called when the action is done.
   */
  get(key, callback) {
    const value = this.storage.getItem(key);

    jsonParse(value)
      .then(deserializedValue => callback(null, deserializedValue))
      .catch(error => callback(error));
  }
}

export default new LocalStorageAdapater(window.localStorage);
