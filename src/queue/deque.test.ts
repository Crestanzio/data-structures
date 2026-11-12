import { describe, it, expect, beforeEach } from "vitest";
import { Deque } from "./deque";

describe("Deque", () => {
  let deque: Deque<number>;

  beforeEach(() => {
    deque = new Deque<number>();
  });

  it("starts empty", () => {
    expect(deque.length).toBe(0);
    expect(deque.peekFront()).toBeUndefined();
    expect(deque.peekBack()).toBeUndefined();
  });

  it("pushes and pops from back (Stack-like behavior)", () => {
    deque.pushBack(1);
    deque.pushBack(2);

    expect(deque.length).toBe(2);
    expect(deque.peekBack()).toBe(2);
    expect(deque.popBack()).toBe(2);
    expect(deque.popBack()).toBe(1);
    expect(deque.popBack()).toBeUndefined();
  });

  it("pushes and pops from front", () => {
    deque.pushFront(1);
    deque.pushFront(2);

    expect(deque.length).toBe(2);
    expect(deque.peekFront()).toBe(2);
    expect(deque.popFront()).toBe(2);
    expect(deque.popFront()).toBe(1);
    expect(deque.popFront()).toBeUndefined();
  });

  it("mixes front and back insertions and deletions", () => {
    deque.pushBack(2);
    deque.pushFront(1);
    deque.pushBack(3);

    expect(deque.peekFront()).toBe(1);
    expect(deque.peekBack()).toBe(3);
    expect(deque.length).toBe(3);

    expect(deque.popFront()).toBe(1);
    expect(deque.popBack()).toBe(3);
    expect(deque.popFront()).toBe(2);
  });

  it("returns undefined when popping or peeking empty deque", () => {
    expect(deque.popFront()).toBeUndefined();
    expect(deque.popBack()).toBeUndefined();
    expect(deque.peekFront()).toBeUndefined();
    expect(deque.peekBack()).toBeUndefined();
    expect(deque.length).toBe(0);
  });

  it("maintains correct state after being emptied and refilled", () => {
    deque.pushFront(10);
    expect(deque.popBack()).toBe(10);

    deque.pushBack(20);
    expect(deque.peekFront()).toBe(20);
    expect(deque.peekBack()).toBe(20);
    expect(deque.length).toBe(1);
  });
});