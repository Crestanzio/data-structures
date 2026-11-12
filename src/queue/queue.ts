import { SingleLinkedList } from "../linked-list/single-linked-list.ts";

export class Queue<T> {
  private list = new SingleLinkedList<T>();

  // O(1)
  enqueue(value: T): void {
    this.list.append(value);
  }

  // O(1)
  dequeue(): T | undefined {
    const value = this.list.find(0);
    this.list.remove(0);

    return value;
  }

  // O(1)
  peek(): T | undefined {
    return this.list.find(0);
  }

  // O(1)
  get length(): number {
    return this.list.length;
  }
}