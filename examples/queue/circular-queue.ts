import { CircularQueue } from '../../src/index.ts';

const circularQueue = new CircularQueue<number>(3);
circularQueue.enqueue(1);
circularQueue.enqueue(2);
circularQueue.enqueue(3);

console.log("Enqueue 4 (Full) :", circularQueue.enqueue(4)); // false
console.log("Dequeued         :", circularQueue.dequeue());   // 1

circularQueue.enqueue(4); // Fits now due to wrap-around
console.log("Peek Front       :", circularQueue.peek());     // 2
console.log("Length           :", circularQueue.length);