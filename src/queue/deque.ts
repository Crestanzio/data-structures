import { DoubleLinkedList } from "../linked-list/double-linked-list.ts";

export class Deque<T> {
  private list = new DoubleLinkedList<T>();
  
  // O(1)
  pushFront(value: T): void {
    this.list.prepend(value);
  }

  // O(1)
  pushBack(value: T): void {
    this.list.append(value);
  }

  // O(1)
  popFront(): T | undefined {
    const value = this.list.find(0);
    this.list.remove(0);

    return value;
  }

  // O(1)
  popBack(): T | undefined {
    const lastIndex = this.list.length - 1;
    const value = this.list.find(lastIndex);
    this.list.remove(lastIndex);

    return value;
  }

  // O(1)
  peekFront(): T | undefined {
    return this.list.find(0);
  }

  // O(1)
  peekBack(): T | undefined {
    return this.list.find(this.list.length - 1);
  }

  // O(1)
  get length(): number {
    return this.list.length;
  }
}