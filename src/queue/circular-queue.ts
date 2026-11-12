export class CircularQueue<T> {
  private buffer: (T | undefined)[];
  private capacity: number;
  private head: number = 0;
  private tail: number = 0;
  private size: number = 0;

  // O(1)
  constructor(capacity: number) {
    this.capacity = capacity;
    this.buffer = new Array<T | undefined>(capacity);
  }

  // O(1)
  enqueue(value: T): boolean {
    if (this.size === this.capacity) return false;

    this.buffer[this.tail] = value;
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;

    return true;
  }

  // O(1)
  dequeue(): T | undefined {
    if (this.size === 0) return undefined;

    const value = this.buffer[this.head];
    this.buffer[this.head] = undefined; // Garbage collection cleanup
    this.head = (this.head + 1) % this.capacity;
    this.size--;

    return value;
  }

  // O(1)
  peek(): T | undefined {
    if (this.size === 0) return undefined;
    return this.buffer[this.head];
  }

  // O(1)
  get length(): number {
    return this.size;
  }
}