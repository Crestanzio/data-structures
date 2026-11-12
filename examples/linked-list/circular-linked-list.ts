import { CircularLinkedList } from '../../src/index.ts';
import { inlineList, listToArray } from '../utils.ts';

const list = new CircularLinkedList<boolean>();
list.append(true);
list.append(false);
list.prepend(false);
console.log("Initial      :", inlineList(listToArray(list), 'circular'));

list.remove(0);
console.log("Remove(0)    :", inlineList(listToArray(list), 'circular'));