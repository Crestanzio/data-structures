import { SingleLinkedList } from '../../src/index.ts';
import { listToArray, inlineList } from '../utils.ts';

const list = new SingleLinkedList<string>();
list.append("Node");
list.append("React");
list.prepend("TypeScript");
console.log("Initial      :", inlineList(listToArray(list), 'single'));

list.insert("Bun", 1);
console.log("Insert(Bun,1):", inlineList(listToArray(list), 'single'));

list.remove(2);
console.log("Remove(2)    :", inlineList(listToArray(list), 'single'));