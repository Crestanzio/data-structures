import { HashMap } from '../../src/index.ts';
import { inlineArr } from '../utils.ts';

const hashMap = new HashMap<string>();
hashMap.set("user_1", "Alice");
hashMap.set("user_2", "Bob");
hashMap.set("user_3", "Charlie");

console.log("Keys   :", inlineArr(hashMap.keys()));
console.log("Values :", inlineArr(hashMap.values()));
console.log("Get(2) :", hashMap.get("user_2"));

hashMap.delete("user_2");
console.log("Has(2) :", hashMap.has("user_2"));
console.log("Length :", hashMap.length);