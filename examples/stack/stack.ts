import { Stack } from '../../src/index.ts';

const stack = new Stack<number>();
stack.push(100);
stack.push(200);
stack.push(300);

console.log("Top of Stack:", stack.peek());
console.log("Popped      :", stack.pop());
console.log("Length      :", stack.length);