import { describe, it, expect, beforeEach } from "vitest";
import { Queue } from "./queue";

describe("Queue", () => {
  let queue: Queue<number>;

  beforeEach(() => {
    queue = new Queue<number>();
  });

  it("starts empty", () => {
    expect(queue.length).toBe(0);
  });

  it("increases size on enqueue", () => {
    queue.enqueue(10);
    queue.enqueue(20);
    expect(queue.length).toBe(2);
  });

  it("dequeues in FIFO order", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);

    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });

  it("decreases size on dequeue", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    queue.dequeue();

    expect(queue.length).toBe(1);
  });

  it("returns undefined when dequeuing an empty queue", () => {
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.length).toBe(0);
  });

  it("peek returns the front item without removing it", () => {
    queue.enqueue(100);
    queue.enqueue(200);

    expect(queue.peek()).toBe(100);
    expect(queue.peek()).toBe(100);
    expect(queue.length).toBe(2);
  });

  it("returns undefined when peeking an empty queue", () => {
    expect(queue.peek()).toBeUndefined();
  });

  it("handles interleaving enqueue and dequeue operations correctly", () => {
    queue.enqueue(1);
    queue.enqueue(2);
    expect(queue.dequeue()).toBe(1);

    queue.enqueue(3);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
    expect(queue.dequeue()).toBeUndefined();
  });

  it("is reusable after being emptied", () => {
    queue.enqueue(1);
    queue.dequeue();

    queue.enqueue(42);
    expect(queue.peek()).toBe(42);
    expect(queue.length).toBe(1);
  });

  it("works with other types", () => {
    const stringQueue = new Queue<string>();
    stringQueue.enqueue("first");
    stringQueue.enqueue("second");

    expect(stringQueue.dequeue()).toBe("first");
    expect(stringQueue.peek()).toBe("second");
  });
});