import { describe, it, expect, beforeEach } from "vitest";
import { SingleLinkedList } from "./single-linked-list";

describe("SingleLinkedList", () => {
  let list: SingleLinkedList<number>;

  beforeEach(() => {
    list = new SingleLinkedList<number>();
  });

  it("starts empty", () => {
    expect(list.length).toBe(0);
    expect(list.find(0)).toBeUndefined();
  });

  it("prepends elements to the beginning", () => {
    list.prepend(10);
    list.prepend(20);

    expect(list.length).toBe(2);
    expect(list.find(0)).toBe(20);
    expect(list.find(1)).toBe(10);
  });

  it("appends elements to the end", () => {
    list.append(1);
    list.append(2);
    list.append(3);

    expect(list.length).toBe(3);
    expect(list.find(0)).toBe(1);
    expect(list.find(1)).toBe(2);
    expect(list.find(2)).toBe(3);
  });

  it("inserts at beginning, middle, and end", () => {
    list.append(10);
    list.append(30);

    // Insert middle
    list.insert(20, 1);
    expect(list.find(1)).toBe(20);
    expect(list.length).toBe(3);

    // Insert index 0 (prepend)
    list.insert(5, 0);
    expect(list.find(0)).toBe(5);

    // Insert index === length (append)
    list.insert(40, list.length);
    expect(list.find(4)).toBe(40);
    expect(list.length).toBe(5);

    // Invalid index does nothing
    list.insert(99, -1);
    list.insert(99, 100);
    expect(list.length).toBe(5);
  });

  it("finds value at given index or returns undefined for out of bounds", () => {
    list.append(100);
    list.append(200);

    expect(list.find(0)).toBe(100);
    expect(list.find(1)).toBe(200);
    expect(list.find(-1)).toBeUndefined();
    expect(list.find(2)).toBeUndefined();
  });

  it("removes element at index 0 and updates head", () => {
    list.append(1);
    list.append(2);

    expect(list.remove(0)).toBe(true);
    expect(list.length).toBe(1);
    expect(list.find(0)).toBe(2);

    expect(list.remove(0)).toBe(true);
    expect(list.length).toBe(0);
    expect(list.find(0)).toBeUndefined();
  });

  it("removes element in the middle and at the tail", () => {
    list.append(10);
    list.append(20);
    list.append(30);

    // Remove middle (index 1)
    expect(list.remove(1)).toBe(true);
    expect(list.length).toBe(2);
    expect(list.find(0)).toBe(10);
    expect(list.find(1)).toBe(30);

    // Remove tail (index 1)
    expect(list.remove(1)).toBe(true);
    expect(list.length).toBe(1);
    expect(list.find(0)).toBe(10);

    // Μετά τη διαγραφή του tail, ένα νέο append πρέπει να λειτουργεί κανονικά
    list.append(40);
    expect(list.length).toBe(2);
    expect(list.find(1)).toBe(40);
  });

  it("returns false when removing invalid index", () => {
    expect(list.remove(0)).toBe(false);

    list.append(5);
    expect(list.remove(-1)).toBe(false);
    expect(list.remove(5)).toBe(false);
    expect(list.length).toBe(1);
  });
});