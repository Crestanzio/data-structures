export class DoubleListNode<T> {
  value: T;
  next: DoubleListNode<T> | null;
  prev: DoubleListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

export class DoubleLinkedList<T> {
  private head: DoubleListNode<T> | null = null;
  private tail: DoubleListNode<T> | null = null;
  private size: number = 0;

  // O(n) - helper
  private getNode(index: number): DoubleListNode<T> | null {
    if (index < 0 || index >= this.size) return null;

    const isForward = index <= Math.floor(this.size / 2);
    const direction = isForward ? 'next' : 'prev';

    let current = isForward ? this.head! : this.tail!;
    let steps = isForward ? index : (this.size - 1) - index;
    let counter = 0;

    while (counter < steps) {
      current = current[direction]!;
      counter++;
    }

    return current;
  }

  // O(1)
  prepend(value: T): void {
    const node = new DoubleListNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }

    this.size++;
  }

  // O(1)
  append(value: T): void {
    const node = new DoubleListNode(value);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }

    this.size++;
  }

  // O(n)
  insert(value: T, index: number): void {
    if (index < 0 || index > this.size) return;
    if (index === 0) return this.prepend(value);
    if (index === this.size) return this.append(value);

    const node = new DoubleListNode(value);
    const previous = this.getNode(index - 1)!;

    node.next = previous.next;
    node.prev = previous;

    if (previous.next) previous.next.prev = node;
    previous.next = node;

    this.size++;
  }

  // O(n)
  find(index: number): T | undefined {
    return this.getNode(index)?.value;
  }

  // O(n)
  remove(index: number): boolean {
    if (index < 0 || index >= this.size) return false;

    if (index === 0) {
      if (this.size === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head!.next!;
        this.head.prev = null;
      }

      this.size--;
      return true;
    }

    const previous = this.getNode(index - 1)!;
    const target = previous.next!;

    previous.next = target.next;

    if (target.next) target.next.prev = previous;
    else this.tail = previous;

    this.size--;
    return true;
  }

  // O(1)
  get length(): number {
    return this.size;
  }
}