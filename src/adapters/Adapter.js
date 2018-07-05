/**
 * The base Adapater.
 */
export default class Adapter {
  /**
   * @param {Object} storage A storage instance.
   */
  constructor(storage) {
    this.storage = storage;
  }
}
