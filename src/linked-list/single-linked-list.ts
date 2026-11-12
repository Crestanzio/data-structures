export class ListNode<T> {
  value: T;
  next: ListNode<T> | null;

  constructor(value: T) {
    this.value = value;
    this.next = null;
  }
}

export class SingleLinkedList<T> {
  private head: ListNode<T> | null;
  private tail: ListNode<T> | null;
  private size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  // O(n) - helper
  private getNode(index: number): ListNode<T> | null {
    if (index < 0 || index >= this.size) return null;

    let current = this.head!;
    let counter = 0;

    while (counter < index) {
      current = current.next!;
      counter++;
    }

    return current;
  }

  // O(1)
  prepend(value: T): void {
    const node = new ListNode(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.size++;
  }

  // O(1)
  append(value: T): void {
    const node = new ListNode(value);

    if (!this.tail) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }

    this.size++;
  }

  // O(n)
  insert(value: T, index: number): void {
    if (index < 0 || index > this.size) return;
    if (index === 0) return this.prepend(value);
    if (index === this.size) return this.append(value);

    const node = new ListNode(value);
    const previous = this.getNode(index - 1)!;

    node.next = previous.next;
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
        this.head = this.head!.next;
      }

      this.size--;
      return true;
    }

    const previous = this.getNode(index - 1)!;
    const target = previous.next;
    if (!target) return false;

    previous.next = target.next;

    if (index === this.size - 1) this.tail = previous;

    this.size--;
    return true;
  }

  // O(1)
  get length(): number {
    return this.size;
  }
}