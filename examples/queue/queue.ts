import { Queue } from '../../src/index.ts';

const queue = new Queue<string>();
queue.enqueue("First");
queue.enqueue("Second");
queue.enqueue("Third");

console.log("Front of Queue:", queue.peek());
console.log("Dequeued      :", queue.dequeue());
console.log("Length        :", queue.length);