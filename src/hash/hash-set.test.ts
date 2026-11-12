import { describe, it, expect, beforeEach } from "vitest";
import { HashSet } from "./hash-set";

describe("HashSet", () => {
  let set: HashSet<string>;

  beforeEach(() => {
    set = new HashSet<string>(8);
  });

  it("starts empty", () => {
    expect(set.length).toBe(0);
    expect(set.has("item")).toBe(false);
    expect(set.values()).toEqual([]);
  });

  it("adds items and prevents duplicates", () => {
    expect(set.add("apple")).toBe(true);
    expect(set.add("banana")).toBe(true);
    expect(set.add("apple")).toBe(false);

    expect(set.length).toBe(2);
    expect(set.has("apple")).toBe(true);
    expect(set.has("banana")).toBe(true);
    expect(set.has("orange")).toBe(false);
  });

  it("deletes items properly", () => {
    set.add("x");
    set.add("y");

    expect(set.delete("x")).toBe(true);
    expect(set.length).toBe(1);
    expect(set.has("x")).toBe(false);

    expect(set.delete("x")).toBe(false);
    expect(set.delete("z")).toBe(false);
  });

  it("handles automatic resizing", () => {
    for (let i = 0; i < 20; i++) {
      set.add(`item_${i}`);
    }

    expect(set.length).toBe(20);
    for (let i = 0; i < 20; i++) {
      expect(set.has(`item_${i}`)).toBe(true);
    }
  });

  it("calculates union correctly", () => {
    const setA = new HashSet<string>();
    setA.add("a");
    setA.add("b");

    const setB = new HashSet<string>();
    setB.add("b");
    setB.add("c");

    const union = setA.union(setB);
    expect(union.length).toBe(3);
    expect(union.has("a")).toBe(true);
    expect(union.has("b")).toBe(true);
    expect(union.has("c")).toBe(true);
  });

  it("calculates intersection correctly", () => {
    const setA = new HashSet<string>();
    setA.add("a");
    setA.add("b");

    const setB = new HashSet<string>();
    setB.add("b");
    setB.add("c");

    const intersection = setA.intersection(setB);
    expect(intersection.length).toBe(1);
    expect(intersection.has("b")).toBe(true);
    expect(intersection.has("a")).toBe(false);
  });

  it("calculates difference correctly", () => {
    const setA = new HashSet<string>();
    setA.add("a");
    setA.add("b");

    const setB = new HashSet<string>();
    setB.add("b");
    setB.add("c");

    const diff = setA.difference(setB);
    expect(diff.length).toBe(1);
    expect(diff.has("a")).toBe(true);
    expect(diff.has("b")).toBe(false);
  });
});