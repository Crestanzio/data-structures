import { describe, it, expect, beforeEach } from "vitest";
import { HashMap } from "./hash-map";

describe("HashMap", () => {
  let map: HashMap<number>;

  beforeEach(() => {
    map = new HashMap<number>(8); // Μικρό capacity για εύκολο triggering σε collisions & resize
  });

  it("starts empty", () => {
    expect(map.length).toBe(0);
    expect(map.get("non_existent")).toBeUndefined();
    expect(map.has("non_existent")).toBe(false);
    expect(map.keys()).toEqual([]);
    expect(map.values()).toEqual([]);
  });

  it("sets and retrieves key-value pairs", () => {
    map.set("user_a", 100);
    map.set("user_b", 200);

    expect(map.length).toBe(2);
    expect(map.get("user_a")).toBe(100);
    expect(map.get("user_b")).toBe(200);
    expect(map.has("user_a")).toBe(true);
    expect(map.has("user_b")).toBe(true);
  });

  it("overwrites existing keys without increasing length", () => {
    map.set("count", 1);
    expect(map.get("count")).toBe(1);
    expect(map.length).toBe(1);

    map.set("count", 42);
    expect(map.get("count")).toBe(42);
    expect(map.length).toBe(1);
  });

  it("handles collisions within the same bucket", () => {
    // Με capacity 8, αυτά τα keys θα μοιραστούν buckets
    map.set("alpha", 1);
    map.set("beta", 2);
    map.set("gamma", 3);
    map.set("delta", 4);

    expect(map.get("alpha")).toBe(1);
    expect(map.get("beta")).toBe(2);
    expect(map.get("gamma")).toBe(3);
    expect(map.get("delta")).toBe(4);
    expect(map.length).toBe(4);
  });

  it("deletes existing keys and updates length", () => {
    map.set("first", 10);
    map.set("second", 20);

    expect(map.delete("first")).toBe(true);
    expect(map.length).toBe(1);
    expect(map.get("first")).toBeUndefined();
    expect(map.has("first")).toBe(false);

    // Διαγραφή μη υπαρκτού κλειδιού
    expect(map.delete("first")).toBe(false);
    expect(map.delete("ghost")).toBe(false);
    expect(map.length).toBe(1);
  });

  it("resizes automatically when load factor threshold is reached", () => {
    // Initial capacity = 8, threshold = 0.75 -> resize στους 6 παράγοντες
    for (let i = 0; i < 15; i++) {
      map.set(`key_${i}`, i * 10);
    }

    expect(map.length).toBe(15);
    for (let i = 0; i < 15; i++) {
      expect(map.get(`key_${i}`)).toBe(i * 10);
    }
  });

  it("returns all keys and values correctly", () => {
    map.set("x", 10);
    map.set("y", 20);
    map.set("z", 30);

    const keys = map.keys();
    const values = map.values();

    expect(keys.length).toBe(3);
    expect(keys).toContain("x");
    expect(keys).toContain("y");
    expect(keys).toContain("z");

    expect(values.length).toBe(3);
    expect(values).toContain(10);
    expect(values).toContain(20);
    expect(values).toContain(30);
  });
});