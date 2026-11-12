import { DoubleLinkedList } from '../../src/index.ts';
import { listToArray, inlineList } from '../utils.ts';

const list = new DoubleLinkedList<number>();
list.append(10);
list.append(20);
list.append(30);
console.log("Initial      :", inlineList(listToArray(list), 'double'));

list.prepend(5);
console.log("Prepend(5)   :", inlineList(listToArray(list), 'double'));

list.remove(list.length - 1);
console.log("Remove Tail  :", inlineList(listToArray(list), 'double'));