import { HashSet } from '../../src/index.ts';
import { inlineArr } from '../utils.ts';

const hashSet = new HashSet<number>();
hashSet.add(1);
hashSet.add(2);
hashSet.add(3);

const setB = new HashSet<number>();
setB.add(3);
setB.add(4);
setB.add(5);

console.log("Set A values:", inlineArr(hashSet.values()));
console.log("Set B values:", inlineArr(setB.values()));

const union = hashSet.union(setB);
console.log("Union       :", inlineArr(union.values()));

const intersection = hashSet.intersection(setB);
console.log("Intersection:", inlineArr(intersection.values()));

const difference = hashSet.difference(setB);
console.log("Difference  :", inlineArr(difference.values()));