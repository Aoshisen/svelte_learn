export class Base<T> {
  private data: T;
  set(data: T) {
    this.data = data;
  }
  get(key?: keyof T) {
    if (key) {
      return this.data[key];
    }
    return this.data;
  }
  update(_data: Partial<T>) {
    this.data = { ...this.data, ..._data };
  }
}
