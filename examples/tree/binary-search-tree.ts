import { BinarySearchTree, BSTNode } from "../../src/index.ts";

// Helper to beautifully print the tree in the terminal
function printTree(node: BSTNode<any> | null, prefix = "", isLeft = true): void {
  if (!node) return;
  
  if (node.right) printTree(node.right, prefix + (isLeft ? "│   " : "    "), false);
 
  console.log(prefix + (isLeft ? "└── " : "┌── ") + node.value);
  
  if (node.left) printTree(node.left, prefix + (isLeft ? "    " : "│   "), true);
}

const printState = (msg: string, tree: BinarySearchTree<number>) => {
  console.log(`\n\x1b[36m=== ${msg} ===\x1b[0m`); // Cyan color for headers
  console.log(`Size: ${tree.size} | In-Order: [${tree.inOrder().join(", ")}]`);
  console.log("\nTree Structure (Rotated 90 degrees left):");
  printTree(tree.root, "", true);
};

// 1. Build the tree
const bst = new BinarySearchTree<number>(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);
bst.insert(65);

printState("INITIAL TREE", bst);

// 2. CASE 1: Remove Leaf
console.log("\n\x1b[33m> Removing 20 (Leaf Node)...\x1b[0m");
bst.remove(20);
printState("AFTER REMOVING 20", bst);

// 3. CASE 2: Remove Node with 1 child
console.log("\n\x1b[33m> Removing 60 (One right child: 65)...\x1b[0m");
bst.remove(60);
printState("AFTER REMOVING 60", bst);

// 4. CASE 3: Remove Node with 2 children
console.log("\n\x1b[33m> Removing 50 (Root Node with 2 children)...\x1b[0m");
console.log("  (Expected: 65 will replace 50, and the old 65 will be deleted)");
bst.remove(50);
printState("AFTER REMOVING 50", bst);