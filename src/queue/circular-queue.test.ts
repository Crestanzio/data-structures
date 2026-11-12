import { describe, it, expect, beforeEach } from "vitest";
import { CircularQueue } from "./circular-queue";

describe("CircularQueue", () => {
  let cq: CircularQueue<number>;

  beforeEach(() => {
    cq = new CircularQueue<number>(3);
  });

  it("initializes empty with fixed capacity", () => {
    expect(cq.length).toBe(0);
    expect(cq.peek()).toBeUndefined();
  });

  it("enqueues up to capacity and reports full state", () => {
    expect(cq.enqueue(1)).toBe(true);
    expect(cq.enqueue(2)).toBe(true);
    expect(cq.enqueue(3)).toBe(true);

    expect(cq.length).toBe(3);

    // Δεν επιτρέπει εισαγωγή πέρα από το capacity
    expect(cq.enqueue(4)).toBe(false);
    expect(cq.length).toBe(3);
  });

  it("dequeues in FIFO order and updates size", () => {
    cq.enqueue(10);
    cq.enqueue(20);

    expect(cq.dequeue()).toBe(10);
    expect(cq.length).toBe(1);
    expect(cq.peek()).toBe(20);

    expect(cq.dequeue()).toBe(20);
    expect(cq.length).toBe(0);
  });

  it("returns undefined when dequeuing empty queue", () => {
    expect(cq.dequeue()).toBeUndefined();
    expect(cq.length).toBe(0);
  });

  it("wraps around buffer correctly (circular mechanism)", () => {
    cq.enqueue(1);
    cq.enqueue(2);
    cq.enqueue(3);

    // Αδειάζουμε 2 θέσεις από την αρχή
    expect(cq.dequeue()).toBe(1);
    expect(cq.dequeue()).toBe(2);
    expect(cq.length).toBe(1);

    // Εισάγουμε νέα στοιχεία που πρέπει να κάνουν wrap-around
    expect(cq.enqueue(4)).toBe(true);
    expect(cq.enqueue(5)).toBe(true);

    // Επαλήθευση σειράς ανάγνωσης
    expect(cq.dequeue()).toBe(3);
    expect(cq.dequeue()).toBe(4);
    expect(cq.dequeue()).toBe(5);
  });

  it("peek does not consume values", () => {
    cq.enqueue(99);
    expect(cq.peek()).toBe(99);
    expect(cq.peek()).toBe(99);
    expect(cq.length).toBe(1);
  });
});