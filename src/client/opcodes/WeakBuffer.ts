export class WeakBuffer<T> {
  value: T[];
  _position: number = 0

  constructor(value: T[]) {
    this.value = value;
  }

  hasRemaining(): boolean {
    return this.value.length > this._position
  }

  get(): T {
    if (this.hasRemaining()) {
      return this.value[this._position++]
    }
    throw new Error()
  }

  position(pos: number | undefined = undefined): number {
    if (pos !== undefined) {
      this._position = pos
    }
    return this._position
  }
}
