import { describe, it, expect, beforeEach } from "vitest";
import { Stack } from "./stack";

describe("Stack", () => {
  let stack: Stack<number>;

  beforeEach(() => stack = new Stack<number>());

  it("starts empty", () => {
    expect(stack.length).toBe(0);
  });

  it("increases size on push", () => {
    stack.push(1);
    stack.push(2);
    expect(stack.length).toBe(2);
  });

  it("pops in LIFO order", () => {
    stack.push(1);
    stack.push(2);
    stack.push(3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });

  it("decreases size on pop", () => {
    stack.push(1);
    stack.push(2);
    stack.pop();
    expect(stack.length).toBe(1);
  });

  it("returns undefined when popping an empty stack", () => {
    expect(stack.pop()).toBeUndefined();
    expect(stack.length).toBe(0);
  });

  it("peek returns the top without removing it", () => {
    stack.push(1);
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.peek()).toBe(2);
    expect(stack.length).toBe(2);
  });

  it("returns undefined when peeking an empty stack", () => {
    expect(stack.peek()).toBeUndefined();
  });

  it("is reusable after being emptied", () => {
    stack.push(1);
    stack.pop();
    stack.push(2);
    expect(stack.peek()).toBe(2);
    expect(stack.length).toBe(1);
  });

  it("works with other types", () => {
    const strings = new Stack<string>();
    strings.push("a");
    expect(strings.pop()).toBe("a");
  });
});