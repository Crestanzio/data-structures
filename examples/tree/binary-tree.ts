import { BinaryTreeNode, BinaryTree } from '../../src/index.ts';
import { inlineArr } from '../utils.ts'

// Level 1
const root = new BinaryTreeNode(10);

// Level 2
root.left = new BinaryTreeNode(20);
root.right = new BinaryTreeNode(30);

// Level 3
root.left.left = new BinaryTreeNode(40);
root.left.right = new BinaryTreeNode(50);
root.right.left = new BinaryTreeNode(60);
root.right.right = new BinaryTreeNode(70);

// Level 4
root.left.left.left = new BinaryTreeNode(80);
root.left.left.right = new BinaryTreeNode(90);
root.left.right.left = new BinaryTreeNode(100);
root.left.right.right = new BinaryTreeNode(110);
root.right.left.left = new BinaryTreeNode(120);
root.right.left.right = new BinaryTreeNode(130);
root.right.right.left = new BinaryTreeNode(140);
root.right.right.right = new BinaryTreeNode(150);

// Level 5
root.left.left.left.left = new BinaryTreeNode(160);

const tree = new BinaryTree(root);

console.log("Pre order  :", inlineArr(tree.preOrder()));
console.log("In order   :", inlineArr(tree.inOrder()));
console.log("Post order :", inlineArr(tree.postOrder()));
console.log("level order:", inlineArr(tree.levelOrder()));
console.log("height     :", tree.height());
console.log("length     :", tree.length);