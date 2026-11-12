import { Deque } from '../../src/index.ts';

const deque = new Deque<string>();
deque.pushBack("Middle");
deque.pushFront("Start");
deque.pushBack("End");

console.log("Peek Front :", deque.peekFront());
console.log("Peek Back  :", deque.peekBack());
console.log("Pop Back   :", deque.popBack());
console.log("Length     :", deque.length);