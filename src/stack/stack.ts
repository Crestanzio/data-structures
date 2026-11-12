export class Stack<T> {
  private items: T[] = [];

  // O(1)
  push(value: T): void {
    this.items.push(value);
  }

  // O(1)
  pop(): T | undefined {
    return this.items.pop();
  }

  // O(1)
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // O(1)
  get length(): number {
    return this.items.length;
  }
}