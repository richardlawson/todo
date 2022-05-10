export default class LocalStorageMock{
  constructor() {
    this.store =  {
      pendingTasks : JSON.stringify([]),
      completedTasks : JSON.stringify([])
    };
  }

  clear() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key] || null;
  }

  setItem(key, value) {
    this.store[key] = String(value);
  }
}